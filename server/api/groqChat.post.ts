import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        throw createError({
            statusCode: 500,
            statusMessage: 'GROQ_API_KEY is not set',
        });
    }

    const body = await readBody(event);
    const {
        prompt: rawPrompt,
        user,
        maxLines = 10,
        systemPrompt = "Ответь на русском языке. Дай практичные, короткие шаги и рекомендации.",
    } = body;

    if (!rawPrompt || typeof rawPrompt !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: "Missing or invalid 'prompt' field",
        });
    }

    const safeUser = user || {};
    const userName = safeUser.displayName ?? safeUser.uid ?? "Guest";
    const userAge = safeUser.age ?? "not specified";
    const userProfession = safeUser.profession ?? "not specified";
    const userAbout = safeUser.aboutYourself ?? "not specified";

    const prompt = `${rawPrompt.trim()}

User Information:
Name: ${userName}
Age: ${userAge}
Profession: ${userProfession}
About: ${userAbout}

${systemPrompt}
In the final output, leave no more than ${maxLines} lines (line breaks).`;

    try {
        const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 800,
            }),
        });

        if (!groqRes.ok) {
            const errorText = await groqRes.text();
            return { error: errorText || "Groq API error", statusCode: groqRes.status };
        }

        const groqJson = await groqRes.json();
        let assistantContent = groqJson?.choices?.[0]?.message?.content || "";

        const lines = assistantContent
            .split(/\r?\n/)
            .map((l: string) => l.trim())
            .filter((l: string) => l.length > 0)
            .slice(0, maxLines);

        return { reply: lines.join("\n") };
    } catch (err: any) {
        throw createError({
            statusCode: err.statusCode || 500,
            statusMessage: err.message || "Internal server error",
        });
    }
});
