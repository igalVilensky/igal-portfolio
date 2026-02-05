import fetch from "node-fetch";

export async function handler(event, context) {
    try {
        // 1) Basic checks
        if (!process.env.GROQ_API_KEY) {
            console.error("GROQ_API_KEY is not set");
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "Server configuration error: GROQ_API_KEY missing",
                }),
            };
        }

        if (!event || !event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Empty request body" }),
            };
        }

        // 2) Safe parse
        let parsed;
        try {
            parsed = JSON.parse(event.body);
        } catch (e) {
            console.error("Invalid JSON body:", event.body);
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid JSON in request body" }),
            };
        }

        const {
            prompt: rawPrompt,
            user,
            maxLines = 10,
            systemPrompt = "Ответь на русском языке. Дай практичные, короткие шаги и рекомендации.",
        } = parsed;

        if (!rawPrompt || typeof rawPrompt !== "string") {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing or invalid 'prompt' field" }),
            };
        }

        // 3) Build an augmented prompt (safely include user info if present)
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

        // 4) Call Groq
        const groqRes = await fetch(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [{ role: "user", content: prompt }],
                    max_tokens: 800,
                }),
            }
        );

        const groqText = await groqRes.text();

        if (!groqRes.ok) {
            console.error("Groq API returned non-OK:", groqRes.status, groqText);
            // Try to include Groq text in error for debugging (careful: may contain sensitive info)
            return {
                statusCode: groqRes.status,
                body: JSON.stringify({ error: groqText || "Groq API error" }),
            };
        }

        // 5) Parse Groq JSON safely
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

        // 6) Extract assistant content (support possible shapes)
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

        // 7) Truncate to requested max lines (default 10)
        const lines = assistantContent
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter((l) => l.length > 0)
            .slice(0, maxLines);

        const reply = lines.join("\n");

        // 8) Return a clean reply payload that frontend expects
        return {
            statusCode: 200,
            body: JSON.stringify({ reply }),
        };
    } catch (err) {
        console.error("Handler error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message || "Internal server error" }),
        };
    }
}
