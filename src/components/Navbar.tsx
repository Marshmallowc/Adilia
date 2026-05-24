"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // height of floating pill navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      className={`pill-navbar ${
        scrolled ? "pill-navbar-scrolled" : ""
      } flex items-center justify-between gap-6 sm:gap-10 select-none`}
    >
      {/* Brand Icon */}
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="flex items-center gap-1.5 font-black text-sm text-slate-900 tracking-tighter hover:opacity-80 transition-opacity"
      >
        <span className="bg-slate-900 text-white w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black">
          C
        </span>
        CUST
      </a>

      {/* Compact Nav Links */}
      <div className="flex items-center gap-5 text-[11px] font-bold text-slate-500">
        <a
          href="#portfolio"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("portfolio");
          }}
          className="hover:text-slate-900 transition-colors"
        >
          成果 (Portfolio)
        </a>
        <a
          href="#inquire"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("inquire");
          }}
          className="hover:text-slate-900 transition-colors"
        >
          咨询 (Contact)
        </a>
      </div>

      {/* Direct CTA */}
      <a
        href="#inquire"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("inquire");
        }}
        className="px-3.5 py-1.5 text-[10px] font-extrabold text-white bg-slate-900 hover:bg-indigo-600 rounded-full transition-all hover:scale-[1.03] active:scale-[0.97]"
      >
        预约时间
      </a>
    </nav>
  );
}
