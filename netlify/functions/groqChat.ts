// Standalone Netlify Function (no external dependencies required for runtime)
export const handler = async (event: any, context: any) => {

    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'GROQ_API_KEY is not set' }),
        };
    }

    try {
        const body = JSON.parse(event.body || '{}');
        const {
            prompt: rawPrompt,
            user,
            maxLines = 10,
            systemPrompt = "Ответь на русском языке. Дай практичные, короткие шаги и рекомендации.",
        } = body;

        if (!rawPrompt || typeof rawPrompt !== 'string') {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing or invalid 'prompt' field" }),
            };
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
            return {
                statusCode: groqRes.status,
                body: JSON.stringify({ error: groqText || "Groq API error" }),
            };
        }

        let groqJson;
        try {
            groqJson = JSON.parse(groqText);
        } catch (e) {
            console.error("Failed to parse Groq JSON:", groqText);
            return {
                statusCode: 502,
                body: JSON.stringify({ error: "Invalid response from Groq" }),
            };
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
            .map((l: any) => l.trim())
            .filter((l: any) => l.length > 0)
            .slice(0, maxLines);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ reply: lines.join("\n") }),
        };
    } catch (err: any) {
        console.error("Function error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message || "Internal server error" }),
        };
    }
};
