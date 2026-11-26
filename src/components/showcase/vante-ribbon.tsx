"use client";

import { useEffect } from "react";

import "./vante-ribbon.css";

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter+Tight:wght@400;500;600&display=swap";
const READY = "vante-ribbon-ready";

function ensureFonts() {
  if (document.querySelector(`link[href="${FONT_HREF}"]`)) return;

  const pre1 = document.createElement("link");
  pre1.rel = "preconnect";
  pre1.href = "https://fonts.googleapis.com";
  document.head.append(pre1);

  const pre2 = document.createElement("link");
  pre2.rel = "preconnect";
  pre2.href = "https://fonts.gstatic.com";
  pre2.crossOrigin = "anonymous";
  document.head.append(pre2);

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = FONT_HREF;
  document.head.append(link);
}

/**
 * Vante Video Ribbon showcase — headline + 3D ribbon + grid only.
 * Top/bottom Vante chrome removed for the DL landing embed.
 */
export function VanteRibbon() {
  useEffect(() => {
    ensureFonts();

    let disposed = false;
    let dispose: (() => void) | undefined;

    const onReady = (event: Event) => {
      const detail = (event as CustomEvent<() => void>).detail;
      if (disposed) {
        detail?.();
        return;
      }
      dispose = detail;
    };

    window.addEventListener(READY, onReady);

    const script = document.createElement("script");
    script.type = "module";
    script.dataset.vanteRibbon = "true";
    script.textContent = `
      import { mount } from "/showcase/vante-ribbon.js?v=10";
      const dispose = mount();
      window.dispatchEvent(new CustomEvent("${READY}", { detail: dispose }));
    `;
    document.body.append(script);

    return () => {
      disposed = true;
      dispose?.();
      window.removeEventListener(READY, onReady);
      script.remove();
    };
  }, []);

  return (
    <div className="vante-ribbon">
      <div id="track">
        <main className="stage" id="stage">
          <h1 aria-label="Craft in motion">
            <div className="hl" id="l1" aria-hidden="true">
              <span>CRAFT IN</span>
            </div>
            <div className="hl" id="l2" aria-hidden="true">
              <span>MOTION</span>
            </div>
          </h1>
          <div id="cap">Exploring ideas through daily design practice.</div>
          <div id="glow" />
          <div id="cross">
            <i>+</i>
          </div>
          <div id="rule" />
          <canvas id="gl" />
          <div id="name" />
        </main>
      </div>
    </div>
  );
}
