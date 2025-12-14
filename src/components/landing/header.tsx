"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/animate-ui/components/radix/sheet";

const navLinks = [
  { href: "#why-us", label: "Kenapa Curhatin?" },
  { href: "#features", label: "Fitur" },
  { href: "#how-it-works", label: "Cara Kerja" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-secondary-600">
      <nav className="mx-auto flex h-[109px] max-w-7xl items-center justify-between px-6 lg:px-12">
        {/* Logo */}
        <a className="flex-shrink-0" href="/">
          <Image
            alt="Curhatin AI"
            className="h-auto w-[180px] md:w-[250px]"
            height={47}
            priority
            src="/logo.png"
            width={250}
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-[30px] lg:flex">
          {navLinks.map((link) => (
            <a
              className="font-heading font-normal text-white text-xl transition-opacity hover:opacity-80"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="flex h-10 w-10 items-center justify-center text-white"
                type="button"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              className="border-l-0 bg-secondary-600 px-8 pt-8"
              side="right"
            >
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-10 flex flex-col gap-8">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      className="font-heading font-normal text-white text-xl transition-opacity hover:opacity-80"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
