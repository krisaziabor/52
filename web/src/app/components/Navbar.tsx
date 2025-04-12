"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full">
      {/* Desktop Navigation */}
      <nav className="w-full hidden md:flex justify-between items-center mb-6">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <Image
              src="/KAKA-logo.svg"
              alt="KAKA logo"
              width={24}
              height={24}
              priority
            />
          </Link>
          <Link
            href="/"
            className={`uppercase text-sm ${
              isActive("/") && !pathname.startsWith("/52")
                ? "font-[family-name:var(--font-diatype-mono-medium)]"
                : "font-[family-name:var(--font-diatype-mono)]"
            }`}
          >
            Product
          </Link>
          <Link
            href="/52"
            className={`uppercase text-sm ${
              isActive("/52")
                ? "font-[family-name:var(--font-diatype-mono-medium)]"
                : "font-[family-name:var(--font-diatype-mono)]"
            }`}
          >
            52
          </Link>
          <span className="font-[family-name:var(--font-diatype-mono)] uppercase text-sm text-gray-400 cursor-not-allowed">
            Labs
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <a
            href="mailto:kris@krisaziabor.com"
            className="font-[family-name:var(--font-diatype-mono)] uppercase text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email
          </a>
          <a
            href="https://github.com/krisaziabor"
            className="font-[family-name:var(--font-diatype-mono)] uppercase text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            href="https://linkedin.com/in/krisaziabor"
            className="font-[family-name:var(--font-diatype-mono)] uppercase text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="/KAKAProductResume.pdf"
            className="font-[family-name:var(--font-diatype-mono)] uppercase text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            CV
          </a>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="w-full md:hidden mb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Image
                src="/KAKA-logo.svg"
                alt="KAKA logo"
                width={20}
                height={20}
                priority
              />
            </Link>
            {!isMenuOpen && (
              <span className="font-[family-name:var(--font-diatype-mono)] uppercase text-xs">
                Kris Atteh Kojo Aziabor
              </span>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="flex flex-col justify-center items-center w-8 h-8"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-black mb-1 transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-black mb-1 transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-black transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="pt-8 pb-1 animate-fadeIn">
            <div className="flex flex-col font-[family-name:var(--font-diatype-mono)] uppercase text-xs">
              <div className="flex flex-col space-y-2">
                <Link
                  href="/"
                  className={`${
                    isActive("/") && !pathname.startsWith("/52")
                      ? "font-[family-name:var(--font-diatype-mono-medium)]"
                      : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Product
                </Link>
                <Link
                  href="/52"
                  className={`${
                    isActive("/52")
                      ? "font-[family-name:var(--font-diatype-mono-medium)]"
                      : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  52
                </Link>
                <span className="text-gray-400 cursor-not-allowed">Labs</span>
              </div>

              <div className="mt-4 flex flex-col space-y-2">
                <a
                  href="mailto:kris@krisaziabor.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Email
                </a>
                <a
                  href="https://github.com/krisaziabor"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Github
                </a>
                <a
                  href="https://linkedin.com/in/krisaziabor"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  LinkedIn
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CV
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="border-t border-gray-200 mb-3 md:mb-6"></div>
    </div>
  );
}
