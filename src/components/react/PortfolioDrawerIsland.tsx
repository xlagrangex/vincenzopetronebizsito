import { useState, useEffect, useCallback } from "react";
import PortfolioDrawer from "./PortfolioDrawer";

/**
 * Self-managing wrapper around PortfolioDrawer.
 * Opens via custom event "portfolio-drawer-open" dispatched on window.
 * Also exposes window.__openPortfolioDrawer() as a convenience.
 */
export default function PortfolioDrawerIsland() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    // Listen for custom event
    const handler = () => open();
    window.addEventListener("portfolio-drawer-open", handler);

    // Expose global trigger
    (window as any).__openPortfolioDrawer = open;

    return () => {
      window.removeEventListener("portfolio-drawer-open", handler);
      delete (window as any).__openPortfolioDrawer;
    };
  }, [open]);

  return <PortfolioDrawer isOpen={isOpen} onClose={close} />;
}
