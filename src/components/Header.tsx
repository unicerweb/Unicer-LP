"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { COMPANY, NAV_LINKS, SITE_LOGO, WHATSAPP_QUOTE_URL } from "@/lib/constants";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={`header-enter fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-unicer-blue/10 bg-white/95 shadow-lg shadow-unicer-blue/5 backdrop-blur-xl"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="/" className="shrink-0">
          <Image
            src={SITE_LOGO}
            alt={COMPANY.fullName}
            width={200}
            height={68}
            className="h-10 w-auto sm:h-12"
            priority
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-unicer-blue transition-colors hover:bg-unicer-blue/5 hover:text-unicer-red"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={WHATSAPP_QUOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-unicer-red-dark px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-unicer-red-dark/25 transition-all hover:bg-unicer-red-darker hover:scale-[1.02]"
          >
            Solicitar orçamento
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-unicer-blue lg:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-unicer-blue/10 bg-white lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-unicer-blue transition-colors hover:bg-unicer-blue/5 hover:text-unicer-red"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_QUOTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-full bg-unicer-red-dark px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Solicitar orçamento
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
