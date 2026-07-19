export type PortfolioAgentStatus = "answered" | "partial" | "unknown" | "needs_clarification";
export type PortfolioAgentConfidence = "high" | "medium" | "low";
export type PortfolioAgentMode = "professional" | "conversational";
export type PortfolioSourceType =
  | "profile"
  | "project"
  | "experience"
  | "skill"
  | "faq"
  | "role-fit"
  | "personal"
  | "compensation";

export type PortfolioAgentSource = {
  id: string;
  label: string;
  type: PortfolioSourceType;
  href?: string;
};

export type PortfolioAgentAction = {
  label: string;
  href: string;
  type: "internal" | "external" | "email";
};

export type PortfolioAgentResponse = {
  status: PortfolioAgentStatus;
  answer: string;
  confidence: PortfolioAgentConfidence;
  sources: PortfolioAgentSource[];
  suggestedQuestions: string[];
  actions: PortfolioAgentAction[];
  clarification?: {
    question: string;
    topic: "role" | "salary" | "project" | "experience" | "availability" | "other";
  };
};

export type PortfolioConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

export type PortfolioAgentRequest = {
  question: string;
  locale?: "en" | "de" | "ru";
  mode?: PortfolioAgentMode;
  conversation?: PortfolioConversationMessage[];
};
