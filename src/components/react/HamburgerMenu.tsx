import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const menuLinks = [
  { label: "Home", href: "/", dot: false },
  { label: "Studio", href: "/studio", dot: false },
  { label: "Work", href: "/portfolio", dot: false },
  { label: "Blog", href: "/blog", dot: true },
  { label: "Contact", href: "/contatto", dot: true },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/bizstudio.it",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    ),
  },
  {
    label: "Dribbble",
    href: "https://dribbble.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/><path d="M8.56 2.75c4.37 6 6 12.37 6.44 18.5"/></svg>
    ),
  },
];

function MenuPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return createPortal(
    <>
      {/* Overlay - click to close */}
      <div
        className="fixed inset-0 z-[200] transition-opacity duration-500"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
        }}
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        className="fixed right-0 top-0 z-[201] h-screen w-full p-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:w-[50vw]"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div className="relative flex h-full w-full flex-col justify-between overflow-auto rounded-3xl bg-white p-9">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors duration-200 hover:bg-gray-200"
            aria-label="Chiudi menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>

          {/* Menu links */}
          <nav className="flex flex-col gap-2 pt-4">
            {menuLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative inline-flex items-center"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  transition: `opacity 0.5s ease ${0.1 + i * 0.05}s, transform 0.5s ease ${0.1 + i * 0.05}s`,
                }}
              >
                <div className="relative overflow-clip">
                  <span className="block text-[2.25rem] font-medium leading-[1.1] tracking-[-0.04em] text-black transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                    {link.label}
                  </span>
                  <span className="absolute inset-0 block translate-y-full text-[2.25rem] font-medium leading-[1.1] tracking-[-0.04em] text-black transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                    {link.label}
                  </span>
                </div>
                {link.dot && (
                  <span className="ml-1 mb-auto mt-1 h-[6px] w-[6px] rounded-full bg-red-500" />
                )}
              </a>
            ))}
          </nav>

          {/* Bottom section */}
          <div className="flex flex-col gap-6">
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 text-black transition-colors duration-200 hover:bg-gray-100"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Legal links */}
            <div className="flex items-center gap-6">
              <a href="/legal/privacy-policy" className="text-sm text-black/40 transition-colors duration-200 hover:text-black">
                Privacy Policy
              </a>
              <a href="/legal/terms-of-use" className="text-sm text-black/40 transition-colors duration-200 hover:text-black">
                Terms of use
              </a>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      {/* Hamburger button - resta nella navbar */}
      <button
        onClick={() => setOpen(!open)}
        className="relative z-[102] flex h-10 w-14 cursor-pointer flex-col items-center justify-center gap-[6px] rounded-lg -mr-2.5"
        aria-label={open ? "Chiudi menu" : "Apri menu"}
      >
        <span
          className="block h-[2px] w-9 bg-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: open ? "rotate(45deg) translate(3px, 3px)" : "none",
          }}
        />
        <span
          className="block h-[2px] w-9 bg-black transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: open ? "rotate(-45deg) translate(2px, -2px)" : "none",
          }}
        />
      </button>

      {/* Portal: pannello e overlay renderizzati direttamente nel body, fuori da #site-content */}
      {mounted && <MenuPanel open={open} onClose={() => setOpen(false)} />}
    </>
  );
}
