"use client";

import { useEffect, useState } from "react";
import { renderToHtml } from "@/lib/renderToHtml";
import type { LayoutNode } from "@/lib/types";

type CopyState = "idle" | "html" | "css" | "error";

export default function ExportPanel({ tree }: { tree: LayoutNode | null }) {
  const exported = tree ? renderToHtml(tree) : { html: "", css: "" };
  const [copyState, setCopyState] = useState<CopyState>("idle");

  useEffect(() => {
    if (copyState === "idle") return;

    const timeout = window.setTimeout(() => {
      setCopyState("idle");
    }, 1500);

    return () => window.clearTimeout(timeout);
  }, [copyState]);

  async function handleCopy(value: string, kind: "html" | "css") {
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setCopyState(kind);
    } catch {
      setCopyState("error");
    }
  }

  function getStatusMessage(kind: "html" | "css") {
    if (copyState === kind) return "Copied";
    if (copyState === "error") return "Copy failed";
    return "\u00A0";
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Export
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          HTML and CSS generated from the same validated layout tree.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-700">HTML</p>
            <button
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => handleCopy(exported.html, "html")}
              disabled={!exported.html}
              type="button"
            >
              Copy HTML
            </button>
          </div>
          <div className="text-xs text-slate-500">{getStatusMessage("html")}</div>
          <div className="overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
            {exported.html || "No HTML yet."}
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-700">CSS</p>
            <button
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => handleCopy(exported.css, "css")}
              disabled={!exported.css}
              type="button"
            >
              Copy CSS
            </button>
          </div>
          <div className="text-xs text-slate-500">{getStatusMessage("css")}</div>
          <div className="overflow-auto rounded-lg bg-slate-950 p-4 text-xs leading-6 text-slate-100">
            {exported.css || "No CSS yet."}
          </div>
        </div>
      </div>
    </div>
  );
}
