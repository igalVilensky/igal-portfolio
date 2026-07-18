export type PortfolioAgentStatus = "answered" | "partial" | "unknown";
export type PortfolioAgentConfidence = "high" | "medium" | "low";
export type PortfolioSourceType =
  | "profile"
  | "project"
  | "experience"
  | "skill"
  | "faq"
  | "role-fit";

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
};

export type PortfolioConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

export type PortfolioAgentRequest = {
  question: string;
  conversation?: PortfolioConversationMessage[];
};
