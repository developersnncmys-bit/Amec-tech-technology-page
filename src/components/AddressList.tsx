"use client";

import { useState } from "react";
import { MapPin } from "./Icons";

type Office = {
  city: string;
  lines: string[];
};

const OFFICES: Office[] = [
  {
    city: "Nagpur",
    lines: [
      "Plot No. 5A,13A MIDC,",
      "Beside Tata Motors",
      "Service Centre,",
      "Hingna MIDC,",
      "Nagpur – 440016",
    ],
  },
  {
    city: "Bangalore",
    lines: [
      "25th Main Rd, 1st Sector,",
      "HSR Layout, Bengaluru,",
      "Karnataka 560102",
    ],
  },
];

export function AddressList() {
  // Default-open the first office so the layout doesn't collapse to a bare
  // list of city names on first paint. User can toggle freely from there.
  const [openCity, setOpenCity] = useState<string | null>(OFFICES[0].city);

  return (
    <ul className="space-y-3">
      {OFFICES.map((office) => {
        const isOpen = openCity === office.city;
        return (
          <li key={office.city} className="text-sm text-white/60">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenCity(isOpen ? null : office.city)}
              className="group flex w-full items-center gap-3 text-left transition-colors hover:text-white"
            >
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="font-medium text-white">{office.city}</span>
              <span
                aria-hidden
                className="ml-auto grid h-5 w-5 shrink-0 place-items-center text-white/50 transition-colors group-hover:text-white"
              >
                {isOpen ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M5 12h14" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14" />
                    <path d="M5 12h14" />
                  </svg>
                )}
              </span>
            </button>

            <div
              className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="min-h-0">
                <p className="mt-2 pl-7 leading-relaxed">
                  {office.lines.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
