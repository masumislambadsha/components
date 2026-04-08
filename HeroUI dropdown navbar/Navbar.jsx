"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import GlowButton from "@/components/Shared/GlowButton";

const dropdownFor1 = [
  { id: "", label: "", href: "" },
];

const dropdownFor2 = [
  {
    id: "",
    label: "",
    href: "",
  },
  {
    id: "",
    label: "",
    href: "",
  },
  {
    id: "",
    label: "",
    href: "",
  },
];

const navLinks = [
  { label: "", href: "/" },
  { label: "", href: "", children: dropdownFor1 },
  { label: "", href: "" },
  { label: "", href: "" },
  { label: "", href: "" , children: dropdownFor2 },
  { label: "", href: "" },
];

function NavDropdown({ dark, label, href, items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <Link
        href={href}
        className={`nav-link ${dark ? "text-slate-200" : "text-slate-700"}`}
        onClick={(e) => {
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <span>{label}</span>
        <ChevronDown
          size={13}
          className={`relative z-10 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </Link>

      <div
        className={`
        absolute -left-12 top-[calc(100%+14px)] z-[9999] w-56 rounded-2xl
        shadow-xl overflow-hidden
        transition-all duration-300 origin-top
        ${open ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"}
        ${dark ? "bg-white/5 backdrop-blur-sm border border-white/10 text-slate-200" : "bg-white border border-slate-100 text-slate-700"}
      `}
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="dropdown-item"
            onClick={() => setOpen(false)}
          >
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function NavBarContent({ dark }) {
  return (
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
      <Link
        href="/"
        className={`flex shrink-0 items-center gap-2 text-xl font-bold ${dark ? "text-white" : "text-slate-900"}`}
      >
        LOGO
      </Link>

      <nav className="flex items-center gap-1 text-[13.5px] font-medium">
        {navLinks.map((link) =>
          link.children ? (
            <NavDropdown
              key={link.label}
              dark={dark}
              label={link.label}
              href={link.href}
              items={link.children}
            />
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className={`nav-link ${dark ? "text-slate-200" : "text-slate-700"}`}
            >
              <span>{link.label}</span>
            </Link>
          ),
        )}
      </nav>

      <GlowButton dark={dark}>Get Started</GlowButton>
    </div>
  );
}

export default function Navbar() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-10 bg-transparent backdrop-blur-sm">
        <NavBarContent dark={true} />
      </header>

      <header
        style={{ top: showSticky ? "0" : "-5rem" }}
        className="fixed left-0 right-0 z-50 bg-white shadow-md transition-[top] duration-300"
      >
        <NavBarContent dark={false} />
      </header>
    </>
  );
}
// .nav-link {
//   position: relative;
//   display: inline-flex;
//   align-items: center;
//   gap: 6px;
//   padding: 8px 18px;
//   border-radius: 9px;
//   overflow: hidden;
//   background: transparent;
//   cursor: pointer;
//   text-decoration: none;
//   white-space: nowrap;
//   font-size: inherit;
//   font-family: inherit;
//   transition: color 0.48s cubic-bezier(0.23, 1, 0.32, 1);
// }

// .nav-link::after {
//   content: "";
//   position: absolute;
//   inset: 0;
//   background-color: #0d9488;
//   z-index: -1;
//   border-radius: 9px;
//   transform: scaleX(0);
//   transform-origin: left;
//   transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
// }

// .nav-link:hover {
//   color: #ffffff;
// }
// .nav-link:hover::after {
//   transform: scaleX(1);
//   transform-origin: right;
// }

// /* dropdown item — only ::before pseudo stays here */
// .dropdown-item {
//   display: block;
//   width: 100%;
//   padding: 10px 16px;
//   font-size: 13.5px;
//   text-decoration: none;
//   position: relative;
//   overflow: hidden;
//   color: inherit;
//   transition: color 0.48s cubic-bezier(0.23, 1, 0.32, 1);
// }

// .dropdown-item::before {
//   content: "";
//   position: absolute;
//   inset: 0;
//   background-color: #0d9488;
//   z-index: -1;
//   transform: scaleX(0);
//   transform-origin: left;
//   transition: transform 0.48s cubic-bezier(0.23, 1, 0.32, 1);
// }

// .dropdown-item:hover::before {
//   transform: scaleX(1);
//   transform-origin: right;
// }
// .dropdown-item:hover {
//   color: #ffffff;
// }
