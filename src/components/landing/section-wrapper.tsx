import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionWrapperProps = {
  children: ReactNode;
  id?: string;
  background?: "white" | "secondary" | "black";
  className?: string;
};

export function SectionWrapper({
  children,
  id,
  background = "white",
  className,
}: SectionWrapperProps) {
  const bgStyles = {
    white: "bg-white",
    secondary: "bg-secondary-100",
    black: "bg-black",
  };

  return (
    <section
      className={cn("px-6 py-24", bgStyles[background], className)}
      id={id}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}
