import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  value,
  size = 14,
  className,
  showValue = false,
}: {
  value: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className="inline-flex items-center gap-0.5" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => {
          const filled = value - i;
          return (
            <span key={i} className="relative inline-block">
              <Star
                size={size}
                strokeWidth={1.6}
                className="text-ink-300/70"
              />
              {filled > 0 && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${Math.min(1, filled) * 100}%` }}
                >
                  <Star
                    size={size}
                    strokeWidth={1.6}
                    className="fill-champagne-300 text-champagne-300"
                  />
                </span>
              )}
            </span>
          );
        })}
      </span>
      {showValue && (
        <span className="text-[13px] font-medium tabular-nums text-ink-600 text-ink-700">
          {value.toFixed(1)}
        </span>
      )}
    </span>
  );
}
