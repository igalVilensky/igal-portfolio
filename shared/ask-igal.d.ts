import type { PortfolioAgentResponse } from '../app/types/portfolio-agent';
interface AskCopy {title:string;disclosure:string;questions:string[];unknown:string;local:string;role:string;tech:string;contact:string}
export const askIgalCopy:Record<'en'|'de'|'ru',AskCopy>;
export function localPortfolioAnswer(question:string,locale:string,projects:{title:string|Record<string,string>;short_description:string|Record<string,string>;links?:{live?:string|null;case_study?:string|null}}[]):PortfolioAgentResponse;
