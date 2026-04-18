'use client';
import { useEffect } from "react";

export default function LightEffect() {
  useEffect(() => {
    const light = document.querySelector(".cursor-light");

    const moveLight = (e) => {
      if (light) {
        light.style.left = e.clientX + "px";
        light.style.top = e.clientY + "px";
      }
    };

    window.addEventListener("mousemove", moveLight);

    return () => {
      window.removeEventListener("mousemove", moveLight);
    };
  }, []);

  return null;
}