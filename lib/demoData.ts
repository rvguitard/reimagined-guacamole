import type { LayoutNode } from "@/lib/types";

export const demoPrompt =
  "Create a dark hero section with a large heading, paragraph, and rounded button.";

export const heroLayout: LayoutNode = {
  type: "section",
  className: "hero-layout",
  styles: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "16px",
    paddingTop: "72px",
    paddingBottom: "72px",
    paddingLeft: "24px",
    paddingRight: "24px",
    borderRadius: "24px"
  },
  children: [
    {
      type: "heading",
      tag: "h1",
      text: "Build production-ready sections faster"
    },
    {
      type: "text",
      text: "Generate a safe structured tree first, then render and export it."
    },
    {
      type: "button",
      text: "Start now",
      styles: {
        backgroundColor: "#60a5fa",
        color: "#0f172a",
        paddingTop: "12px",
        paddingBottom: "12px",
        paddingLeft: "18px",
        paddingRight: "18px"
      }
    }
  ]
};

export const ctaLayout: LayoutNode = {
  type: "section",
  className: "cta-layout",
  styles: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "24px",
    paddingTop: "36px",
    paddingBottom: "36px",
    paddingLeft: "32px",
    paddingRight: "32px",
    backgroundColor: "#e2e8f0",
    borderRadius: "20px"
  },
  children: [
    {
      type: "div",
      children: [
        {
          type: "heading",
          tag: "h2",
          text: "Ready to ship your first section?",
          styles: {
            fontSize: "32px",
            color: "#0f172a"
          }
        },
        {
          type: "text",
          text: "Start constrained and keep the output easy to validate.",
          styles: {
            color: "#334155",
            fontSize: "16px"
          }
        }
      ]
    },
    {
      type: "button",
      text: "Try prototype",
      styles: {
        backgroundColor: "#0f172a",
        color: "#ffffff",
        paddingTop: "12px",
        paddingBottom: "12px",
        paddingLeft: "18px",
        paddingRight: "18px",
        borderRadius: "12px"
      }
    }
  ]
};

export const featureStackLayout: LayoutNode = {
  type: "section",
  className: "feature-stack-layout",
  styles: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    paddingTop: "48px",
    paddingBottom: "48px",
    paddingLeft: "24px",
    paddingRight: "24px",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    borderRadius: "18px"
  },
  children: [
    {
      type: "heading",
      tag: "h2",
      text: "A cleaner way to prototype sections",
      styles: {
        fontSize: "36px"
      }
    },
    {
      type: "text",
      text: "Use a narrow schema, preview it live, and export plain HTML/CSS.",
      styles: {
        fontSize: "18px"
      }
    },
    {
      type: "button",
      text: "Preview example",
      styles: {
        backgroundColor: "#2563eb",
        color: "#ffffff",
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "16px",
        paddingRight: "16px",
        borderRadius: "10px"
      }
    }
  ]
};

export const fallbackLayout: LayoutNode = {
  type: "section",
  className: "fallback-layout",
  styles: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    paddingTop: "32px",
    paddingBottom: "32px",
    paddingLeft: "24px",
    paddingRight: "24px",
    backgroundColor: "#ffffff",
    color: "#0f172a",
    borderRadius: "16px"
  },
  children: [
    {
      type: "heading",
      tag: "h2",
      text: "Generated section",
      styles: {
        fontSize: "28px"
      }
    },
    {
      type: "text",
      text: "This fallback layout appears when the prompt does not match a mock pattern.",
      styles: {
        fontSize: "16px"
      }
    }
  ]
};

export const starterTree = heroLayout;
