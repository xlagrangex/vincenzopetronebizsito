import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const navLinks = [
  { label: "Work", href: "/portfolio" },
  { label: "Servizi", href: "#servizi" },
  { label: "Recensioni", href: "#recensioni" },
  { label: "Blog", href: "/blog" },
];

const menuLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/portfolio" },
  { label: "Servizi", href: "#servizi" },
  { label: "Recensioni", href: "#recensioni" },
  { label: "Blog", href: "/blog" },
  { label: "Contattaci", href: "/contatto" },
];

const LIQUID_GLASS =
  "border border-white/40 bg-white/50 shadow-[0_4px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.04)] backdrop-blur-[28px] backdrop-saturate-[1.6]";

function MenuPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return createPortal(
    <>
      <div
        className="fixed inset-0 z-[200] transition-opacity duration-500"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={onClose}
      />
      <div
        className="fixed right-0 top-0 z-[201] h-screen w-full p-3 transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0,1)] md:w-[50vw]"
        style={{ transform: open ? "translateX(0)" : "translateX(100%)" }}
      >
        <div className="relative flex h-full w-full flex-col justify-between overflow-auto rounded-3xl bg-white p-9 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors duration-200 hover:bg-gray-200"
            aria-label="Chiudi menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
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
                  <span className="block text-[2.25rem] font-medium leading-[1.1] tracking-[-0.04em] text-black transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0,1)] group-hover:-translate-y-full">
                    {link.label}
                  </span>
                  <span className="absolute inset-0 block translate-y-full text-[2.25rem] font-medium leading-[1.1] tracking-[-0.04em] text-black transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0,1)] group-hover:translate-y-0">
                    {link.label}
                  </span>
                </div>
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-6">
            <a href="/legal/privacy-policy" className="text-sm text-black/40 transition-colors duration-200 hover:text-black">Privacy Policy</a>
            <a href="/legal/terms" className="text-sm text-black/40 transition-colors duration-200 hover:text-black">Terms</a>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default function NavbarGlass() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ticking = useRef(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setCollapsed(window.scrollY > 80);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
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
  }, [menuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-4 px-4 pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center rounded-full ${LIQUID_GLASS} transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0,1)]`}
          style={{
            padding: collapsed ? "5px 14px 5px 5px" : "5px 6px 5px 5px",
            maxWidth: collapsed ? "300px" : "700px",
          }}
        >
          {/* Avatar + Name */}
          <a href="/" className="flex items-center gap-3 flex-shrink-0 no-underline">
            <img
              src="/images/founder-portrait.webp"
              alt="Vincenzo Petrone"
              className="h-10 w-10 rounded-full object-cover flex-shrink-0 ring-1 ring-white/50"
            />
            <span className="text-[0.95rem] font-semibold tracking-[-0.02em] text-black whitespace-nowrap">
              Vincenzo Petrone
            </span>
          </a>

          {/* Desktop nav links */}
          <div
            className="nav-links-wrap hidden lg:flex items-center gap-1 ml-auto overflow-hidden transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0,1)]"
            style={{
              opacity: collapsed ? 0 : 1,
              maxWidth: collapsed ? "0px" : "600px",
              padding: collapsed ? "0" : "0 4px",
              pointerEvents: collapsed ? "none" : "auto",
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative inline-flex items-center px-3 py-1.5 text-black/60 hover:text-black transition-colors duration-200 no-underline"
              >
                <div className="relative overflow-clip">
                  <span className="block text-[0.875rem] font-medium whitespace-nowrap transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0,1)] group-hover:-translate-y-full">
                    {link.label}
                  </span>
                  <span className="absolute inset-0 block translate-y-full text-[0.875rem] font-medium whitespace-nowrap transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0,1)] group-hover:translate-y-0">
                    {link.label}
                  </span>
                </div>
              </a>
            ))}

            {/* Contact pill */}
            <a
              href="/contatto"
              className="group ml-1 flex-shrink-0 rounded-full border border-black/[0.08] bg-white/80 px-4 py-1.5 text-[0.875rem] font-semibold text-black no-underline shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-black/15 hover:shadow-[0_3px_12px_rgba(0,0,0,0.08)]"
            >
              <div className="relative overflow-clip">
                <span className="block transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0,1)] group-hover:-translate-y-full">Contact</span>
                <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.4,0,0,1)] group-hover:translate-y-0">Contact</span>
              </div>
            </a>
          </div>

          {/* Three dots — always on mobile, only collapsed on desktop */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`ml-auto flex items-center gap-[5px] cursor-pointer p-2 rounded-full transition-all duration-500 hover:bg-black/5 ${collapsed ? "lg:flex" : "lg:hidden"}`}
            aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
          >
            <span className="nav-dot nav-dot-1 h-[7px] w-[7px] rounded-full bg-black/50" />
            <span className="nav-dot nav-dot-2 h-[6px] w-[6px] rounded-full bg-black/30" />
            <span className="nav-dot nav-dot-3 h-[7px] w-[7px] rounded-full bg-black/50" />
          </button>
        </div>
      </nav>

      {mounted && <MenuPanel open={menuOpen} onClose={() => setMenuOpen(false)} />}

      <style>{`
        @keyframes nav-dot-bounce {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.35); opacity: 1; }
        }
        .nav-dot-1 { animation: nav-dot-bounce 1.8s ease-in-out infinite; }
        .nav-dot-2 { animation: nav-dot-bounce 1.8s ease-in-out infinite 0.25s; }
        .nav-dot-3 { animation: nav-dot-bounce 1.8s ease-in-out infinite 0.5s; }
      `}</style>
    </>
  );
}
