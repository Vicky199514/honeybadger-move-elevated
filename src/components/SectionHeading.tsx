import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  tone?: "ink" | "bone";
  className?: string;
  as?: "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  title,
  copy,
  align = "left",
  tone = "ink",
  className,
  as: Tag = "h2",
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-4", tone === "bone" ? "text-accent" : "text-muted-foreground")}>
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          "text-3xl sm:text-4xl lg:text-5xl",
          tone === "bone" ? "text-bone" : "text-foreground",
        )}
      >
        {title}
      </Tag>
      {copy ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            tone === "bone" ? "text-bone/65" : "text-muted-foreground",
          )}
        >
          {copy}
        </p>
      ) : null}
    </div>
  );
}
