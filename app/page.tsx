"use client";

import { useMemo, useState } from "react";
import PromptForm from "@/components/PromptForm";
import PreviewPane from "@/components/PreviewPane";
import TreeView from "@/components/TreeView";
import ExportPanel from "@/components/ExportPanel";
import { demoPrompt, starterTree } from "@/lib/demoData";
import { layoutNodeSchema } from "@/lib/schema";
import type { LayoutNode } from "@/lib/types";

export default function HomePage() {
  const [prompt, setPrompt] = useState(demoPrompt);
  const [tree, setTree] = useState<LayoutNode>(starterTree);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validatedTree = useMemo(() => {
    const result = layoutNodeSchema.safeParse(tree);
    return result.success ? result.data : null;
  }, [tree]);

  async function handleGenerate() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      const data = await response.json();

      if (!response.ok) {
        const message =
          typeof data?.error === "string"
            ? data.error
            : "Failed to generate layout.";
        const issues = Array.isArray(data?.issues)
          ? ` ${data.issues
              .map((issue: { message?: string }) => issue.message)
              .filter(Boolean)
              .join(", ")}`
          : "";
        setError(`${message}${issues}`);
        return;
      }

      const result = layoutNodeSchema.safeParse(data);

      if (!result.success) {
        setError(result.error.issues.map((issue) => issue.message).join(", "));
        return;
      }

      setTree(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Prototype</p>
          <h1>AI-to-Webflow-safe section builder</h1>
          <p className="subtle">
            Prompt input, strict JSON validation, live preview, and HTML/CSS export.
          </p>
        </div>
      </header>

      <section className="workspace-grid">
        <div className="panel">
          <PromptForm
            prompt={prompt}
            onChange={setPrompt}
            onSubmit={handleGenerate}
            loading={loading}
          />
        </div>

        <div className="panel">
          {error ? (
            <div className="error-state">
              <h2>Validation Error</h2>
              <p>{error}</p>
            </div>
          ) : (
            <TreeView tree={validatedTree ?? tree} />
          )}
        </div>

        <div className="panel">
          <PreviewPane tree={validatedTree} error={error} />
        </div>
      </section>

      <section className="export-row">
        <div className="panel">
          <ExportPanel tree={validatedTree} />
        </div>
      </section>
    </main>
  );
}
