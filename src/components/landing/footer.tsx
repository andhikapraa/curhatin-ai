import { Instagram } from "lucide-react";
import Image from "next/image";

const featureLinks = [
  { label: "Curhat", href: "#" },
  { label: "Journaling", href: "#" },
  { label: "Mood Tracker", href: "#" },
  { label: "Mindful Moment", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-[#8EBDC1] py-12 lg:py-16">
      <div className="mx-auto max-w-[1226px] px-6 lg:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          {/* Left Column */}
          <div className="flex flex-col gap-5">
            {/* Logo */}
            <Image
              alt="Curhatin AI"
              className="h-auto w-[180px] lg:w-[206px]"
              height={47}
              src="/logo.png"
              width={206}
            />

            {/* Tagline */}
            <p className="max-w-[589px] font-body font-extrabold text-lg text-white leading-[120%] lg:text-2xl">
              Tempat Aman untuk Menenangkan Pikiranmu, Kapan Pun Kamu Butuh
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-[50px]">
              <a
                aria-label="Follow us on Instagram"
                className="flex h-[50px] w-[50px] items-center justify-center text-white transition-opacity hover:opacity-80"
                href="https://instagram.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Instagram className="h-[37px] w-[37px]" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Right Column - Fitur */}
          <div className="flex flex-col gap-2">
            <h3 className="font-body font-extrabold text-white text-xl lg:text-2xl">
              Fitur
            </h3>
            <nav className="flex flex-col gap-1">
              {featureLinks.map((link) => (
                <a
                  className="font-body font-semibold text-lg text-white leading-[150%] transition-opacity hover:opacity-80 lg:text-xl"
                  href={link.href}
                  key={link.label}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
