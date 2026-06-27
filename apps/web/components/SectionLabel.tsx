export default function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-baseline gap-3 mt-8 mb-3 font-mono text-[11px] tracking-[0.06em] uppercase text-text-muted">
      <span>{label}</span>
      <span className="flex-1 h-px bg-border" />
    </div>
  );
}
