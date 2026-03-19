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
    <div className="flex h-full flex-col gap-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Preview
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Rendered directly from the validated layout tree.
        </p>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Preview unavailable because the layout is invalid.
        </div>
      ) : (
        <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-900 shadow-inner">
          {tree ? renderNode(tree, "root") : <p className="text-sm text-slate-500">No preview data available.</p>}
        </div>
      )}
    </div>
  );
}
