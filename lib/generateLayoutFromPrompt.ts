import {
  ctaLayout,
  fallbackLayout,
  featureStackLayout,
  heroLayout
} from "@/lib/demoData";
import { applyPromptNormalization } from "@/lib/normalize";
import type { LayoutNode } from "@/lib/types";

function cloneLayout<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

export function generateLayoutFromPrompt(prompt: string): LayoutNode {
  const normalizedPrompt = prompt.trim().toLowerCase();

  let baseLayout: LayoutNode;

  if (normalizedPrompt.includes("hero")) {
    baseLayout = cloneLayout(heroLayout);
  } else if (
    normalizedPrompt.includes("cta") ||
    normalizedPrompt.includes("call to action")
  ) {
    baseLayout = cloneLayout(ctaLayout);
  } else if (
    normalizedPrompt.includes("feature") ||
    normalizedPrompt.includes("headline") ||
    normalizedPrompt.includes("paragraph")
  ) {
    baseLayout = cloneLayout(featureStackLayout);
  } else {
    baseLayout = cloneLayout(fallbackLayout);
  }

  // Future model integration:
  // 1. Call a model here with a constrained prompt.
  // 2. Require JSON-only output.
  // 3. Parse the JSON safely.
  // 4. Validate it with zod.
  // 5. Normalize vague style values into allowed concrete tokens.
  // 6. Return a safe LayoutNode tree to the UI.
  return applyPromptNormalization(baseLayout, prompt);
}
