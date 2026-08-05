'use client'

import React, { useEffect, useRef, RefObject } from "react";

const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;

// Matches the previous gsap "power3.easeOut" opacity fade.
const FADE = "opacity 0.9s cubic-bezier(0.215, 0.61, 0.355, 1)";
// Duration of the noise-displacement burst triggered when hovering a link.
const GLITCH_MS = 500;

interface CrosshairProps {
  color?: string;
  containerRef?: RefObject<HTMLElement>;
  speed?: number;
}

const Crosshair: React.FC<CrosshairProps> = ({
  color = "white",
  containerRef = null,
  speed = 0.15,
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const lineHorizontalRef = useRef<HTMLDivElement>(null);
  const lineVerticalRef = useRef<HTMLDivElement>(null);
  const filterXRef = useRef<SVGFETurbulenceElement>(null);
  const filterYRef = useRef<SVGFETurbulenceElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const horizontal = lineHorizontalRef.current;
    const vertical = lineVerticalRef.current;
    if (!horizontal || !vertical) return;

    const container = containerRef?.current ?? null;
    const target: HTMLElement | Window = container || window;
    const lines = [horizontal, vertical];

    for (const line of lines) {
      line.style.transition = FADE;
      line.style.opacity = "0";
    }

    // Smoothed position trailing the raw pointer, one entry per axis.
    const rendered = { x: 0, y: 0 };
    let started = false;
    let frame = 0;
    let glitchStart = 0;

    const setOpacity = (value: string) => {
      for (const line of lines) line.style.opacity = value;
    };

    const handleMouseMove = (ev: MouseEvent) => {
      if (container) {
        const bounds = container.getBoundingClientRect();
        mouse.current = {
          x: ev.clientX - bounds.left,
          y: ev.clientY - bounds.top,
        };
        const outside =
          ev.clientX < bounds.left ||
          ev.clientX > bounds.right ||
          ev.clientY < bounds.top ||
          ev.clientY > bounds.bottom;
        setOpacity(outside ? "0" : "1");
      } else {
        mouse.current = { x: ev.clientX, y: ev.clientY };
      }

      if (!started) {
        started = true;
        rendered.x = mouse.current.x;
        rendered.y = mouse.current.y;
        setOpacity("1");
        frame = requestAnimationFrame(render);
      }
    };

    const render = () => {
      rendered.x = lerp(rendered.x, mouse.current.x, speed);
      rendered.y = lerp(rendered.y, mouse.current.y, speed);
      vertical.style.transform = `translateX(${rendered.x}px)`;
      horizontal.style.transform = `translateY(${rendered.y}px)`;

      if (glitchStart) {
        const t = Math.min((performance.now() - glitchStart) / GLITCH_MS, 1);
        // gsap "power1" eases out, so the turbulence decays as (1 - t)^2.
        const turbulence = (1 - t) ** 2;
        filterXRef.current?.setAttribute("baseFrequency", `${turbulence}`);
        filterYRef.current?.setAttribute("baseFrequency", `${turbulence}`);
        if (t === 1) endGlitch();
      }

      frame = requestAnimationFrame(render);
    };

    const endGlitch = () => {
      glitchStart = 0;
      horizontal.style.filter = "none";
      vertical.style.filter = "none";
    };

    const enter = () => {
      glitchStart = performance.now();
      horizontal.style.filter = "url(#filter-noise-x)";
      vertical.style.filter = "url(#filter-noise-y)";
    };

    const links = (container ?? document).querySelectorAll("a");
    for (const link of links) {
      link.addEventListener("mouseenter", enter);
      link.addEventListener("mouseleave", endGlitch);
    }

    target.addEventListener("mousemove", handleMouseMove as EventListener);

    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener("mousemove", handleMouseMove as EventListener);
      for (const link of links) {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("mouseleave", endGlitch);
      }
    };
  }, [containerRef, speed]);

  return (
    <div
      ref={cursorRef}
      className="cursor"
      style={{
        position: containerRef ? "absolute" : "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 10000,
      }}
    >
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
              ref={filterXRef}
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.000001"
              numOctaves="1"
              ref={filterYRef}
            />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>
      <div
        ref={lineHorizontalRef}
        style={{
          position: "absolute",
          width: "100%",
          height: "1px",
          background: color,
          pointerEvents: "none",
          transform: "translateY(50%)",
          opacity: 0,
        }}
      />
      <div
        ref={lineVerticalRef}
        style={{
          position: "absolute",
          height: "100%",
          width: "1px",
          background: color,
          pointerEvents: "none",
          transform: "translateX(50%)",
          opacity: 0,
        }}
      />
    </div>
  );
};

export default Crosshair;
