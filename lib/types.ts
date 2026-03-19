export type NodeType = "section" | "div" | "heading" | "text" | "button";

export type NodeStyles = {
  display?: "block" | "flex";
  flexDirection?: "row" | "column";
  justifyContent?: "flex-start" | "center" | "space-between";
  alignItems?: "flex-start" | "center";
  gap?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  maxWidth?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  borderRadius?: string;
};

export type LayoutNode = {
  type: NodeType;
  className?: string;
  tag?: "h1" | "h2" | "p";
  text?: string;
  styles?: NodeStyles;
  children?: LayoutNode[];
};
