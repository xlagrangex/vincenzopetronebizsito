import { useState, useRef, useEffect } from "react";

export default function StickyContactIsland() {
  const [open, setOpen] = useState(false);
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
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        zIndex: 90,
        transform: `translate(-50%, ${visible ? "0px" : "40px"})`,
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "transform 1.2s cubic-bezier(0.4,0,0,1), opacity 1.2s cubic-bezier(0.4,0,0,1)",
      }}
    >
      {/* Pill container */}
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: 6,
          borderRadius: 9999,
          border: "1px solid rgba(255,255,255,0.4)",
          background: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(28px) saturate(1.6)",
          WebkitBackdropFilter: "blur(28px) saturate(1.6)",
          boxShadow: "0 4px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.04)",
          cursor: "pointer",
          transition: "padding 1.2s cubic-bezier(0.4,0,0,1), gap 1.2s cubic-bezier(0.4,0,0,1)",
        }}
      >
        {/* Text block — visible when closed */}
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: open ? 0 : 170,
            opacity: open ? 0 : 1,
            paddingLeft: open ? 0 : 12,
            transition: "max-width 1.2s cubic-bezier(0.4,0,0,1), opacity 0.6s ease, padding-left 1.2s cubic-bezier(0.4,0,0,1)",
          }}
        >
          <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#000", lineHeight: 1.2 }}>
            Speak to me
          </div>
          <div style={{ fontSize: "0.78rem", color: "rgba(0,0,0,0.4)", lineHeight: 1.2, marginTop: 2 }}>
            Email or book a call
          </div>
        </div>

        {/* WhatsApp pill */}
        <a
          href="https://wa.me/393319942136"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
            borderRadius: 9999,
            backgroundColor: "#25D366",
            color: "white",
            padding: open ? "11px 18px 11px 14px" : "11px",
            textDecoration: "none",
            transition: "padding 0.5s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: open ? 80 : 0,
              opacity: open ? 1 : 0,
              transition: "max-width 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
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
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
            borderRadius: 9999,
            border: "1px solid rgba(0,0,0,0.08)",
            backgroundColor: "rgba(255,255,255,0.85)",
            color: "#000",
            padding: open ? "11px 18px 11px 14px" : "11px",
            textDecoration: "none",
            transition: "padding 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
            e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.06)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
            <line x1="16" x2="16" y1="2" y2="6"/>
            <line x1="8" x2="8" y1="2" y2="6"/>
            <line x1="3" x2="21" y1="10" y2="10"/>
            <path d="m9 16 2 2 4-4"/>
          </svg>
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
              overflow: "hidden",
              maxWidth: open ? 90 : 0,
              opacity: open ? 1 : 0,
              transition: "max-width 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
            }}
          >
            Book a call
          </span>
        </a>
      </div>
    </div>
  );
}
