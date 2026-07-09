import type {
  FunnelAnswers,
  PainPoint,
  ProtectingOption,
  ZoneNeed,
} from "@/store/funnel-store";

const protectingLabels: Record<ProtectingOption, string> = {
  partner: "your partner",
  kids: "your children",
  parents: "your parents",
  "close-friends": "your close friends",
  myself: "yourself",
  "whole-family": "your whole family",
};

const painPointLabels: Record<PainPoint, string> = {
  "cant-reach": "not being able to reach them when you're worried",
  "unknown-location": "not knowing where they are",
  anxiety: "constant anxiety about their safety",
  driving: "worries about driving safety",
  "late-night": "late nights out alone",
  traveling: "traveling or commuting far from home",
};

const zoneLabels: Record<ZoneNeed, string> = {
  "1-2": "1–2 safe zones for home, school, or work",
  "3-5": "3–5 safe zones across multiple locations",
  "6-plus": "6+ safe zones for full family coverage",
};

export function getPersonalizedHeadline() {
  return "We have the perfect plan for you!";
}

function formatList(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

export function getPersonalizedSummary(
  answers: Pick<FunnelAnswers, "protecting" | "painPoints" | "zoneNeed" | "urgent">
) {
  const sentences: string[] = [];

  if (answers.protecting) {
    sentences.push(
      `You're focused on keeping ${protectingLabels[answers.protecting]} safe.`
    );
  }

  if (answers.painPoints.length > 0) {
    const concerns = answers.painPoints.map((p) => painPointLabels[p]);
    sentences.push(
      `Your biggest concerns include ${formatList(concerns)}.`
    );
  }

  if (answers.zoneNeed) {
    sentences.push(
      `You need ${zoneLabels[answers.zoneNeed]} with arrival and departure alerts.`
    );
  }

  if (answers.urgent === true) {
    sentences.push(
      "You want peace of mind starting today, so we'll prioritize your setup."
    );
  } else if (answers.urgent === false) {
    sentences.push(
      "You're exploring options for later, and this plan is ready whenever you are."
    );
  }

  return sentences.length > 0
    ? sentences.join(" ")
    : "This plan is tailored to your family's safety needs.";
}
