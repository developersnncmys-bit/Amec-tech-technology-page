"use client";

import { useEffect, useId, useRef, useState } from "react";

type Props = {
  id?: string;
  name: string;
  options: readonly string[];
  defaultValue?: string;
  placeholder?: string;
  invalid?: boolean;
  size?: "sm" | "md";
};

export function EnquiryTypeSelect({
  id,
  name,
  options,
  defaultValue = "",
  placeholder = "Select your area of interest",
  invalid = false,
  size = "md",
}: Props) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false);
  const [maxListHeight, setMaxListHeight] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.indexOf(defaultValue))
  );
  const rootRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const autoId = useId();
  const triggerId = id ?? `enq-${autoId}`;
  const listId = `${triggerId}-list`;

  // Decide whether to drop up or down based on available viewport space,
  // and clamp the list height so it never spills off-screen (which would
  // hide items behind the scrollbar edge).
  useEffect(() => {
    if (!open) return;
    const measure = () => {
      const btn = triggerRef.current;
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      const margin = 16;
      const spaceBelow = window.innerHeight - r.bottom - margin;
      const spaceAbove = r.top - margin;
      const preferUp = spaceBelow < 240 && spaceAbove > spaceBelow;
      setDropUp(preferUp);
      setMaxListHeight(Math.max(160, preferUp ? spaceAbove : spaceBelow));
    };
    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current?.querySelector<HTMLLIElement>(
      `[data-index="${activeIndex}"]`
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const choose = (v: string) => {
    setValue(v);
    setActiveIndex(Math.max(0, options.indexOf(v)));
    setOpen(false);
  };

  const onTriggerKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const onListKey = (e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(options[activeIndex]);
    }
  };

  const sizeCls =
    size === "sm"
      ? "px-4 py-3 text-sm md:text-[15px]"
      : "px-5 py-4 text-sm md:text-base";
  const triggerCls = [
    "flex w-full items-center justify-between gap-3 rounded-md border bg-white/[0.03] text-left text-white outline-none transition",
    sizeCls,
    invalid
      ? "border-red-400/60 focus:border-red-400"
      : open
      ? "border-white/40 bg-white/[0.05]"
      : "border-white/10 hover:border-white/20 focus:border-white/40 focus:bg-white/[0.05]",
  ].join(" ");

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        className={triggerCls}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onTriggerKey}
      >
        <span className={value ? "text-white" : "text-white/40"}>
          {value || placeholder}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className={`h-4 w-4 shrink-0 text-white/60 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`${triggerId}-opt-${activeIndex}`}
          onKeyDown={onListKey}
          style={{
            maxHeight: maxListHeight ? `${Math.min(maxListHeight, 320)}px` : undefined,
          }}
          className={`absolute left-0 right-0 z-50 overflow-auto rounded-lg border border-white/10 bg-[#141414] p-1 shadow-[0_12px_32px_rgba(0,0,0,0.5)] focus:outline-none ${
            dropUp ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {options.map((opt, i) => {
            const selected = value === opt;
            const active = i === activeIndex;
            return (
              <li
                key={opt}
                id={`${triggerId}-opt-${i}`}
                data-index={i}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => choose(opt)}
                className={[
                  "cursor-pointer rounded-md px-4 py-3 text-sm text-white/80 transition-colors md:text-[15px]",
                  active || selected
                    ? "bg-white/[0.08] text-white"
                    : "hover:bg-white/[0.05] hover:text-white",
                ].join(" ")}
              >
                {opt}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
