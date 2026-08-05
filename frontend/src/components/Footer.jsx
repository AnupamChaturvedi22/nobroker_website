import { useState } from "react";
import Brand from "../components/Brand"; // adjust the path if your Brand component lives elsewhere

/* ---------------------------------------------------------------
   Inline icons — kept local so this file drops in with zero new
   dependencies. Swap for lucide-react if you already use it.
---------------------------------------------------------------- */
const Icon = ({ children, className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const FacebookIcon = (p) => (
  <Icon {...p}>
    <path d="M15 3h-2a5 5 0 0 0-5 5v2H6v4h2v7h4v-7h3l1-4h-4V8a1 1 0 0 1 1-1h3z" />
  </Icon>
);
const YoutubeIcon = (p) => (
  <Icon {...p}>
    <rect x="2.5" y="6" width="19" height="12" rx="3.5" />
    <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
  </Icon>
);
const LinkedinIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="9" width="4" height="12" />
    <circle cx="5" cy="4.5" r="1.75" />
    <path d="M11 21v-7a3 3 0 0 1 6 0v7M11 9v12" />
  </Icon>
);
const XIcon = (p) => (
  <Icon {...p}>
    <path d="M4 4l16 16M20 4L4 20" />
  </Icon>
);
const ShieldCheckIcon = (p) => (
  <Icon {...p}>
    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 10-4-2.5-7-5.5-7-10V6z" />
    <path d="M9 12l2 2 4-4" />
  </Icon>
);
const PlusIcon = (p) => (
  <Icon {...p} className="w-3 h-3">
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

/* ---------------------------------------------------------------
   Content — edit freely, this is where the real copy lives
---------------------------------------------------------------- */
const linkColumns = [
  {
    title: "Properties",
    withPlus: true,
    links: ["Buy a home", "Rent a home", "Sell your property", "New projects", "Plots & land", "Commercial spaces"],
  },
  {
    title: "Tools",
    withPlus: true,
    links: ["Rent calculator", "Home loan EMI calculator", "Affordability calculator", "Stamp duty calculator"],
  },
  {
    title: "Resources",
    withPlus: false,
    links: ["Articles", "Customer reviews", "Partner developers", "Newsroom", "Awards"],
  },
  {
    title: "Company",
    withPlus: false,
    links: ["About us", "Careers", "Legal & admin policies", "Contact us"],
  },
];

const paymentMethods = [
  { label: "GPay", render: () => <span className="font-semibold text-[#5F6368]">G <span className="text-[#4285F4]">P</span><span className="text-[#EA4335]">a</span><span className="text-[#FBBC05]">y</span></span> },
  { label: "Visa", render: () => <span className="font-black italic tracking-tight text-[#1A1F71]">VISA</span> },
  { label: "Mastercard", render: () => (
      <span className="flex items-center">
        <span className="-mr-2 h-5 w-5 rounded-full bg-[#EB001B]" />
        <span className="h-5 w-5 rounded-full bg-[#F79E1B] mix-blend-multiply" />
      </span>
    ) },
  { label: "Paytm", render: () => <span className="font-semibold"><span className="text-[#00BAF2]">pay</span><span className="text-[#002E6E]">tm</span></span> },
];

const socials = [
  { label: "Facebook", Icon: FacebookIcon, href: "#" },
  { label: "YouTube", Icon: YoutubeIcon, href: "#" },
  { label: "LinkedIn", Icon: LinkedinIcon, href: "#" },
  { label: "X", Icon: XIcon, href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative m-0 block w-full max-w-none border-t-0 !p-0 bg-[#0F1B2D] text-[#C7D0DE]">
      {/* signature hairline — a horizon line, not a decoration */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A24B] to-transparent" />

      <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10">
        {/* Brand */}
        <div className="mb-12">
          <Brand />
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 lg:gap-x-10">
          {linkColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-sm font-semibold tracking-wide text-[#F5F3EE]">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="flex items-start gap-2 text-sm text-[#8B96A8] transition-colors hover:text-[#E8D5A0]"
                    >
                      {col.withPlus && (
                        <PlusIcon className="mt-0.5 h-3 w-3 shrink-0 text-[#5C6879]" />
                      )}
                      <span>{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Payment / security / social card */}
        <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.03]">
          <div className="flex flex-col divide-y divide-white/10 lg:flex-row lg:divide-x lg:divide-y-0">
            {/* Payment methods */}
            <div className="flex flex-1 flex-col gap-4 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5C6879]">Payment methods</p>
              <div className="flex flex-wrap items-center gap-3">
                {paymentMethods.map((m) => (
                  <span
                    key={m.label}
                    aria-label={m.label}
                    className="flex h-10 w-16 items-center justify-center rounded-md bg-white text-sm"
                  >
                    {m.render()}
                  </span>
                ))}
              </div>
            </div>

            {/* Secured with */}
            <div className="flex flex-1 flex-col items-start justify-center gap-4 p-6 lg:items-center lg:text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5C6879]">Secured with</p>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs font-bold text-emerald-300">
                <ShieldCheckIcon className="h-3.5 w-3.5" />
                PCI DSS Certified
              </span>
            </div>

            {/* Follow us */}
            <div className="flex flex-1 flex-col items-start gap-4 p-6 lg:items-end">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#5C6879]">Follow us on</p>
              <div className="flex items-center gap-3">
                {socials.map(({ label, Icon: SocialIcon, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-[#C7D0DE] transition-colors hover:bg-[#C9A24B]/20 hover:text-[#E8D5A0]"
                  >
                    <SocialIcon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal / compliance */}
        <div className="mt-10 space-y-2.5 text-xs leading-relaxed text-[#5C6879]">
          <p className="flex gap-2">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#5C6879]" />
            <span>
              <span className="font-semibold text-[#8B96A8]">Your Property Platform Private Limited</span> CIN:
              U74999HR2014PTC053454 Registered Office - Plot No. 119, Sector - 44, Gurugram - 122001, Haryana Tel
              no.: 0124-4218302 Email ID: care@yourpropertyplatform.com
            </span>
          </p>
          <p className="flex gap-2">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#5C6879]" />
            <span>
              Your Property Platform is registered as a Real Estate Agent | RERA Registration No. 742, valid till
              09/06/2027, License category - Real Estate Agent
            </span>
          </p>
          <p className="flex gap-2">
            <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#5C6879]" />
            <span>
              Visitors are hereby informed that their information submitted on the website may be shared with
              property owners. Listing information is authentic and solely based on information received from
              owners.
            </span>
          </p>

          <p className="pt-3 font-semibold text-[#8B96A8]">
            BEWARE OF SPURIOUS PHONE CALLS AND FICTITIOUS / FRAUDULENT OFFERS
          </p>
          <p>
            We or our officials do not solicit advance payments over phone calls for property bookings, brokerage,
            or investment of any kind. Anyone receiving such phone calls is requested to lodge a police complaint.
          </p>
        </div>
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="absolute -top-5 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-[#C9A24B]/40 bg-[#0F1B2D] text-[#E8D5A0] shadow-lg transition-transform hover:-translate-y-0.5 lg:right-10"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}