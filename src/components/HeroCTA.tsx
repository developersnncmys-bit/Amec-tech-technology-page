"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/Icons";

type Variant = "ghost" | "primary";

type CommonProps = {
  label: string;
  variant?: Variant;
  className?: string;
  /** Whether to render the sliding arrow. Default true. */
  arrow?: boolean;
};

type AsAnchor = CommonProps & {
  href: string;
  onClick?: never;
};

type AsButton = CommonProps & {
  onClick: () => void;
  href?: never;
};

export type HeroCTAProps = AsAnchor | AsButton;

// Shared sizing — same height on every hero CTA regardless of variant.
const BASE_HEIGHT =
  "group relative inline-flex h-11 items-center overflow-hidden rounded border font-display text-sm font-medium transition-all duration-500 ease-out md:h-12 md:text-base";

// Padding when the sliding arrow is rendered (asymmetric → swaps on hover).
const BASE_WITH_ARROW =
  "pl-11 pr-5 hover:pl-5 hover:pr-11 md:pl-12 md:pr-6 md:hover:pl-6 md:hover:pr-12";

// Padding for the arrow-less button — centered label.
const BASE_NO_ARROW = "justify-center px-6 md:px-8";

const VARIANTS: Record<Variant, { shell: string; arrow: string }> = {
  ghost: {
    shell:
      "border-white/20 bg-transparent text-white hover:border-white hover:bg-white hover:text-black",
    arrow:
      "bg-white text-black group-hover:bg-black group-hover:text-white",
  },
  primary: {
    shell:
      "border-white bg-white text-black hover:bg-white/90",
    arrow: "bg-black text-white",
  },
};

function Inner({
  label,
  variant,
  arrow,
}: {
  label: string;
  variant: Variant;
  arrow: boolean;
}) {
  const v = VARIANTS[variant];
  return (
    <>
      <span className="whitespace-nowrap">{label}</span>
      {arrow && (
        <span
          aria-hidden
          className={`pointer-events-none absolute left-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded transition-all duration-500 ease-out group-hover:left-[calc(100%-2.5rem)] md:h-10 md:w-10 md:group-hover:left-[calc(100%-2.75rem)] ${v.arrow}`}
        >
          <ArrowRight className="h-4 w-4" />
        </span>
      )}
    </>
  );
}

export function HeroCTA(props: HeroCTAProps): ReactNode {
  const { label, variant = "ghost", className = "", arrow = true } = props;
  const padding = arrow ? BASE_WITH_ARROW : BASE_NO_ARROW;
  const shell = `${BASE_HEIGHT} ${padding} ${VARIANTS[variant].shell} ${className}`.trim();

  if ("onClick" in props && props.onClick) {
    return (
      <button type="button" onClick={props.onClick} className={shell}>
        <Inner label={label} variant={variant} arrow={arrow} />
      </button>
    );
  }

  const href = (props as AsAnchor).href;
  const isExternal =
    href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("http");

  if (isExternal) {
    return (
      <a href={href} className={shell}>
        <Inner label={label} variant={variant} arrow={arrow} />
      </a>
    );
  }

  return (
    <Link href={href} className={shell}>
      <Inner label={label} variant={variant} arrow={arrow} />
    </Link>
  );
}
