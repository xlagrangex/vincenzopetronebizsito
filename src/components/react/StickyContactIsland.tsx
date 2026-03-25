import { useState, useRef, useEffect } from "react";

const LIQUID_GLASS =
  "border border-white/40 bg-white/50 shadow-[0_4px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6),inset_0_-1px_0_rgba(0,0,0,0.04)] backdrop-blur-[28px] backdrop-saturate-[1.6]";

const EASE = "cubic-bezier(0.4,0,0,1)";
const DUR = "1200ms";

const WA_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const CAL_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
    <line x1="16" x2="16" y1="2" y2="6"/>
    <line x1="8" x2="8" y1="2" y2="6"/>
    <line x1="3" x2="21" y1="10" y2="10"/>
    <path d="m9 16 2 2 4-4"/>
  </svg>
);

export default function StickyContactIsland() {
  const [hovered, setHovered] = useState(false);
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

  const t = `all ${DUR} ${EASE}`;

  return (
    <div
      className="fixed bottom-6 left-0 right-0 z-[90] flex justify-center pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? "0" : "30px"})`,
        transition: `opacity ${DUR} ${EASE}, transform ${DUR} ${EASE}`,
      }}
    >
      <div
        className={`pointer-events-auto rounded-full ${LIQUID_GLASS} cursor-pointer`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered(!hovered)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "7px 7px 7px 7px",
          transition: t,
        }}
      >
        {/* Text: "Speak to me" — collapses on hover */}
        <div
          style={{
            overflow: "hidden",
            maxWidth: hovered ? "0px" : "180px",
            opacity: hovered ? 0 : 1,
            paddingLeft: hovered ? "0px" : "14px",
            paddingRight: hovered ? "0px" : "4px",
            transition: t,
            flexShrink: 0,
          }}
        >
          <p className="text-[0.95rem] font-semibold text-black whitespace-nowrap leading-tight m-0">
            Speak to me
          </p>
          <p className="text-[0.78rem] text-black/45 whitespace-nowrap leading-tight m-0 mt-0.5">
            Email or book a call
          </p>
        </div>

        {/* WhatsApp pill */}
        <a
          href="https://wa.me/393319942136"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="no-underline flex-shrink-0"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            borderRadius: "9999px",
            backgroundColor: "#25D366",
            color: "white",
            padding: hovered ? "12px 20px 12px 16px" : "12px",
            transition: t,
          }}
          aria-label="WhatsApp"
        >
          {WA_ICON}
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: hovered ? "80px" : "0px",
              opacity: hovered ? 1 : 0,
              transition: t,
            }}
          >
            WhatsApp
          </span>
        </a>

        {/* Book a call pill */}
        <a
          href="https://calendly.com/bizstudio-it/30min"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="no-underline flex-shrink-0"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            borderRadius: "9999px",
            border: "1px solid rgba(0,0,0,0.08)",
            backgroundColor: "rgba(255,255,255,0.85)",
            color: "black",
            padding: hovered ? "12px 20px 12px 16px" : "12px",
            transition: t,
          }}
        >
          {CAL_ICON}
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: hovered ? "90px" : "0px",
              opacity: hovered ? 1 : 0,
              transition: t,
            }}
          >
            Book a call
          </span>
        </a>
      </div>
    </div>
  );
}
