type Props = {
  prompt: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
};

export default function PromptForm({
  prompt,
  onChange,
  onSubmit,
  loading
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
          Prompt
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Write a short UI brief. The mocked generator maps it to a constrained layout tree.
        </p>
      </div>

      <label className="text-sm font-medium text-slate-700" htmlFor="prompt">
        Section description
      </label>

      <textarea
        id="prompt"
        className="min-h-[220px] w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white"
        value={prompt}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Create a dark hero section with a large heading, paragraph, and rounded button."
      />

      <button
        className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-wait disabled:bg-slate-400"
        onClick={onSubmit}
        disabled={loading}
        type="button"
      >
        {loading ? "Generating..." : "Generate layout"}
      </button>
    </div>
  );
}
