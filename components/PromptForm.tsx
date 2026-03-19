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
    <div className="stack">
      <h2 className="section-title">1. Prompt Input</h2>
      <label className="label" htmlFor="prompt">
        Describe the section you want
      </label>
      <textarea
        id="prompt"
        className="textarea"
        value={prompt}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Create a dark hero section with a large heading, paragraph, and rounded button."
      />
      <button className="button" onClick={onSubmit} disabled={loading}>
        {loading ? "Generating..." : "Generate layout"}
      </button>
    </div>
  );
}
