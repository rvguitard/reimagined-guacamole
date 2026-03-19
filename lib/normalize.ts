import type { LayoutNode, NodeStyles } from "@/lib/types";

export function normalizeStyleHints(input: string): Partial<NodeStyles> {
  const prompt = input.toLowerCase();
  const styles: Partial<NodeStyles> = {};

  if (
    prompt.includes("dark background") ||
    prompt.includes("dark section") ||
    prompt.includes("dark hero")
  ) {
    styles.backgroundColor = "#111827";
    styles.color = "#ffffff";
  }

  if (
    prompt.includes("large heading") ||
    prompt.includes("big heading") ||
    prompt.includes("headline")
  ) {
    styles.fontSize = "48px";
  }

  if (
    prompt.includes("rounded button") ||
    prompt.includes("pill button") ||
    prompt.includes("rounded cta")
  ) {
    styles.borderRadius = "999px";
  }

  return styles;
}

export function normalizeStyles(styles: NodeStyles = {}): NodeStyles {
  return {
    display: styles.display,
    flexDirection: styles.flexDirection,
    justifyContent: styles.justifyContent,
    alignItems: styles.alignItems,
    gap: styles.gap ?? "0px",
    paddingTop: styles.paddingTop ?? "0px",
    paddingBottom: styles.paddingBottom ?? "0px",
    paddingLeft: styles.paddingLeft ?? "0px",
    paddingRight: styles.paddingRight ?? "0px",
    maxWidth: styles.maxWidth,
    backgroundColor: styles.backgroundColor,
    color: styles.color,
    fontSize: styles.fontSize,
    borderRadius: styles.borderRadius
  };
}

export function applyPromptNormalization(node: LayoutNode, prompt: string): LayoutNode {
  const hints = normalizeStyleHints(prompt);

  const nextNode: LayoutNode = {
    ...node,
    styles: {
      ...node.styles
    }
  };

  if (nextNode.type === "section") {
    nextNode.styles = {
      ...hints,
      ...nextNode.styles
    };
  }

  if (nextNode.type === "heading" && hints.fontSize && !nextNode.styles?.fontSize) {
    nextNode.styles = {
      ...nextNode.styles,
      fontSize: hints.fontSize
    };
  }

  if (nextNode.type === "button" && hints.borderRadius && !nextNode.styles?.borderRadius) {
    nextNode.styles = {
      ...nextNode.styles,
      borderRadius: hints.borderRadius
    };
  }

  if (nextNode.children) {
    nextNode.children = nextNode.children.map((child) =>
      applyPromptNormalization(child, prompt)
    );
  }

  return nextNode;
}
