import type { LayoutNode } from "@/lib/types";

function TreeNode({ node }: { node: LayoutNode }) {
  return (
    <li className="mt-3 first:mt-0">
      <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
        <div className="text-sm font-medium text-slate-900">
          {node.type}
          {node.tag ? ` (${node.tag})` : ""}
          {node.text ? ` — \"${node.text}\"` : ""}
        </div>
        {node.styles ? (
          <div className="mt-1 text-xs leading-5 text-slate-500">
            {JSON.stringify(node.styles)}
          </div>
        ) : null}
      </div>

      {node.children?.length ? (
        <ul className="ml-4 border-l border-slate-200 pl-4">
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
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          JSON tree
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Inspect the constrained node graph before it reaches preview or export.
        </p>
      </div>

      <div className="overflow-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-xs leading-6 text-slate-100">
        {JSON.stringify(tree, null, 2)}
      </div>

      <ul className="m-0 list-none p-0">
        <TreeNode node={tree} />
      </ul>
    </div>
  );
}
