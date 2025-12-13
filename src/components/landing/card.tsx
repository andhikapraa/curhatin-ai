import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
  variant?: "benefit" | "feature";
};

export function Card({
  icon,
  title,
  description,
  className,
  variant = "benefit",
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        variant === "benefit" &&
          "hover:-translate-y-1 bg-secondary-200 hover:shadow-lg",
        variant === "feature" &&
          "hover:-translate-y-2 bg-white shadow-md hover:shadow-xl",
        className
      )}
    >
      {icon ? (
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
          {icon}
        </div>
      ) : null}
      <h3 className="font-bold font-heading text-black text-xl">{title}</h3>
      <p className="mt-2 text-neutral-700">{description}</p>
    </div>
  );
}
