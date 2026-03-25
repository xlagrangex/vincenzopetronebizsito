import { useState, useRef, useEffect } from "react";

export default function StickyContactIsland() {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 300);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateX(-50%) translateY(${visible ? "0" : "30px"})`,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <div
        className="flex items-center rounded-[1.75rem] border border-black/[0.06] bg-white/80 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer"
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: expanded ? "16px 20px" : "6px 6px",
          gap: expanded ? "16px" : "6px",
        }}
      >
        {/* Expanded: text block */}
        <div
          className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            maxWidth: expanded ? "200px" : "0px",
            opacity: expanded ? 1 : 0,
            paddingLeft: expanded ? "4px" : "0px",
          }}
        >
          <p className="text-[0.95rem] font-semibold text-black whitespace-nowrap leading-tight">
            Parliamone
          </p>
          <p className="text-[0.8rem] text-black/50 whitespace-nowrap leading-tight mt-0.5">
            WhatsApp o prenota una call
          </p>
        </div>

        {/* WhatsApp button */}
        <a
          href="https://wa.me/393319942136"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-shrink-0 flex items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:bg-black/80 hover:scale-105 no-underline"
          style={{
            width: expanded ? "48px" : "44px",
            height: expanded ? "48px" : "44px",
          }}
          aria-label="WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>

        {/* Collapsed: label next to WhatsApp */}
        <span
          className="text-[0.875rem] font-semibold text-black whitespace-nowrap overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            maxWidth: expanded ? "0px" : "80px",
            opacity: expanded ? 0 : 1,
          }}
        >
          WhatsApp
        </span>

        {/* Divider - only collapsed */}
        <div
          className="h-6 w-px bg-black/10 flex-shrink-0 transition-all duration-500"
          style={{
            opacity: expanded ? 0 : 1,
            maxWidth: expanded ? "0px" : "1px",
          }}
        />

        {/* Book a call button */}
        <a
          href="https://calendly.com/bizstudio-it/30min"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-shrink-0 flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/90 text-black transition-all duration-300 hover:border-black/15 hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)] no-underline"
          style={{
            padding: expanded ? "12px" : "10px 16px 10px 12px",
            borderRadius: expanded ? "50%" : "9999px",
          }}
        >
          {/* Calendar icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width={expanded ? "22" : "18"} height={expanded ? "22" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 transition-all duration-300">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
            <line x1="16" x2="16" y1="2" y2="6"/>
            <line x1="8" x2="8" y1="2" y2="6"/>
            <line x1="3" x2="21" y1="10" y2="10"/>
            <path d="m9 16 2 2 4-4"/>
          </svg>
          {/* Label - only collapsed */}
          <span
            className="text-[0.875rem] font-semibold whitespace-nowrap overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              maxWidth: expanded ? "0px" : "100px",
              opacity: expanded ? 0 : 1,
            }}
          >
            Book a call
          </span>
        </a>
      </div>

      {/* Drag handle indicator */}
      <div className="mt-2 flex justify-center">
        <div className="h-[4px] w-10 rounded-full bg-black/15" />
      </div>
    </div>
  );
}
