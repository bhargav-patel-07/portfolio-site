import { cn } from "@/lib/utils";

interface GridPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  className?: string;
}

export function GridPattern({
  width = 20,
  height = 20,
  x = -1,
  y = -1,
  className,
}: GridPatternProps) {
  return (
    <svg
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-white/20 stroke-white/20",
        className
      )}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="grid-pattern"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" stroke="currentColor" strokeWidth="0.1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  );
}
