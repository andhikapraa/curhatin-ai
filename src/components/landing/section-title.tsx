import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
};

export function SectionTitle({
  title,
  subtitle,
  align = "center",
  dark = false,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
    >
      <h2
        className={cn(
          "font-bold font-heading text-3xl md:text-4xl",
          dark ? "text-white" : "text-black"
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-lg",
            dark ? "text-neutral-400" : "text-neutral-600"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
