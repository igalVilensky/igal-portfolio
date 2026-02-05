export const handler = async (event, context) => {
    console.log("--- groqChat Function Started ---");
    console.log("Method:", event.httpMethod);
    console.log("API Key present:", !!process.env.GROQ_API_KEY);

    try {
        // 1) Method check
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                body: JSON.stringify({ error: "Method Not Allowed" }),
            };
        }

        // 2) API Key check
        if (!process.env.GROQ_API_KEY) {
            console.error("GROQ_API_KEY is missing from environment variables.");
            return {
                statusCode: 500,
                body: JSON.stringify({
                    error: "Server configuration error: GROQ_API_KEY missing",
                }),
            };
        }

        // 3) Body check
        if (!event || !event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Empty request body" }),
            };
        }

        // 4) Parse Body
        let parsed;
        try {
            const rawBody = event.isBase64Encoded
                ? Buffer.from(event.body, 'base64').toString('utf8')
                : event.body;
            parsed = JSON.parse(rawBody);
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

        // 5) Build Prompt
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

        console.log("Calling Groq API...");
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
            console.error("Groq API error:", groqRes.status, groqText);
            return {
                statusCode: groqRes.status,
                body: JSON.stringify({ error: "Groq API returned an error", details: groqText }),
            };
        }

        let groqJson = JSON.parse(groqText);
        let assistantContent = groqJson?.choices?.[0]?.message?.content || JSON.stringify(groqJson);

        const lines = assistantContent
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter((l) => l.length > 0)
            .slice(0, maxLines);

        console.log("Function successful.");
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reply: lines.join("\n") }),
        };
    } catch (err) {
        console.error("CRITICAL HANDLER ERROR:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal server error", message: err.message }),
        };
    }
};

