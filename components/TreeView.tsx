import type { LayoutNode } from "@/lib/types";

function TreeNode({ node }: { node: LayoutNode }) {
  return (
    <li className="tree-item">
      <div className="tree-node">
        <strong>{node.type}</strong>
        {node.tag ? ` (${node.tag})` : ""}
        {node.text ? ` — "${node.text}"` : ""}
      </div>
      {node.styles ? (
        <div className="tree-meta">{JSON.stringify(node.styles)}</div>
      ) : null}
      {node.children?.length ? (
        <ul className="tree-list">
          {node.children.map((child, index) => (
            <TreeNode key={`${child.type}-${index}`} node={child} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export default function TreeView({ tree }: { tree: LayoutNode }) {
  return (
    <div className="stack">
      <h2 className="section-title">2. Generated JSON Tree</h2>
      <div className="code-block">{JSON.stringify(tree, null, 2)}</div>
      <ul className="tree-list">
        <TreeNode node={tree} />
      </ul>
    </div>
  );
}
