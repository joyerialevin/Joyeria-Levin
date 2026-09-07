"use client";

import { useEffect } from "react";

export default function SobreReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll("[data-reveal]:not(.is-in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
