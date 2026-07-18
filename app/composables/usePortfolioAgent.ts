import type {
  PortfolioAgentRequest,
  PortfolioAgentResponse,
} from "~/types/portfolio-agent";

export const usePortfolioAgent = () => {
  const endpoint = import.meta.dev
    ? "/api/portfolioAgent"
    : "/.netlify/functions/portfolioAgent";

  return (body: PortfolioAgentRequest) =>
    $fetch<PortfolioAgentResponse>(endpoint, {
      method: "POST",
      body,
    });
};
