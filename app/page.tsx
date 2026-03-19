"use client";

import { useMemo, useState } from "react";
import PromptForm from "@/components/PromptForm";
import PreviewPane from "@/components/PreviewPane";
import TreeView from "@/components/TreeView";
import ExportPanel from "@/components/ExportPanel";
import { demoPrompt, starterTree } from "@/lib/demoData";
import { generateLayoutFromPrompt } from "@/lib/generateLayoutFromPrompt";
import { layoutNodeSchema } from "@/lib/schema";
import type { LayoutNode } from "@/lib/types";

const promptExamples = [
  "Create a dark hero section with a large heading, paragraph, and rounded button.",
  "Make a CTA section with text on the left and a button on the right.",
  "Build a feature section with headline, body copy, and one primary CTA."
];

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
      const nextTree = generateLayoutFromPrompt(prompt);
      const result = layoutNodeSchema.safeParse(nextTree);

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
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b border-slate-200 pb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                AI Webflow Mini
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Prompt to validated layout
              </h1>
            </div>
            <div className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">
              GitHub Pages ready
            </div>
          </div>
          <p className="max-w-3xl text-sm leading-6 text-slate-600">
            Describe a section, inspect the generated node tree, preview the result,
            and export HTML/CSS from the same validated structure.
          </p>
          <div className="flex flex-wrap gap-2">
            {promptExamples.map((example) => (
              <button
                key={example}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-left text-xs text-slate-600 transition hover:border-slate-300 hover:bg-slate-100"
                onClick={() => setPrompt(example)}
                type="button"
              >
                {example}
              </button>
            ))}
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr_1fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <PromptForm
              prompt={prompt}
              onChange={setPrompt}
              onSubmit={handleGenerate}
              loading={loading}
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <h2 className="font-semibold text-red-900">Validation error</h2>
                <p className="mt-2 leading-6">{error}</p>
              </div>
            ) : (
              <TreeView tree={validatedTree ?? tree} />
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <PreviewPane tree={validatedTree} error={error} />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <ExportPanel tree={validatedTree} />
        </section>
      </div>
    </main>
  );
}
