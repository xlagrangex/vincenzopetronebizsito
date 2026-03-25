import { useState, useRef, useCallback, useEffect } from "react";

const tabs = ["Tutti", "Ecommerce", "Landing Page + Ads", "Siti Vetrina", "Siti con Funzionalità Avanzate"];

const allStudies = [
  { category: "Ecommerce", image: "/images/onde-durto.webp", title: "Prenotazioni e appuntamenti", description: "Gestisce e pianifica telefonicamente appuntamenti, prenotazioni e cancellazioni con una voce naturale e rassicurante." },
  { category: "Ecommerce", image: "/images/conferme-promemoria.jpg", title: "Conferme e promemoria automatici", description: "Chiama automaticamente clienti per confermare appuntamenti, inviare promemoria e ridurre assenze e disdette." },
  { category: "Landing Page + Ads", image: "/images/keyboard.jpeg", title: "Funnel di conversione", description: "Landing page strategiche con copy persuasivo e design orientato alla conversione per campagne pubblicitarie." },
  { category: "Ecommerce", image: "/images/ecommerce-hero.webp", title: "Assistenza telefonica 24/7", description: "Risponde alle chiamate dei clienti giorno e notte, risolvendo rapidamente richieste semplici e trasferendo quelle complesse." },
  { category: "Siti Vetrina", image: "/images/onde-durto.webp", title: "Design contemporaneo", description: "Siti vetrina che comunicano professionalità e credibilità con un design moderno e responsive." },
  { category: "Landing Page + Ads", image: "/images/website.jpg", title: "A/B Testing continuo", description: "Test sistematici su headline, CTA e layout per massimizzare il tasso di conversione delle tue campagne." },
  { category: "Siti con Funzionalità Avanzate", image: "/images/Close-Up-Knitwear-Duo.jpeg", title: "Database e filtri custom", description: "Soluzioni con campi custom, logiche avanzate e integrazioni su misura per processi specifici." },
  { category: "Siti Vetrina", image: "/images/conferme-promemoria.jpg", title: "Multi-pagina ottimizzati", description: "Strutture multi-pagina pensate per guidare il visitatore verso l'azione desiderata." },
  { category: "Siti con Funzionalità Avanzate", image: "/images/keyboard.jpeg", title: "Aree riservate", description: "Portali con accesso autenticato, dashboard personalizzate e gestione multi-utente." },
  { category: "Ecommerce", image: "/images/website.jpg", title: "Screening e qualificazione lead", description: "Contatta e qualifica nuovi potenziali clienti telefonicamente, trasferendo solo i contatti rilevanti al team commerciale." },
];

export default function CaseStudyTabs() {
  const [activeTab, setActiveTab] = useState("Tutti");
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  const filtered = activeTab === "Tutti"
    ? allStudies
    : allStudies.filter((s) => s.category === activeTab);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -500, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 500, behavior: "smooth" });
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = sliderRef.current?.scrollLeft || 0;
    if (sliderRef.current) sliderRef.current.style.cursor = "grabbing";
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    const dx = e.pageX - startX.current;
    sliderRef.current.scrollLeft = scrollStart.current - dx;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    if (sliderRef.current) sliderRef.current.style.cursor = "grab";
  }, []);

  // Track scroll position for fade visibility
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateFades = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    updateFades();
    el.addEventListener("scroll", updateFades, { passive: true });
    window.addEventListener("resize", updateFades);
    return () => {
      el.removeEventListener("scroll", updateFades);
      window.removeEventListener("resize", updateFades);
    };
  }, [updateFades, filtered]);

  return (
    <div>
      {/* Tab menu */}
      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="tab-pill group relative cursor-pointer overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold tracking-[-0.03em] transition-colors duration-500"
            style={{
              background: activeTab === tab ? "#fff" : "transparent",
              color: activeTab === tab ? "#000" : "rgba(255,255,255,0.5)",
              border: activeTab === tab ? "1px solid #fff" : "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {/* Fill animation layer */}
            <span
              className="absolute inset-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                background: "#fff",
                transform: activeTab === tab ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left center",
              }}
            />
            <span className="relative z-[1]">{tab}</span>
          </button>
        ))}
      </div>

      {/* Cards grid - animate on filter change */}
      <div className="relative">
        {/* Fade sinistro — appare solo se c'e' contenuto a sinistra */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-[calc(100%-3.5rem)] w-16 md:w-24 bg-gradient-to-r from-black to-transparent transition-opacity duration-300"
          style={{ opacity: canScrollLeft ? 1 : 0 }}
        />
        {/* Fade destro — appare solo se c'e' contenuto a destra */}
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-[calc(100%-3.5rem)] w-16 md:w-24 bg-gradient-to-l from-black to-transparent transition-opacity duration-300"
          style={{ opacity: canScrollRight ? 1 : 0 }}
        />
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto pb-4 select-none"
          style={{ scrollbarWidth: "none", cursor: "grab" }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {filtered.map((study, i) => (
            <div
              key={`${activeTab}-${i}`}
              className="group flex-shrink-0 w-[calc(28.5%-15px)] min-w-[240px] rounded-2xl bg-white/5 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                animation: `fadeSlideIn 0.5s ease ${i * 0.08}s both`,
              }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  loading="lazy"
                />
                {/* Category badge */}
                <span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur-sm">
                  {study.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="!text-lg !leading-[130%] font-semibold text-white mb-2">
                  {study.title}
                </h4>
                <p className="text-sm leading-[160%] text-white/40 mb-4">
                  {study.description}
                </p>
                {/* Approfondisci button */}
                <a
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/50 transition-all duration-300 hover:border-white/30 hover:text-white"
                >
                  Approfondisci
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={scrollLeft}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 transition-colors duration-200 hover:bg-white/10"
            aria-label="Precedente"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.31066 8.75001L9.03033 14.4697L7.96967 15.5303L0.439339 8.00001L7.96967 0.469676L9.03033 1.53034L3.31066 7.25001L15.5 7.25L15.5 8.75L3.31066 8.75001Z" fill="#FFFFFF" />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 transition-colors duration-200 hover:bg-white/10"
            aria-label="Successivo"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12.6893 7.24999L6.96967 1.53033L8.03033 0.469666L15.5607 7.99999L8.03033 15.5303L6.96967 14.4697L12.6893 8.74999H0.5V7.24999H12.6893Z" fill="#FFFFFF" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
