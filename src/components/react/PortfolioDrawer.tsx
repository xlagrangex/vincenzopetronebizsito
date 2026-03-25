import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

interface PortfolioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const portfolioItems = [
  { name: "Misha Travel", image: "/images/misha-travel-screenshot.png" },
  { name: "Animaent", image: "/images/animaent-screenshot.png" },
  { name: "GV Jewelry", image: "/images/gvjewelry-screenshot.png" },
  { name: "Alter Ego Immobiliare", image: "/images/alteregoimmobiliare-screenshot.png" },
  { name: "Kenekita", image: "/images/kenekita-screenshot.png" },
  { name: "K Garage", image: "/images/kgarage-screenshot.png" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function DrawerPanel({ isOpen, onClose }: PortfolioDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll & manage focus
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = "hidden";

      // Focus the drawer panel after transition starts
      requestAnimationFrame(() => {
        if (drawerRef.current) {
          const firstFocusable = drawerRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
          if (firstFocusable) {
            firstFocusable.focus();
          }
        }
      });
    } else {
      document.body.style.overflow = "";

      // Restore focus to the element that opened the drawer
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
        previousFocusRef.current = null;
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio - I nostri lavori"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 350ms ease-out",
        }}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        className="fixed right-0 top-0 z-[301] flex h-screen w-[90vw] max-w-lg flex-col backdrop-blur-xl"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 380ms cubic-bezier(0.16, 1, 0.3, 1)",
          background: "rgba(10, 10, 10, 0.95)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.08)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Header */}
        <div
          className="flex shrink-0 items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <h3 className="text-lg font-semibold tracking-tight text-black">
            I nostri lavori
          </h3>
          <button
            onClick={onClose}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-black/10"
            aria-label="Chiudi pannello portfolio"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-black/70"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5">
          <div className="flex flex-col gap-6">
            {portfolioItems.map((item, i) => (
              <div
                key={item.name}
                className="group cursor-pointer"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(16px)",
                  transition: `opacity 400ms ease ${80 + i * 60}ms, transform 400ms ease ${80 + i * 60}ms`,
                }}
              >
                <div
                  className="overflow-hidden rounded-xl transition-all duration-300 ease-out group-hover:scale-[1.02]"
                  style={{
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    transition:
                      "transform 300ms ease-out, border-color 300ms ease-out, box-shadow 300ms ease-out",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(165, 27, 128, 0.35)";
                    el.style.boxShadow =
                      "0 0 20px rgba(165, 27, 128, 0.12), 0 0 40px rgba(27, 64, 136, 0.08)";
                    el.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.borderColor = "rgba(255, 255, 255, 0.06)";
                    el.style.boxShadow = "none";
                    el.style.transform = "scale(1)";
                  }}
                >
                  <img
                    src={item.image}
                    alt={`Screenshot del progetto ${item.name}`}
                    className="block w-full"
                    loading="lazy"
                  />
                </div>
                <p className="mt-3 text-sm font-medium tracking-tight text-black/70 transition-colors duration-200 group-hover:text-black/90">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="shrink-0 px-6 py-5"
          style={{ borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}
        >
          <p className="mb-2 text-sm text-black/50">Vuoi vedere di più?</p>
          <a
            href="/portfolio"
            className="inline-flex items-center gap-1 text-sm font-medium transition-colors duration-200"
            style={{
              background: "linear-gradient(90deg, #1B4088, #A51B80, #DA5713)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Vai al portfolio completo
            <span
              className="inline-block transition-transform duration-200"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function PortfolioDrawer({ isOpen, onClose }: PortfolioDrawerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <DrawerPanel isOpen={isOpen} onClose={onClose} />;
}
