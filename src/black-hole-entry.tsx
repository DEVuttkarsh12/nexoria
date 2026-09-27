import { createRoot } from "react-dom/client";
import BlackHole from "../components/ui/optimized-black-hole";

const host = document.querySelector<HTMLElement>(".home-main, .page-sub");

if (host) {
  const mount = document.createElement("div");
  mount.id = "black-hole-root";
  mount.setAttribute("aria-hidden", "true");
  host.insertBefore(mount, host.firstChild);

  const positionBelowHero = () => {
    const hero = host.classList.contains("page-sub") ? host.querySelector<HTMLElement>(".page-hero") : null;
    const offset = hero ? hero.getBoundingClientRect().bottom - host.getBoundingClientRect().top : 0;
    mount.style.top = `${Math.max(0, offset)}px`;
  };
  positionBelowHero();
  window.addEventListener("resize", positionBelowHero, { passive: true });

  createRoot(mount).render(
    <div className="black-hole-stage">
      <BlackHole />
    </div>,
  );
}
