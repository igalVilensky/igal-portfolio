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
    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Empty request body',
        });
    }

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

    // Build an augmented prompt (safely include user info if present)
    const safeUser = user || {};
    const userName = safeUser.displayName ?? safeUser.uid ?? "Гость";
    const userAge = safeUser.age ?? "не указан";
    const userProfession = safeUser.profession ?? "не указана";
    const userAbout = safeUser.aboutYourself ?? "не указано";

    const prompt = `${rawPrompt.trim()}

Информация о пользователе:
Имя: ${userName}
Возраст: ${userAge}
Профессия: ${userProfession}
О себе: ${userAbout}

${systemPrompt}
В конечном выводе оставь не более ${maxLines} строк (line breaks).`;

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

        const groqText = await groqRes.text();

        if (!groqRes.ok) {
            console.error("Groq API returned non-OK:", groqRes.status, groqText);
            return { error: groqText || "Groq API error", statusCode: groqRes.status };
        }

        let groqJson;
        try {
            groqJson = JSON.parse(groqText);
        } catch (e) {
            console.error("Failed to parse Groq JSON:", groqText);
            throw createError({
                statusCode: 502,
                statusMessage: "Invalid response from Groq",
            });
        }

        let assistantContent = "";
        if (groqJson?.choices?.[0]?.message?.content) {
            assistantContent = groqJson.choices[0].message.content;
        } else if (groqJson?.choices?.[0]?.text) {
            assistantContent = groqJson.choices[0].text;
        } else if (typeof groqJson === "string") {
            assistantContent = groqJson;
        } else {
            assistantContent = JSON.stringify(groqJson).slice(0, 1000);
        }

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
