import { createRoot } from "react-dom/client";
import GalaxyBackground from "../components/ui/galaxy-background";

const host = document.querySelector<HTMLElement>(".home-main, .page-sub");

if (host) {
  const mount = document.createElement("div");
  mount.id = "galaxy-root";
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
    <div className="galaxy-stage">
      <GalaxyBackground />
    </div>,
  );
}
