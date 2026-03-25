import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

interface Props {
  text: string;
  variant?: "gradient" | "dark";
  children?: React.ReactNode;
}

export default function ExpandButton({ text, variant = "gradient", children }: Props) {
  const isGradient = variant === "gradient";
  const [expanded, setExpanded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExpand = useCallback(() => {
    if (!buttonRef.current || !overlayRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const overlay = overlayRef.current;
    const pad = 12;

    // Target position
    const targetX = pad;
    const targetY = pad;
    const targetW = window.innerWidth - pad * 2;
    const targetH = window.innerHeight - pad * 2;

    // Set starting state at button position
    gsap.set(overlay, {
      display: "block",
      opacity: 1,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    setExpanded(true);
    document.body.style.overflow = "hidden";

    // Normal expand animation (for popup content)
    gsap.to(overlay, {
      top: targetY,
      left: targetX,
      width: targetW,
      height: targetH,
      duration: 0.9,
      ease: "power3.inOut",
      onComplete: () => {
        setShowContent(true);
      },
    });
  }, []);

  const handleClose = useCallback(() => {
    if (!overlayRef.current || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const overlay = overlayRef.current;

    setShowContent(false);

    gsap.to(overlay, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      duration: 0.7,
      ease: "power3.inOut",
      delay: 0.1,
      onComplete: () => {
        setExpanded(false);
        document.body.style.overflow = "";
        gsap.set(overlay, { display: "none" });
      },
    });
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleExpand}
        className={`btn-gradient group relative inline-block rounded-full text-center font-medium shadow-[0_16px_20px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out hover:shadow-[0_20px_40px_rgba(165,27,128,0.3)] active:shadow-[0_4px_4px_rgba(0,0,0,0.3)] cursor-pointer ${isGradient ? "bg-[linear-gradient(135deg,#1B4088,#A51B80_50%,#DA5713)] saturate-[1.15]" : ""}`}
      >
        <div className="relative z-10 overflow-hidden rounded-full px-6 py-3 transition-shadow duration-300 shadow-[inset_0_0_7px_rgba(255,255,255,0.28)] group-hover:shadow-[inset_0_0_14px_rgba(255,255,255,0.5)]">
          <div className="pointer-events-none absolute inset-0 z-[1] rounded-full">
            <div className="expand-ball expand-ball-1" />
            <div className="expand-ball expand-ball-2" />
          </div>
          <span className="relative z-[5] block overflow-hidden text-[1.125rem] font-semibold tracking-[-0.03em] text-white">
            <span className="flex items-center gap-2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
              {text}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
            <span className="absolute inset-0 flex items-center justify-center gap-2 translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
              {text}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
          </span>
        </div>
        <div className="btn-glow pointer-events-none absolute inset-0 z-0 rounded-full blur-md transition-opacity duration-300 opacity-30 group-hover:opacity-50">
          <div className="expand-ball expand-ball-1" />
          <div className="expand-ball expand-ball-2" />
        </div>
      </button>

      {mounted && createPortal(
        <div
          ref={overlayRef}
          className="fixed z-[300] overflow-hidden rounded-[2rem]"
          style={{
            background: isGradient
              ? "linear-gradient(135deg, #1B4088, #A51B80 50%, #DA5713)"
              : "#0a0a0a",
            display: "none",
          }}
        >
          <div
            className="relative z-[2] h-full w-full overflow-auto transition-opacity duration-400"
            style={{ opacity: showContent ? 1 : 0 }}
          >
            <button
              onClick={handleClose}
              className="fixed right-8 top-8 z-[301] flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors duration-200 hover:bg-black/30"
              aria-label="Chiudi"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>

            <div className="flex min-h-full flex-col items-center justify-center px-8 text-white">
              {children || (
                <div className="mx-auto max-w-3xl text-center">
                  <h2 className="mb-6 text-5xl font-bold tracking-[-0.03em] md:text-7xl">
                    Benvenuto in Vincenzo Petrone Biz
                  </h2>
                  <p className="mb-10 text-xl text-white/70 md:text-2xl">
                    Scopri come trasformiamo le idee in esperienze digitali che generano risultati.
                  </p>
                  <button
                    onClick={handleClose}
                    className="rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition-transform duration-200 hover:scale-105 cursor-pointer"
                  >
                    Torna alla home
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
