import { useState } from "react";

export default function ContactCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="relative z-[3] flex items-end gap-3 cursor-pointer"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <img
        src="/images/Clip-path-group.png"
        alt="Fondatore di BizStudio"
        className="aspect-square w-[4.4rem] rounded-2xl object-cover"
        loading="lazy"
      />
      <div className="relative flex flex-col items-start justify-between rounded-2xl bg-white/20 p-4 pr-6 backdrop-blur-[20px]">
        {/* Main text */}
        <div
          className="flex flex-col overflow-clip transition-all duration-300"
          style={{
            width: "100%",
            opacity: 1,
          }}
        >
          <span className="font-semibold text-white whitespace-nowrap">
            Prenota una consulenza gratuita
          </span>
          <span className="text-sm font-medium text-white/50 whitespace-nowrap">
            Con il titolare di Bizstudio®
          </span>
        </div>

        {/* Expandable info */}
        <div
          className="flex flex-col gap-3.5 overflow-hidden transition-all duration-400 ease-in-out"
          style={{
            maxHeight: expanded ? "300px" : "0px",
            opacity: expanded ? 1 : 0,
            marginTop: expanded ? "12px" : "0px",
          }}
        >
          <div className="flex w-full flex-col gap-0.5 pt-2">
            <span className="text-sm font-medium text-white/50">Email</span>
            <a
              href="mailto:bizstudio.it@gmail.com"
              className="font-semibold text-white decoration-dotted decoration-white/50 underline-offset-2 hover:underline"
            >
              bizstudio.it@gmail.com
            </a>
          </div>
          <div className="flex w-full flex-col gap-0.5 border-t border-dotted border-white/15 pt-2">
            <span className="text-sm font-medium text-white/50">Telefono</span>
            <a
              href="tel:+393319942136"
              className="font-semibold text-white decoration-dotted decoration-white/50 underline-offset-2 hover:underline"
            >
              +39 331 994 2136
            </a>
          </div>
          <div className="flex w-full flex-col gap-0.5 border-t border-dotted border-white/15 pt-2">
            <span className="text-sm font-medium text-white/50">
              Prenota ora
            </span>
            <a
              href="https://calendly.com/bizstudio-it/30min"
              className="font-semibold text-white decoration-dotted decoration-white/50 underline-offset-2 hover:underline"
            >
              Chiamata conoscitiva
            </a>
          </div>
        </div>

        {/* Animated dot */}
        <div className="absolute -top-1.5 right-4 flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <div className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-green-500" />
        </div>
      </div>
    </div>
  );
}
