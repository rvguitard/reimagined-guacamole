import { normalizeStyles } from "@/lib/normalize";
import type { LayoutNode } from "@/lib/types";

type ExportResult = {
  html: string;
  css: string;
};

type StyleRegistry = Map<string, string>;

function camelToKebab(value: string) {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function styleObjectToCss(styleObject: Record<string, string | undefined>) {
  return Object.entries(styleObject)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => `${camelToKebab(key)}: ${value};`)
    .join(" ");
}

function getTag(node: LayoutNode) {
  if (node.type === "heading") return node.tag ?? "h2";
  if (node.type === "text") return "p";
  if (node.type === "button") return "button";
  return node.type === "section" ? "section" : "div";
}

function registerStyleClass(
  styles: Record<string, string | undefined>,
  registry: StyleRegistry
) {
  const cssBody = styleObjectToCss(styles);

  if (!cssBody) {
    return "";
  }

  const existing = registry.get(cssBody);
  if (existing) {
    return existing;
  }

  const className = `node-${registry.size + 1}`;
  registry.set(cssBody, className);
  return className;
}

function renderNode(node: LayoutNode, registry: StyleRegistry): string {
  const tag = getTag(node);
  const normalizedStyles = normalizeStyles(node.styles);
  const sharedClassName = registerStyleClass(normalizedStyles, registry);

  const classNames = [node.className, sharedClassName].filter(Boolean).join(" ");
  const classAttribute = classNames ? ` class="${classNames}"` : "";

  const content =
    node.type === "heading" || node.type === "text" || node.type === "button"
      ? node.text ?? ""
      : (node.children ?? []).map((child) => renderNode(child, registry)).join("");

  return `<${tag}${classAttribute}>${content}</${tag}>`;
}

export function renderToHtml(tree: LayoutNode): ExportResult {
  const registry: StyleRegistry = new Map();
  const html = renderNode(tree, registry);

  const css = Array.from(registry.entries())
    .map(([cssBody, className]) => `.${className} { ${cssBody} }`)
    .join("\n");

  return { html, css };
}
