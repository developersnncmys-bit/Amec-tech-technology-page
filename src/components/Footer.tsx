import Link from "next/link";
import { Logo } from "./Logo";
import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter, YouTube } from "./Icons";
import { NewsletterForm } from "./NewsletterForm";
import { AddressList } from "./AddressList";

// About and Timeline intentionally rendered as non-linked labels per request
// — pages still exist at src/app/about and src/app/timeline. To restore
// navigation, remove the `linked: false` flag on either entry.
const COMPANY: { label: string; href: string; linked?: boolean }[] = [
  { label: "About", href: "/about", linked: false },
  { label: "Leadership", href: "/leadership" },
  { label: "Timeline", href: "/timeline", linked: false },
  { label: "Careers", href: "/careers/SeniorSalesManager" },
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
      <div className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 pb-14 tablet:grid-cols-1 tablet:gap-10 tablet:px-8 tablet:pb-16 md:grid-cols-[1.9fr_1fr_1fr_1.1fr] md:gap-12 md:px-14 md:pb-20">
        <div>
          {/* Logo + description + socials — centered on mobile and tablet
              per design, left-aligned on desktop. tablet: counter-overrides
              md: because md: rules also apply at tablet widths. */}
          <div className="flex flex-col items-center text-center tablet:items-center tablet:text-center md:items-start md:text-left">
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
          </div>

          <NewsletterForm />
        </div>

        {/* Company + Verticals — side-by-side 2-col sub-grid on mobile and
            tablet; on desktop `md:contents` dissolves this wrapper so each
            column becomes a direct child of the outer 4-col grid.
            `tablet:grid` + `tablet:grid-cols-2` reasserts the sub-grid at
            tablet widths where `md:contents` would otherwise flatten it. */}
        <div className="grid grid-cols-2 gap-6 tablet:grid tablet:grid-cols-2 md:contents">
          <FooterColumn title="Company" items={COMPANY} />
          <FooterColumn title="Verticals" items={VERTICALS} />
        </div>

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
          </ul>
          {/* Office locations — tappable rows that expand/collapse the full
              street address. Lives in AddressList (client component) so this
              Footer can stay a server component. */}
          <div className="mt-4">
            <AddressList />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] border-t border-white/[0.08] px-6 py-6 tablet:px-8 md:px-14">
        <div className="flex w-full flex-col items-center justify-between gap-3 text-center text-xs text-white/50 tablet:flex-col tablet:items-center tablet:text-center md:flex-row md:items-center md:text-left">
          <p>© 2026 AMEC Group. All Rights Reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 tablet:justify-center md:justify-start">
            <span>All Rights Reserved</span>
            {/* Terms and Conditions + Privacy Policy intentionally unlinked
                per request — pages remain at src/app/terms-of-service and
                src/app/privacy-policy. To restore, swap the <span>s below
                back to <Link href="/terms-of-service"> / <Link href="/privacy-policy">. */}
            <span aria-hidden className="text-white/25">|</span>
            <span>Terms and Conditions</span>
            <span aria-hidden className="text-white/25">|</span>
            <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string; linked?: boolean }[];
}) {
  return (
    <div>
      <h3 className="font-display text-base font-semibold uppercase tracking-[0.14em] text-white">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-white/60">
        {items.map((item) => (
          <li key={item.href}>
            {item.linked === false ? (
              <span>{item.label}</span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-white">{item.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
