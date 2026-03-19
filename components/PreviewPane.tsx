import type { CSSProperties, JSX } from "react";
import type { LayoutNode } from "@/lib/types";

type Props = {
  tree: LayoutNode | null;
  error: string | null;
};

function renderNode(node: LayoutNode, key: string): JSX.Element {
  const style = (node.styles ?? {}) as CSSProperties;

  if (node.type === "heading") {
    const Tag = node.tag ?? "h2";
    return (
      <Tag key={key} style={style}>
        {node.text}
      </Tag>
    );
  }

  if (node.type === "text") {
    return (
      <p key={key} style={style}>
        {node.text}
      </p>
    );
  }

  if (node.type === "button") {
    return (
      <button key={key} style={style}>
        {node.text ?? "Button"}
      </button>
    );
  }

  const Tag = node.type === "section" ? "section" : "div";

  return (
    <Tag key={key} style={style}>
      {node.children?.map((child, index) => renderNode(child, `${key}-${index}`))}
    </Tag>
  );
}

export default function PreviewPane({ tree, error }: Props) {
  return (
    <div className="stack">
      <h2 className="section-title">3. Live Preview</h2>
      {error ? (
        <div className="error-state">
          <p>Preview unavailable because the layout is invalid.</p>
        </div>
      ) : (
        <div className="preview-canvas">
          {tree ? renderNode(tree, "root") : <p>No preview data available.</p>}
        </div>
      )}
    </div>
  );
}
