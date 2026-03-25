import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";

interface Props {
  projects: { name: string; url: string; image: string; category: string }[];
}

export default function ProjectBrowser({ projects }: Props) {
  const [activeProject, setActiveProject] = useState<{ name: string; url: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const clickedCardRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Listen for card clicks
  useEffect(() => {
    const handleCardClick = (e: Event) => {
      const card = (e.currentTarget as HTMLElement).closest(".portfolio-card") as HTMLElement;
      const name = card?.dataset.projectName;
      const url = card?.dataset.projectUrl;
      if (!name || !url) return;

      e.preventDefault();
      clickedCardRef.current = card;
      setIframeLoaded(false);
      openBrowser(name, url, card);
    };

    const buttons = document.querySelectorAll(".portfolio-card .visit-btn");
    buttons.forEach((btn) => btn.addEventListener("click", handleCardClick));

    return () => {
      buttons.forEach((btn) => btn.removeEventListener("click", handleCardClick));
    };
  }, []);

  const openBrowser = useCallback((name: string, url: string, card: HTMLElement) => {
    if (!overlayRef.current) return;

    const rect = card.getBoundingClientRect();
    const overlay = overlayRef.current;
    const contentEl = overlay.querySelector(".browser-content") as HTMLElement;
    const pad = 12;

    // Hide content initially
    if (contentEl) gsap.set(contentEl, { opacity: 0, scale: 0.95 });

    gsap.set(overlay, {
      display: "flex",
      opacity: 1,
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      borderRadius: "1rem",
    });

    setActiveProject({ name, url });
    document.body.style.overflow = "hidden";

    // Expand the card
    const tl = gsap.timeline();
    tl.to(overlay, {
      top: pad,
      left: pad,
      width: window.innerWidth - pad * 2,
      height: window.innerHeight - pad * 2,
      borderRadius: "1rem",
      duration: 0.8,
      ease: "back.out(1.2)",
    });

    // Then fade in content with slight scale
    tl.to(contentEl, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    }, "-=0.2");
  }, []);

  const closeBrowser = useCallback(() => {
    if (!overlayRef.current || !clickedCardRef.current) return;

    const rect = clickedCardRef.current.getBoundingClientRect();
    const overlay = overlayRef.current;
    const contentEl = overlay.querySelector(".browser-content") as HTMLElement;

    const tl = gsap.timeline();

    // First: fade out content quickly
    tl.to(contentEl, {
      opacity: 0,
      scale: 0.97,
      duration: 0.25,
      ease: "power2.in",
    });

    // Then: shrink the overlay back to card position
    tl.to(overlay, {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      borderRadius: "1rem",
      duration: 0.6,
      ease: "back.in(1.4)",
      onComplete: () => {
        setActiveProject(null);
        setIframeLoaded(false);
        document.body.style.overflow = "";
        gsap.set(overlay, { display: "none" });
      },
    });
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed z-[400] flex-col overflow-hidden bg-[#1a1a1a]"
      style={{ display: "none" }}
    >
      {activeProject && (
        <div className="browser-content flex h-full w-full flex-col">
          {/* Browser chrome bar */}
          <div className="flex h-12 flex-shrink-0 items-center gap-3 border-b border-black/10 bg-[#111] px-4">
            {/* Window controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={closeBrowser}
                className="h-3 w-3 cursor-pointer rounded-full bg-[#ff5f57] transition-opacity hover:opacity-80"
                aria-label="Chiudi"
              />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={() => {
                  const iframe = document.getElementById("project-iframe") as HTMLIFrameElement;
                  if (iframe?.contentWindow) {
                    try { iframe.contentWindow.history.back(); } catch {}
                  }
                }}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-black/40 transition-colors hover:bg-black/10 hover:text-black"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
              </button>
              <button
                onClick={() => {
                  const iframe = document.getElementById("project-iframe") as HTMLIFrameElement;
                  if (iframe?.contentWindow) {
                    try { iframe.contentWindow.history.forward(); } catch {}
                  }
                }}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-black/40 transition-colors hover:bg-black/10 hover:text-black"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
              </button>
              <button
                onClick={() => {
                  const iframe = document.getElementById("project-iframe") as HTMLIFrameElement;
                  if (iframe) iframe.src = iframe.src;
                }}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-black/40 transition-colors hover:bg-black/10 hover:text-black"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
              </button>
            </div>

            {/* URL bar */}
            <div className="mx-2 flex flex-1 items-center gap-2 rounded-lg bg-black/5 px-3 py-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 text-black/30">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span className="truncate text-xs text-black/50">{activeProject.url}</span>
            </div>

            {/* Project name */}
            <span className="hidden text-xs font-medium text-black/40 md:block">{activeProject.name}</span>

            {/* Open in new tab */}
            <a
              href={activeProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-md text-black/40 transition-colors hover:bg-black/10 hover:text-black"
              aria-label="Apri in nuova scheda"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>

          {/* Loading indicator */}
          {!iframeLoaded && (
            <div className="absolute inset-0 top-12 flex items-center justify-center bg-[#1a1a1a]">
              <div className="flex flex-col items-center gap-3">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-black/20 border-t-white/60" />
                <span className="text-sm text-black/40">Caricamento {activeProject.name}...</span>
              </div>
            </div>
          )}

          {/* Iframe */}
          <iframe
            id="project-iframe"
            src={activeProject.url}
            className="h-full w-full flex-1 bg-white"
            onLoad={() => setIframeLoaded(true)}
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            title={activeProject.name}
          />
        </div>
      )}
    </div>,
    document.body
  );
}
