import Mark from "./Mark";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-end md:justify-between">
        <div className="flex items-center gap-3">
          <Mark className="h-6 w-6" />
          <div>
            <div className="font-serif">Momentum</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-faint)]">
              Pompano Beach, Florida
            </div>
          </div>
        </div>
        <p className="max-w-sm text-xs leading-relaxed text-[var(--color-faint)]">
          Built for local operators. Honesty, integrity, simplicity.
          Momentum is its own company. We partner with the stores.
        </p>
      </div>
    </footer>
  );
}
