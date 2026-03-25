import { useState, useEffect } from "react";

const categories = ["Tutti", "Siti vetrina", "Ecommerce", "Web App", "Landing + Ads", "Monopagina"];

export default function PortfolioFilter() {
  const [active, setActive] = useState("Tutti");

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".portfolio-card");
    cards.forEach((card) => {
      const category = card.dataset.category;
      const show = active === "Tutti" || category === active;
      card.style.transition = "opacity 0.4s ease, transform 0.4s ease";
      card.style.opacity = show ? "1" : "0";
      card.style.transform = show ? "scale(1)" : "scale(0.95)";
      setTimeout(() => {
        card.style.display = show ? "" : "none";
      }, show ? 0 : 400);
      if (show) card.style.display = "";
    });
  }, [active]);

  return (
    <div className="mb-10 flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className="relative cursor-pointer overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold tracking-[-0.03em] transition-colors duration-500"
          style={{
            background: active === cat ? "#fff" : "transparent",
            color: active === cat ? "#000" : "rgba(255,255,255,0.5)",
            border: active === cat ? "1px solid #fff" : "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <span
            className="absolute inset-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              background: "#fff",
              transform: active === cat ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left center",
            }}
          />
          <span className="relative z-[1]">{cat}</span>
        </button>
      ))}
    </div>
  );
}
