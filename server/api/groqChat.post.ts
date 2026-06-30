export default defineEventHandler(async (event) => {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "GROQ_API_KEY is missing from the local environment",
    });
  }

  const body = await readBody<{
    prompt?: string;
    user?: Record<string, unknown>;
    maxLines?: number;
    systemPrompt?: string;
  }>(event);

  if (!body?.prompt || typeof body.prompt !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing or invalid prompt",
    });
  }

  const {
    prompt: rawPrompt,
    user = {},
    maxLines = 10,
    systemPrompt = "Ответь на русском языке. Дай практичные, короткие шаги и рекомендации.",
  } = body;

  const userName = user.displayName ?? user.uid ?? "Гость";
  const userAge = user.age ?? "не указан";
  const userProfession = user.profession ?? "не указана";
  const userAbout = user.aboutYourself ?? "не указано";

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
      model: "openai/gpt-oss-120b",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
    }),
  });

  const groqText = await groqRes.text();

  if (!groqRes.ok) {
    throw createError({
      statusCode: groqRes.status,
      statusMessage: "Groq API returned an error",
      data: groqText,
    });
  }

  const groqJson = JSON.parse(groqText);
  const assistantContent =
    groqJson?.choices?.[0]?.message?.content || JSON.stringify(groqJson);

  const lines = assistantContent
    .split(/\r?\n/)
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0)
    .slice(0, maxLines);

  return { reply: lines.join("\n") };
});
