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

/* Visual style unchanged — only motion is new */
const GLASS =
  "border border-white/40 bg-white/50 shadow-[0_4px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.04)] backdrop-blur-[28px] backdrop-saturate-[1.6]";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const EASE_SMOOTH = "cubic-bezier(0.4, 0, 0.1, 1)";

/* ────────────────────────────────────────────
   Menu Panel (portal → body)
   ──────────────────────────────────────────── */
function MenuPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  return createPortal(
    <>
      {/* Scrim */}
      <div
        className="fixed inset-0 z-[200]"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 z-[201] h-screen w-full p-3 md:w-[50vw]"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: `transform 0.55s ${EASE}`,
        }}
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
                  transform: open ? "none" : "translateY(16px)",
                  transition: `opacity 0.4s ${EASE} ${0.05 + i * 0.035}s, transform 0.4s ${EASE} ${0.05 + i * 0.035}s`,
                }}
              >
                <div className="relative overflow-clip">
                  <span className="block text-[2.25rem] font-medium leading-[1.1] tracking-[-0.04em] text-black transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">{link.label}</span>
                  <span className="absolute inset-0 block translate-y-full text-[2.25rem] font-medium leading-[1.1] tracking-[-0.04em] text-black transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">{link.label}</span>
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

/* ────────────────────────────────────────────
   Navbar
   ──────────────────────────────────────────── */
export default function NavbarGlass() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => setMounted(true), []);

  /* Scroll → collapse links + hide/show on direction */
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;

        if (y > 60 && delta > 4) setCollapsed(true);
        else if (delta < -4) setCollapsed(false);

        lastY.current = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Body lock when menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.body.classList.toggle("menu-open", menuOpen);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center px-4 pt-4 pointer-events-none"
        style={{
          transition: `transform 0.5s ${EASE}`,
        }}
      >
        <div
          className={`pointer-events-auto flex items-center rounded-full p-[5px] ${GLASS}`}
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

          {/* Desktop links — asymmetric fade */}
          <div
            className="hidden lg:flex items-center overflow-hidden"
            style={{
              maxWidth: collapsed ? 0 : 600,
              opacity: collapsed ? 0 : 1,
              pointerEvents: collapsed ? "none" : "auto",
              transition: collapsed
                ? `opacity 0.35s ease-out, max-width 0.85s ${EASE_SMOOTH} 0.05s`
                : `max-width 0.9s ${EASE_SMOOTH}, opacity 0.5s ease 0.25s`,
            }}
          >
            <div className="flex items-center gap-1 px-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="group relative inline-flex items-center px-3 py-1.5 text-black/60 hover:text-black transition-colors duration-200 no-underline"
                >
                  <div className="relative overflow-clip">
                    <span className="block text-[0.875rem] font-medium whitespace-nowrap transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">{link.label}</span>
                    <span className="absolute inset-0 block translate-y-full text-[0.875rem] font-medium whitespace-nowrap transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">{link.label}</span>
                  </div>
                </a>
              ))}
              <a
                href="/contatto"
                className="group ml-1 flex-shrink-0 rounded-full border border-black/[0.08] bg-white/80 px-4 py-1.5 text-[0.875rem] font-semibold text-black no-underline shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-black/15 hover:shadow-[0_3px_12px_rgba(0,0,0,0.08)]"
              >
                <div className="relative overflow-clip">
                  <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">Contact</span>
                  <span className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">Contact</span>
                </div>
              </a>
            </div>
          </div>

          {/* Menu button — appears AFTER Contact has faded out */}
          <div
            className={`overflow-hidden flex items-center ${
              collapsed
                ? "ml-1 lg:max-w-[40px]"
                : "ml-1 lg:max-w-0 lg:opacity-0 lg:pointer-events-none lg:ml-0"
            }`}
            style={{
              transition: collapsed
                ? `max-width 0.4s ${EASE_SMOOTH} 0.35s, opacity 0.35s ease 0.4s, margin 0.4s ${EASE_SMOOTH} 0.35s`
                : `max-width 0.3s ${EASE_SMOOTH}, opacity 0.15s ease, margin 0.3s ${EASE_SMOOTH}`,
            }}
          >
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex-shrink-0 flex flex-col items-center justify-center gap-[5px] cursor-pointer h-10 w-10 rounded-full hover:bg-black/5"
              style={{ transition: "background-color 0.2s ease" }}
              aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
            >
              <span
                className="block h-[1.5px] w-[18px] rounded-full bg-black/70 origin-center"
                style={{
                  transform: menuOpen ? "rotate(45deg) translateY(3.25px)" : "none",
                  transition: `transform 0.4s ${EASE}`,
                }}
              />
              <span
                className="block h-[1.5px] w-[18px] rounded-full bg-black/70 origin-center"
                style={{
                  transform: menuOpen ? "rotate(-45deg) translateY(-3.25px)" : "none",
                  transition: `transform 0.4s ${EASE}`,
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {mounted && <MenuPanel open={menuOpen} onClose={() => setMenuOpen(false)} />}
    </>
  );
}
