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
    <div className="stack">
      <h2 className="section-title">4. Export HTML/CSS</h2>

      <div className="split-export">
        <div className="export-card">
          <div className="export-card-header">
            <p className="label">HTML</p>
            <button
              className="ghost-button"
              onClick={() => handleCopy(exported.html, "html")}
              disabled={!exported.html}
            >
              Copy HTML
            </button>
          </div>
          <div className="copy-status">{getStatusMessage("html")}</div>
          <div className="code-block">{exported.html || "No HTML yet."}</div>
        </div>

        <div className="export-card">
          <div className="export-card-header">
            <p className="label">CSS</p>
            <button
              className="ghost-button"
              onClick={() => handleCopy(exported.css, "css")}
              disabled={!exported.css}
            >
              Copy CSS
            </button>
          </div>
          <div className="copy-status">{getStatusMessage("css")}</div>
          <div className="code-block">{exported.css || "No CSS yet."}</div>
        </div>
      </div>
    </div>
  );
}
