import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "primary",
  className,
}: {
  children: ReactNode;
  tone?: "primary" | "secondary" | "accent" | "sand";
  className?: string | undefined;
}) {
  const tones = {
    primary: "bg-primary/12 text-primary",
    secondary: "bg-secondary/30 text-secondary-foreground",
    accent: "bg-accent/12 text-accent",
    sand: "bg-sand text-sand-foreground",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Btn({
  children,
  variant = "primary",
  size = "md",
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "outline";
  size?: "sm" | "md";
}) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:brightness-110 shadow-soft",
    secondary: "bg-secondary text-secondary-foreground hover:brightness-105 shadow-soft",
    accent: "bg-accent text-accent-foreground hover:brightness-110 shadow-soft",
    ghost: "bg-transparent text-foreground hover:bg-muted",
    outline: "border border-border bg-card text-foreground hover:bg-muted",
  } as const;
  return (
    <button
      {...rest}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:active:scale-100",
        size === "sm" ? "min-w-11 px-3 py-2 text-xs" : "min-w-11 px-4 py-2.5 text-sm",
        variants[variant],
        className,
      )}
    >
      {children}
    </button>
  );
}


export function Card({ children, className }: { children: ReactNode; className?: string | undefined }) {
  return <div className={cn("card-coina overflow-hidden", className)}>{children}</div>;
}

export function SectionTitle({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <div className="mb-3">
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-xl text-foreground">{title}</h2>
    </div>
  );
}

export function Sheet({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />
      <div className="relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-card p-5 shadow-lift animate-fade-up sm:max-w-md sm:rounded-3xl">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg leading-tight text-foreground">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted"
            aria-label="Cerrar"
          >
            <X className="size-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Skeleton({ className }: { className?: string | undefined }) {
  return <div className={cn("animate-pulse rounded-xl bg-muted", className)} />;
}
