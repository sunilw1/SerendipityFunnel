import type { FunnelAnswers, ProtectingOption } from "@/store/funnel-store";

const protectingLabels: Record<ProtectingOption, string> = {
  partner: "your partner",
  kids: "your children",
  parents: "your parents",
  myself: "yourself",
  "whole-family": "your whole family",
};

export function getPersonalizedHeadline(answers: Pick<FunnelAnswers, "protecting">) {
  const who = answers.protecting
    ? protectingLabels[answers.protecting]
    : "your loved ones";
  return `Your personalized safety plan for ${who}`;
}

export function getPersonalizedSummary(
  answers: Pick<FunnelAnswers, "protecting" | "painPoints" | "zoneNeed" | "urgent">
) {
  const parts: string[] = [];

  if (answers.protecting) {
    parts.push(`Focused on keeping ${protectingLabels[answers.protecting]} safe`);
  }

  if (answers.painPoints.length > 0) {
    parts.push(`Addresses ${answers.painPoints.length} key concern${answers.painPoints.length > 1 ? "s" : ""}`);
  }

  if (answers.zoneNeed) {
    const zoneLabel =
      answers.zoneNeed === "6-plus"
        ? "6+ safe zones"
        : `${answers.zoneNeed} safe zones`;
    parts.push(`Configured for ${zoneLabel}`);
  }

  if (answers.urgent) {
    parts.push("Priority setup recommended");
  }

  return parts.length > 0 ? parts.join(" · ") : "Tailored to your family's safety needs";
}
