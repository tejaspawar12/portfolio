export default function Badge({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 ${className}`}>
      {label}
    </span>
  );
}
