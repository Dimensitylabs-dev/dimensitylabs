"use client";

import Image from "next/image";
import {
  type FormEvent,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";

const PLATE_SRC =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/03c58212-3a59-4c80-b19d-30d05a174563.webp";
const VIDEO_SRC =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/f6f4ec49-d5dd-4893-8eb4-fa0f932aceaf.mp4";

export function FinalCtaPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  const onLoadedData = useEffectEvent(() => {
    setVideoReady(true);
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion) return;

    const handleLoaded = () => onLoadedData();
    video.addEventListener("loadeddata", handleLoaded);

    const handleTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const remaining = video.duration - video.currentTime;
      if (remaining < 1 && remaining > 0) {
        video.style.opacity = String(0.8 * remaining);
      } else if (videoReady) {
        video.style.opacity = "0.8";
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    void video.play().catch(() => {
      /* Autoplay can fail; still plate remains visible. */
    });

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [reduceMotion, videoReady]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Enter a valid email to join the waitlist.");
      return;
    }

    setStatus("You're on the list — we'll be in touch.");
    form.reset();
  }

  return (
    <div className="dl-cta__frame">
      <div className="dl-cta__card">
        <div className="dl-cta__card-border" aria-hidden="true" />

        <div className="dl-cta__media">
          <div className="dl-cta__media-fill">
            <Image
              src={PLATE_SRC}
              alt=""
              fill
              priority={false}
              sizes="(max-width: 1440px) 100vw, 1380px"
              className="dl-cta__plate"
            />
          </div>
          {!reduceMotion ? (
            <video
              ref={videoRef}
              className={`dl-cta__video${videoReady ? " is-ready" : ""}`}
              src={VIDEO_SRC}
              muted
              playsInline
              loop
              preload="metadata"
              aria-hidden="true"
            />
          ) : null}
        </div>

        <div className="dl-cta__content">
          <h2 id="home-cta-heading" className="dl-cta__title">
            Get your Vexor Account
          </h2>
          <p className="dl-cta__sub">
            Join 200+ businesses like yours, powering their global
            <br />
            transactions with Vexor.
          </p>

          <form className="dl-cta__form" onSubmit={onSubmit} noValidate>
            <label className="dl-cta-sr-only" htmlFor="cta-email">
              Email
            </label>
            <input
              id="cta-email"
              className="dl-cta__input"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Enter your email to join the waitlist"
              required
            />
            <button className="dl-cta__submit" type="submit">
              Get Free Access
            </button>
          </form>
          {status ? <p className="dl-cta__status">{status}</p> : null}
        </div>
      </div>

      {/* <div className="dl-cta__footer">
        <div className="dl-cta__footer-brand">
          <Mark />
          <p className="dl-cta__footer-copy">
            Get paid for free from countries in the EU, Asia, and the US. There
            are no deposit charges. Create an account in your preferred currency
            and share the details to get paid. We make it easy to go
            international.
          </p>
        </div>

        <div className="dl-cta__footer-contact">
          <p className="dl-cta__footer-contact-title">Contact Us</p>
          <p>
            <a href="tel:+442079460321">+44 20 7946 0321</a>
          </p>
          <p className="dl-cta__address">
            {"Vexor Labs Ltd,\n12 Harbour Row,\nBristol BS1 5TT, UK"}
          </p>
        </div>
      </div> */}
{/* 
      <div className="dl-cta__legal">
        <p>Copyright © Vexor Labs. 2025. All Rights Reserved.</p>
        <p>
          Email us:{" "}
          <a href="mailto:hello@vexor.example">hello@vexor.example</a>
        </p>
      </div> */}
    </div>
  );
}
