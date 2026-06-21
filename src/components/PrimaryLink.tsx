import Link from "next/link";
import type { ReactNode } from "react";

type PrimaryLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "solid" | "outline" | "quiet";
};

export function PrimaryLink({ href, children, variant = "solid" }: PrimaryLinkProps) {
  const className =
    variant === "solid"
      ? "bg-mint text-white hover:bg-mint/90"
      : variant === "outline"
        ? "border border-mint bg-white text-mint hover:bg-mint/5"
        : "text-ink/70 hover:bg-white";

  return (
    <Link
      href={href}
      className={`focus-ring inline-flex min-h-12 items-center justify-center rounded-lg px-5 py-3 text-center text-base font-bold transition ${className}`}
    >
      {children}
    </Link>
  );
}
