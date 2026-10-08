import Link from "next/link";
import { Logo } from "./Logo";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, YouTube } from "./Icons";
import { NewsletterForm } from "./NewsletterForm";

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Leadership", href: "/leadership" },
  { label: "Timeline", href: "/timeline" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const VERTICALS = [
  { label: "Source", href: "/source" },
  { label: "OEM Engineering", href: "/oem-engineering" },
  { label: "Powertrain & Battery", href: "/powertrain-battery" },
];

export function Footer() {
  return (
    <footer className="bg-bg pt-20 md:pt-24">
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 pb-14 md:grid-cols-[1.9fr_1fr_1fr_1.1fr] md:gap-12 md:px-14 md:pb-20">
        <div>
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/60">
            We Build, Design & Engineer Industry Defining Technology For The Inevitable Future.
          </p>
          <div className="mt-10 flex items-center gap-5 text-white">
            <a
              href="https://www.facebook.com/amectechnology"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-opacity hover:opacity-70"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://x.com/AMECTechnology"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="transition-opacity hover:opacity-70"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com/amectechnology"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-opacity hover:opacity-70"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://in.linkedin.com/company/amec-technology"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="transition-opacity hover:opacity-70"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://www.youtube.com/@amecmobility"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="transition-opacity hover:opacity-70"
            >
              <YouTube className="h-5 w-5" />
            </a>
          </div>

          <NewsletterForm />
        </div>

        <FooterColumn title="Company" items={COMPANY} />
        <FooterColumn title="Verticals" items={VERTICALS} />

        <div>
          <h3 className="font-display text-base font-semibold uppercase tracking-[0.14em] text-white">Contacts us</h3>
          <ul className="mt-5 space-y-4 text-sm text-white/60">
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <a href="mailto:info@amectechnology.com" className="transition-colors hover:text-white">info@amectechnology.com</a>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <a href="tel:+919021510318" className="transition-colors hover:text-white">+91 9021510318</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                Plot No. 5A,13A MIDC,<br />
                Beside Tata Motors<br />
                Service Centre,<br />
                Hingna MIDC,<br />
                Nagpur – 440016
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] border-t border-white/[0.08] px-6 py-6 md:px-14">
        <div className="flex w-full flex-col items-start justify-between gap-3 text-xs text-white/50 md:flex-row md:items-center">
          <p>© 2026 AMEC Group. All Rights Reserved.</p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>All Rights Reserved</span>
            <span aria-hidden className="text-white/25">|</span>
            <Link href="/terms" className="transition-colors hover:text-white">Terms and Conditions</Link>
            <span aria-hidden className="text-white/25">|</span>
            <Link href="/privacy" className="transition-colors hover:text-white">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-base font-semibold uppercase tracking-[0.14em] text-white">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-white/60">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="transition-colors hover:text-white">{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
