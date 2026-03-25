import { useState, useEffect, useCallback } from "react";

interface ConsentRecord {
  timestamp: string;
  analytics: boolean;
  marketing: boolean;
  version: string;
}

const CONSENT_KEY = "cookie_consent";
const CONSENT_VERSION = "1.0";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
    // Load tracking if already consented
    try {
      const consent: ConsentRecord = JSON.parse(stored);
      if (consent.analytics) loadAnalytics();
      if (consent.marketing) loadMarketing();
    } catch {}
  }, []);

  // Expose function to reopen banner from footer
  useEffect(() => {
    (window as any).__reopenCookieBanner = () => {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        try {
          const consent: ConsentRecord = JSON.parse(stored);
          setAnalytics(consent.analytics);
          setMarketing(consent.marketing);
        } catch {}
      }
      setExpanded(true);
      setVisible(true);
    };
  }, []);

  const saveConsent = useCallback((analyticsVal: boolean, marketingVal: boolean) => {
    const record: ConsentRecord = {
      timestamp: new Date().toISOString(),
      analytics: analyticsVal,
      marketing: marketingVal,
      version: CONSENT_VERSION,
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record));

    if (analyticsVal) loadAnalytics();
    if (marketingVal) loadMarketing();

    setVisible(false);
    setExpanded(false);
  }, []);

  const acceptAll = () => {
    setAnalytics(true);
    setMarketing(true);
    saveConsent(true, true);
  };

  const rejectAll = () => {
    setAnalytics(false);
    setMarketing(false);
    saveConsent(false, false);
  };

  const savePreferences = () => {
    saveConsent(analytics, marketing);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[500] p-4 md:p-6"
      style={{ animation: "slideUp 0.5s ease forwards" }}
    >
      <div className="mx-auto max-w-[900px] overflow-hidden rounded-2xl border border-white/10 bg-black/95 backdrop-blur-xl">
        {/* Compact view */}
        <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:gap-8">
          <div className="flex-1">
            <p className="text-sm leading-[160%] text-white/60">
              Utilizziamo cookie tecnici necessari e, con il tuo consenso, cookie analitici e di marketing.{" "}
              <a href="/legal/cookie-policy" className="text-white/80 underline decoration-dotted underline-offset-2 hover:text-white">
                Cookie Policy
              </a>
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap items-center gap-3">
            <button
              onClick={() => setExpanded(!expanded)}
              className="cursor-pointer text-xs font-medium text-white/40 underline decoration-dotted underline-offset-2 transition-colors duration-200 hover:text-white/70"
            >
              {expanded ? "Nascondi dettagli" : "Personalizza"}
            </button>
            <button
              onClick={rejectAll}
              className="cursor-pointer rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/60 transition-all duration-300 hover:border-white/40 hover:text-white"
            >
              Rifiuta
            </button>
            <button
              onClick={acceptAll}
              className="cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_8px_20px_rgba(165,27,128,0.3)]"
              style={{ background: "linear-gradient(135deg, #1B4088, #A51B80 50%, #DA5713)" }}
            >
              Accetta tutti
            </button>
          </div>
        </div>

        {/* Expanded view */}
        <div
          className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ maxHeight: expanded ? "600px" : "0px", opacity: expanded ? 1 : 0 }}
        >
          <div className="border-t border-white/10 px-6 pb-6 pt-5">
            {/* Cookie categories */}
            <div className="flex flex-col gap-4">
              {/* Tecnici */}
              <div className="flex items-start justify-between gap-4 rounded-xl bg-white/5 p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">Cookie Tecnici</span>
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-medium text-white/50">Necessari</span>
                  </div>
                  <p className="mt-1 text-xs leading-[160%] text-white/40">
                    Essenziali per il funzionamento del sito. Includono la memorizzazione delle preferenze cookie.
                  </p>
                  <p className="mt-1 text-[0.65rem] text-white/30">Cookie: cookie_consent — Durata: 365 giorni</p>
                </div>
                <div className="flex-shrink-0 pt-1">
                  <div className="flex h-6 w-10 items-center rounded-full bg-green-500/20 px-0.5">
                    <div className="h-5 w-5 translate-x-4 rounded-full bg-green-500" />
                  </div>
                </div>
              </div>

              {/* Analitici */}
              <div className="flex items-start justify-between gap-4 rounded-xl bg-white/5 p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">Cookie Analitici</span>
                  </div>
                  <p className="mt-1 text-xs leading-[160%] text-white/40">
                    Google Analytics — Raccolgono dati anonimi su come navighi il sito: pagine visitate, tempo di permanenza, sorgente del traffico.
                  </p>
                  <p className="mt-1 text-[0.65rem] text-white/30">Cookie: _ga, _ga_*, _gid — Durata: fino a 26 mesi — Fornitore: Google LLC</p>
                </div>
                <div className="flex-shrink-0 pt-1">
                  <button
                    onClick={() => setAnalytics(!analytics)}
                    className={`flex h-6 w-10 cursor-pointer items-center rounded-full px-0.5 transition-colors duration-300 ${analytics ? "bg-green-500/20" : "bg-white/10"}`}
                  >
                    <div className={`h-5 w-5 rounded-full transition-all duration-300 ${analytics ? "translate-x-4 bg-green-500" : "translate-x-0 bg-white/40"}`} />
                  </button>
                </div>
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-4 rounded-xl bg-white/5 p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">Cookie di Marketing</span>
                  </div>
                  <p className="mt-1 text-xs leading-[160%] text-white/40">
                    Meta Pixel — Tracciano le conversioni da Facebook/Instagram Ads e consentono il remarketing con annunci personalizzati.
                  </p>
                  <p className="mt-1 text-[0.65rem] text-white/30">Cookie: _fbp, _fbc, fr — Durata: fino a 90 giorni — Fornitore: Meta Platforms Inc.</p>
                </div>
                <div className="flex-shrink-0 pt-1">
                  <button
                    onClick={() => setMarketing(!marketing)}
                    className={`flex h-6 w-10 cursor-pointer items-center rounded-full px-0.5 transition-colors duration-300 ${marketing ? "bg-green-500/20" : "bg-white/10"}`}
                  >
                    <div className={`h-5 w-5 rounded-full transition-all duration-300 ${marketing ? "translate-x-4 bg-green-500" : "translate-x-0 bg-white/40"}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Save preferences button */}
            <div className="mt-5 flex items-center justify-between">
              <p className="text-[0.65rem] text-white/25">
                Consenso v{CONSENT_VERSION} — I dati del consenso sono salvati localmente sul tuo dispositivo.
              </p>
              <button
                onClick={savePreferences}
                className="cursor-pointer rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                Salva preferenze
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function loadAnalytics() {
  if (typeof window === "undefined" || (window as any).gtag) return;
  // TODO: Replace GA_MEASUREMENT_ID
  const id = "GA_MEASUREMENT_ID";
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  script.async = true;
  document.head.appendChild(script);
  (window as any).dataLayer = (window as any).dataLayer || [];
  (window as any).gtag = function () {
    (window as any).dataLayer.push(arguments);
  };
  (window as any).gtag("js", new Date());
  (window as any).gtag("config", id);
}

function loadMarketing() {
  if (typeof window === "undefined" || (window as any).fbq) return;
  // TODO: Replace META_PIXEL_ID
  const id = "META_PIXEL_ID";
  const n: any = ((window as any).fbq = function (...args: any[]) {
    n.callMethod ? n.callMethod(...args) : n.queue.push(args);
  });
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);
  n("init", id);
  n("track", "PageView");
}
