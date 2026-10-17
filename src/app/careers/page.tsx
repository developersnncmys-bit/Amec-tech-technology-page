"use client";

import { Fragment, useRef, useState } from "react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { Footer } from "@/components/Footer";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const JOB = {
  titleTop: "Hiring Senior Sales Manager",
  titleBottom: "Industrial Cleaning Equipment Sales",
  meta: [
    {
      label: "Industry",
      value:
        "Industrial Cleaning Equipment | Portable Washing Systems | Pressure Washer Solutions",
    },
    {
      label: "Product Focus",
      value: "Portable Washing Kits / Mobile Cleaning Systems",
    },
    {
      label: "Location",
      value:
        "AMEC Technology Pvt. Ltd. -  Plot No. 5A,13A MIDC, Beside Tata Motors Service Centre, Hingna MIDC, Nagpur. MH- 440016",
    },
    {
      label: "Role Type",
      value: "Full-Time | Strategic Individual Contributor",
    },
  ],
};

type Section =
  | { heading: string; paragraphs?: string[]; bullets?: string[]; lead?: string }
  | { heading: string; subsections: { subheading?: string; paragraphs?: string[]; bullets?: string[] }[] };

const JOB_SECTIONS: Section[] = [
  {
    heading: "Role Summary",
    paragraphs: [
      "AMEC Technology is seeking an experienced B2B Sales Professional with a strong background in industrial cleaning equipment or pressure washer systems.",
      "This role will lead the market expansion of AMEC's Portable Washing Kits, targeting industries where efficient, mobile cleaning solutions are critical to daily operations.",
      "The ideal candidate will have hands-on experience selling industrial cleaning equipment or pressure washer systems, and a strong understanding of the industries that regularly use these products.",
      "You will work directly with industrial clients, service networks, distributors, and international buyers, helping build a scalable sales pipeline and expanding AMEC's presence across India and export markets.",
    ],
  },
  {
    heading: "Target Customer Segments",
    lead: "The role will focus on selling to high-consumption industries that regularly deploy industrial cleaning systems, including:",
    bullets: [
      "Automotive OEM service networks and workshops",
      "Logistics and fleet operators",
      "Industrial manufacturing plants",
      "Construction and infrastructure companies",
      "Facility management companies",
      "Railways, bus depots, and transport infrastructure",
      "Equipment distributors and dealers",
      "International importers and distributors of cleaning equipment",
    ],
  },
  {
    heading: "Required Experience",
    paragraphs: [
      "We are specifically looking for candidates who have directly sold industrial cleaning equipment or pressure washer systems.",
    ],
    lead: "Industry Experience Candidates should have experience in one or more of the following sectors:",
    bullets: [
      "Industrial cleaning equipment",
      "Pressure washer systems",
      "High-pressure cleaning equipment",
      "Portable washing machines",
      "Car wash equipment",
      "Industrial maintenance equipment",
    ],
  },
  {
    heading: "Industrial Equipment Sales & Market Expansion",
    bullets: [
      "Drive sales of portable washing kits and industrial cleaning systems across multiple industry sectors.",
      "Identify and approach companies currently using pressure washers, cleaning systems, and industrial wash equipment.",
      "Develop strong relationships with purchase managers, plant heads, maintenance heads, and operations leaders. Build high-value sales opportunities with industrial clients and service networks.",
    ],
  },
  {
    heading: "B2B Client Acquisition",
    bullets: [
      "Identify and engage industrial buyers with recurring cleaning equipment requirements.",
      "Build relationships with companies in sectors such as automotive servicing, logistics, manufacturing, and construction.",
      "Generate new business through direct outreach, industry networking, and referrals.",
    ],
  },
  {
    heading: "Distributor & Channel Development",
    bullets: [
      "Identify and onboard industrial equipment distributors and regional dealers.",
      "Build a structured channel network across key industrial cities and clusters.",
      "Develop long-term partnerships to expand product reach and market penetration.",
    ],
  },
  {
    heading: "Export Market Development",
    bullets: [
      "Identify and develop relationships with international distributors and bulk buyers of cleaning equipment.",
      "Support export expansion across regions such as: Middle East, Southeast Asia, Africa, Latin America",
      "Engage with global trade platforms and export channels to generate international sales opportunities.",
    ],
  },
  {
    heading: "Sales Pipeline & Deal Management",
    bullets: [
      "Build and manage a robust pipeline of B2B prospects.",
      "Conduct product demonstrations, solution presentations, and technical discussions with prospective clients.",
      "Prepare commercial proposals, pricing quotations, and negotiation strategies.",
      "Convert qualified prospects into long-term customers and confirmed orders.",
    ],
  },
  {
    heading: "Market Intelligence & Strategy",
    bullets: [
      "Track competitor offerings, pricing, and product positioning in the industrial cleaning equipment market.",
      "Identify high-demand sectors where portable cleaning systems can scale quickly.",
      "Provide feedback to internal teams to help strengthen product positioning and sales strategy.",
      "4–6 years of B2B sales experience in industrial equipment or cleaning systems.",
      "Demonstrated experience selling to industrial companies, service networks, or equipment distributors.",
      "Experience handling large client accounts, distributor partnerships, or export clients.",
    ],
  },
  {
    heading: "Key Skills Industry & Product Knowledge",
    bullets: [
      "Strong understanding of pressure washer systems and industrial cleaning applications.",
      "Knowledge of industries that rely heavily on equipment-based cleaning solutions.",
    ],
  },
  {
    heading: "B2B Sales Capabilities",
    bullets: [
      "Prospecting and new client acquisition",
      "Distributor and channel development",
      "Negotiation and deal closure",
      "Industrial account management",
    ],
  },
  {
    heading: "Communication & Presentation",
    bullets: [
      "Strong professional communication and client engagement skills",
      "Ability to present product value and operational ROI to industrial buyers Confidence engaging with decision-makers, procurement teams, and technical stakeholders.",
    ],
  },
  {
    heading: "Desired Qualifications",
    bullets: [
      "Bachelor's Degree (Engineering, Business, or Marketing preferred)",
      "Experience working with industrial distributors or equipment dealers",
      "Exposure to export sales or international trade platforms is an advantage",
    ],
  },
  {
    heading: "Key Performance Indicators (KPIs)",
    lead: "Success in this role will be measured through:",
    bullets: [
      "Number of new industrial clients acquired",
      "Distributor and channel partnerships established",
      "Monthly sales revenue generated",
      "Number of export clients onboarded",
      "Lead-to-order conversion rate",
      "Expansion into new industry segments",
    ],
  },
  {
    heading: "Why This Role Matters",
    paragraphs: [
      "Portable cleaning systems are becoming increasingly important across industries due to the need for mobility, operational efficiency, and water-efficient cleaning solutions. This role will play a critical part in expanding AMEC's presence across industrial sectors and international markets, helping establish a scalable distribution and customer network.",
    ],
  },
  {
    heading: "Growth Opportunity",
    paragraphs: [
      "This position offers strong long-term career growth for high-performing candidates, with potential progression into roles such as: National Sales Head / Global Business Development Leader / Head – Industrial Sales",
    ],
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CareersPage() {
  return (
    <>
      <Hero />
      <JobDetails />
      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// Hero — full-bleed dark industrial background + centered title
// ---------------------------------------------------------------------------

function Hero() {
  const ref = useRef<HTMLElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-overlay]", { autoAlpha: 0, duration: 0.8 })
        .from(
          "[data-hero-line]",
          {
            autoAlpha: 0,
            y: 40,
            duration: 0.9,
            stagger: 0.14,
            clearProps: "transform",
          },
          "-=0.5"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[55vh] w-full items-center justify-center overflow-hidden bg-[#0a0a0a] pt-24 tablet:min-h-[70vh] tablet:pt-24 md:min-h-[80vh] md:pt-32"
    >
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          src="/videos/career.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/OEM-engineering.png"
        />
        <div
          data-hero-overlay
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 py-10 text-center md:py-24">
        <h1 className="font-display font-semibold uppercase leading-[1.08] text-white">
          <span
            data-hero-line
            className="block text-[32px] md:text-[52px] lg:text-[64px]"
          >
            {JOB.titleTop}
          </span>
          <span
            data-hero-line
            className="mt-2 block text-[28px] md:text-[46px] lg:text-[56px]"
          >
            {JOB.titleBottom}
          </span>
        </h1>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Job Details — light background, 2-column (meta + application form)
// ---------------------------------------------------------------------------

type SubmitState = "idle" | "submitting" | "success" | "error";

function JobDetails() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const descRef = useRef<HTMLDivElement | null>(null);
  const [descOpen, setDescOpen] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const [fileError, setFileError] = useState<string>("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState<string>("");

  const MAX_PDF_BYTES = 5 * 1024 * 1024; // 5 MB

  useIsomorphicLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-meta-row]", {
        autoAlpha: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });

      gsap.from("[data-form-card]", {
        autoAlpha: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      });

      gsap.from("[data-form-field]", {
        autoAlpha: 0,
        y: 12,
        duration: 0.5,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-form-card]", start: "top 85%" },
        delay: 0.25,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  // Smooth height-based accordion for the description block. We keep the
  // list visible for SSR/no-JS by rendering it; GSAP only controls height
  // when the toggle is used.
  useIsomorphicLayoutEffect(() => {
    const el = descRef.current;
    if (!el) return;

    if (descOpen) {
      gsap.set(el, { display: "block" });
      gsap.fromTo(
        el,
        { height: 0, autoAlpha: 0 },
        {
          height: "auto",
          autoAlpha: 1,
          duration: 0.6,
          ease: "power3.out",
          onComplete: () => ScrollTrigger.refresh(),
        }
      );

      const sections = el.querySelectorAll<HTMLElement>("[data-desc-block]");
      gsap.fromTo(
        sections,
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.07,
          ease: "power2.out",
          delay: 0.15,
        }
      );
    } else {
      gsap.to(el, {
        height: 0,
        autoAlpha: 0,
        duration: 0.45,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(el, { display: "none" });
          ScrollTrigger.refresh();
        },
      });
    }
  }, [descOpen]);

  const rejectFile = (input: HTMLInputElement, msg: string) => {
    setFileError(msg);
    setFileName("");
    input.value = "";
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const f = input.files?.[0];

    if (!f) {
      setFileName("");
      setFileError("");
      return;
    }

    const isPdfExt = /\.pdf$/i.test(f.name);
    const isPdfMime = !f.type || f.type === "application/pdf";

    if (!isPdfExt || !isPdfMime) {
      rejectFile(input, "Only PDF files are allowed.");
      return;
    }

    if (f.size > MAX_PDF_BYTES) {
      rejectFile(input, "PDF must be 5 MB or smaller.");
      return;
    }

    // Magic-byte check: real PDFs start with "%PDF-" (0x25 0x50 0x44 0x46 0x2D).
    // Catches files renamed from .docx/.jpg/etc. to .pdf.
    try {
      const head = new Uint8Array(await f.slice(0, 5).arrayBuffer());
      const isPdfMagic =
        head.length === 5 &&
        head[0] === 0x25 &&
        head[1] === 0x50 &&
        head[2] === 0x44 &&
        head[3] === 0x46 &&
        head[4] === 0x2d;
      if (!isPdfMagic) {
        rejectFile(input, "That file is not a valid PDF.");
        return;
      }
    } catch {
      rejectFile(input, "Could not read the file. Please try another.");
      return;
    }

    setFileError("");
    setFileName(f.name);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitState === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("role", `${JOB.titleTop} — ${JOB.titleBottom}`);

    setSubmitState("submitting");
    setSubmitMessage("");

    try {
      const res = await fetch("/api/careers", { method: "POST", body: data });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !json.ok) {
        setSubmitState("error");
        setSubmitMessage(json.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitState("success");
      setSubmitMessage("Thanks — your application has been sent.");
      form.reset();
      setFileName("");
    } catch {
      setSubmitState("error");
      setSubmitMessage("Network error. Please try again.");
    }
  };

  return (
    <section ref={sectionRef} className="w-full bg-[#F2F2F2] py-8 md:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-14">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-x-14 md:gap-y-10 tablet:grid-cols-1 tablet:gap-10">
          {/* Job meta — top-left on desktop, first on mobile */}
          <div className="order-2 md:col-start-1 md:row-start-1 md:order-none tablet:order-2 tablet:col-start-auto tablet:row-start-auto">
            <ul className="space-y-7">
              {JOB.meta.map((m) => (
                <li key={m.label} data-meta-row>
                  <h3 className="font-display text-lg font-semibold text-black md:text-xl">
                    {m.label}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-black/70 md:text-[15px]">
                    {m.value}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Collapsible job description — bottom-left on desktop, LAST on
              mobile (sits below the form per the design). */}
          <div className="order-3 md:col-start-1 md:row-start-2 md:order-none tablet:order-3 tablet:col-start-auto tablet:row-start-auto">
            <div aria-hidden className="h-px w-full bg-black/15" />
            <button
              type="button"
              aria-expanded={descOpen}
              onClick={() => setDescOpen((v) => !v)}
              className="group flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="font-display text-xl font-semibold text-black md:text-2xl">
                {descOpen ? "Close Job Description" : "View Job Description"}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-black transition-transform duration-300 ${
                  descOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div aria-hidden className="h-px w-full bg-black/15" />

            <div
              ref={descRef}
              className="overflow-hidden"
              style={{ height: 0, opacity: 0, display: "none" }}
            >
              <div className="space-y-9 pt-8">
                {JOB_SECTIONS.map((s, idx) => (
                  <JobSection key={idx} section={s} />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Dark application form card. On desktop sits in the right
              column spanning both rows; on mobile sits between meta and the
              dropdown (order-2). */}
          <div data-form-card className="order-1 h-fit rounded-2xl bg-[#111111] p-6 md:col-start-2 md:row-span-2 md:row-start-1 md:order-none md:p-8 md:sticky md:top-28 tablet:static tablet:order-1 tablet:col-start-auto tablet:row-start-auto tablet:row-span-1">
            {submitState === "success" ? (
              <SuccessCard
                onSendAnother={() => {
                  setSubmitState("idle");
                  setSubmitMessage("");
                }}
              />
            ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-5">
              <div data-form-field>
                <label
                  htmlFor="resume"
                  className="block font-display text-sm font-medium text-white md:text-[15px]"
                >
                  Upload Resume
                </label>
                <div className="mt-2 flex items-center justify-between gap-3 rounded-md border border-white/10 bg-[#1b1b1b] px-4 py-3">
                  <span
                    className={`truncate text-sm ${
                      fileName ? "text-white" : "text-white/50"
                    }`}
                  >
                    {fileName || "Upload your resume (PDF)"}
                  </span>
                  <label
                    htmlFor="resume"
                    className="shrink-0 cursor-pointer rounded-md bg-white px-4 py-2 font-display text-xs font-medium text-black transition hover:bg-white/90 md:text-sm"
                  >
                    Choose file
                  </label>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={onFileChange}
                    className="sr-only"
                  />
                </div>
                {fileError ? (
                  <p className="mt-2 text-xs text-red-400">{fileError}</p>
                ) : null}
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <Field
                  label="City"
                  name="city"
                  placeholder="Enter your city"
                />
                <Field
                  label="Education"
                  name="education"
                  placeholder="Enter your education"
                />
                <Field
                  label="Experience in Years"
                  name="experience"
                  placeholder="Enter your experience"
                />
                <Field
                  label="Past Company Name"
                  name="pastCompany"
                  placeholder="Enter past company name"
                />
              </div>

              <button
                type="submit"
                disabled={submitState === "submitting"}
                className="mt-3 flex w-full items-center justify-center rounded-md bg-white px-6 py-3.5 font-display text-sm font-semibold text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60 md:text-base"
              >
                {submitState === "submitting" ? "Submitting…" : "Submit"}
              </button>

              {submitState === "error" && submitMessage ? (
                <p role="status" className="text-sm text-red-400">
                  {submitMessage}
                </p>
              ) : null}
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Pieces
// ---------------------------------------------------------------------------

function SuccessCard({ onSendAnother }: { onSendAnother: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[360px] flex-col items-center justify-center gap-5 rounded-xl bg-[#0a0a0a] px-6 py-10 text-center md:min-h-[460px] md:px-10 md:py-14"
    >
      <span className="grid h-16 w-16 place-items-center rounded-full bg-white text-black md:h-20 md:w-20">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7 md:h-9 md:w-9"
          aria-hidden
        >
          <path d="m5 12 5 5L20 7" />
        </svg>
      </span>

      <div className="space-y-2">
        <h3 className="font-display text-lg font-semibold text-white md:text-xl">
          Thanks your application has been sent.
        </h3>
        <p className="text-sm leading-relaxed text-white/70 md:text-[15px]">
          Our team will contact you soon.
        </p>
      </div>

      <button
        type="button"
        onClick={onSendAnother}
        className="mt-2 rounded-md border border-white/15 px-5 py-2 font-display text-xs font-medium text-white/80 transition hover:border-white/40 hover:bg-white/[0.04] hover:text-white md:text-sm"
      >
        Send another application
      </button>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div data-form-field>
      <label
        htmlFor={name}
        className="block font-display text-sm font-medium text-white md:text-[15px]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-md border border-white/10 bg-[#1b1b1b] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
      />
    </div>
  );
}

function JobSection({ section }: { section: Section }) {
  const hasSubs = "subsections" in section;

  return (
    <div data-desc-block>
      <h3 className="font-display text-lg font-semibold text-black md:text-xl">
        {section.heading}
      </h3>

      {!hasSubs ? (
        <div className="mt-3 space-y-3">
          {section.paragraphs?.map((p, i) => (
            <p key={i} className="text-sm leading-relaxed text-black/75 md:text-[15px]">
              {p}
            </p>
          ))}
          {section.lead ? (
            <p className="text-sm leading-relaxed text-black/75 md:text-[15px]">
              {section.lead}
            </p>
          ) : null}
          {section.bullets ? (
            <ul className="list-none space-y-2 pl-0 text-sm text-black/75 md:text-[15px]">
              {section.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 leading-relaxed">
                  <span aria-hidden className="mt-[0.65em] inline-block h-[2px] w-3 shrink-0 bg-black/60" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <div className="mt-3 space-y-5">
          {section.subsections.map((sub, i) => (
            <Fragment key={i}>
              {sub.subheading ? (
                <h4 className="font-display text-base font-semibold text-black">
                  {sub.subheading}
                </h4>
              ) : null}
              {sub.paragraphs?.map((p, j) => (
                <p
                  key={j}
                  className="text-sm leading-relaxed text-black/75 md:text-[15px]"
                >
                  {p}
                </p>
              ))}
              {sub.bullets ? (
                <ul className="list-none space-y-2 pl-0 text-sm text-black/75 md:text-[15px]">
                  {sub.bullets.map((b, k) => (
                    <li key={k} className="flex gap-3 leading-relaxed">
                      <span aria-hidden className="mt-[0.65em] inline-block h-[2px] w-3 shrink-0 bg-black/60" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
