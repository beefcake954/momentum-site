import Mark from "./Mark";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] pb-28 md:pb-0">
      <div className="wrap flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between md:py-16">
        <div className="flex items-center gap-4">
          <Mark className="h-7 w-7" />
          <div>
            <div className="font-serif text-[22px] leading-none">Momentum</div>
            <div className="label mt-2 text-[var(--color-faint)]">Pompano Beach, Florida</div>
          </div>
        </div>
        <p className="max-w-sm text-[13px] leading-relaxed text-[var(--color-faint)] md:text-right">
          Built for local operators. Honesty, integrity, simplicity.
          Momentum is its own company. We partner with the stores.
        </p>
      </div>
    </footer>
  );
}
