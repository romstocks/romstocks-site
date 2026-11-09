export type Faq = {
  question: string;
  answer: string;
};

export const homeFaqs: Faq[] = [
  {
    question: "What is Romstocks?",
    answer:
      "Romstocks is an independent research site where Rom publishes written investment theses on individual US stocks. Each thesis includes a bull case, a bear case, key risks, and the evidence that would change his view. It is educational content, not personalized advice. Read the research archive or the methodology to see how a thesis is structured.",
  },
  {
    question: "Is Romstocks investment advice?",
    answer:
      "No. Romstocks publishes general, impersonal education about US stocks. It is not tailored to any reader's situation, and it is not a recommendation to buy or sell a security. Readers make their own decisions and may want to consult a licensed professional. Registration status is not stated here yet. See the disclaimer.",
  },
  {
    question: "Does the author own the stocks he writes about?",
    answer:
      "Sometimes. The plan is for every thesis to state the author's position at publication: long, short, or none. Positions can change without notice. The trading-window policy is still a TODO and is not invented here. Read the disclaimer for the current disclosure language.",
  },
  {
    question: "How often does Romstocks publish?",
    answer:
      "A publishing cadence is not set yet, so this page does not guess at a schedule. Theses that are published are dated, and material updates are meant to be recorded in a changelog on the thesis. Closed work is meant to stay online with a note about what changed. The newsletter page explains how to subscribe.",
  },
];
