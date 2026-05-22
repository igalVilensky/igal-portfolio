interface GroqChatPayload {
  prompt: string;
  user?: Record<string, unknown>;
  maxLines?: number;
  systemPrompt?: string;
}

interface GroqChatResponse {
  reply?: string;
  error?: string;
  details?: string;
}

export const useGroqChat = () => {
  const endpoint = import.meta.dev ? "/api/groqChat" : "/.netlify/functions/groqChat";

  return (body: GroqChatPayload) =>
    $fetch<GroqChatResponse>(endpoint, {
      method: "POST",
      body,
    });
};
