'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const rafRef = useRef(null);

  // Raw mouse position (defaults updated on first mousemove)
  const mouse = useRef({ x: 0, y: 0 });
  // Smoothed outer ring position
  const outer = useRef({ x: 0, y: 0 });

  const [state, setState] = useState('default'); // 'default' | 'hover' | 'click'
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);

  // Magnetic pull state
  const magnetic = useRef({ active: false, tx: 0, ty: 0 });

  /* ─── Mobile detection ────────────────────────────── */
  useEffect(() => {
    const check = () => {
      const mobile = window.matchMedia('(pointer: coarse)').matches ||
        /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ─── Animation loop ──────────────────────────────── */
  useEffect(() => {
    if (isMobile) return;

    const LERP = 0.10; // outer ring lag (lower = more lag)

    const tick = () => {
      // Lerp outer ring toward mouse (or magnetic target)
      const targetX = magnetic.current.active ? magnetic.current.tx : mouse.current.x;
      const targetY = magnetic.current.active ? magnetic.current.ty : mouse.current.y;

      outer.current.x += (targetX - outer.current.x) * LERP;
      outer.current.y += (targetY - outer.current.y) * LERP;

      // Inner dot follows mouse exactly (no lag)
      if (innerRef.current) {
        innerRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`;
      }

      // Outer ring follows with lag
      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${outer.current.x}px, ${outer.current.y}px) translate(-50%, -50%)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile]);

  /* ─── Mouse event listeners ───────────────────────── */
  useEffect(() => {
    if (isMobile) return;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    const onDown = () => setState('click');
    const onUp   = () => setState(s => s === 'click' ? 'default' : s);

    /* ── Hover detection ─────────────────────────────── */
    const SELECTORS = 'a, button, [data-cursor], input, textarea, select, label, [role="button"], .industry-card, .why-item, .faq-item, .whatwedo-card, .advance-card';

    const onHoverIn = (e) => {
      const el = e.currentTarget;
      setState('hover');

      // Magnetic effect
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const pull = (evt) => {
        const dx = evt.clientX - cx;
        const dy = evt.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.max(rect.width, rect.height) * 0.6;

        if (dist < maxDist) {
          const strength = (1 - dist / maxDist) * 0.35;
          magnetic.current = {
            active: true,
            tx: evt.clientX - dx * strength,
            ty: evt.clientY - dy * strength,
          };
        }
      };

      el.addEventListener('mousemove', pull);
      el._cursorPull = pull;
    };

    const onHoverOut = (e) => {
      setState('default');
      magnetic.current.active = false;
      const el = e.currentTarget;
      if (el._cursorPull) {
        el.removeEventListener('mousemove', el._cursorPull);
        delete el._cursorPull;
      }
    };

    // Attach hover listeners
    const attachHover = () => {
      document.querySelectorAll(SELECTORS).forEach(el => {
        el.addEventListener('mouseenter', onHoverIn);
        el.addEventListener('mouseleave', onHoverOut);
      });
    };

    // MutationObserver for dynamically added elements
    const observer = new MutationObserver(attachHover);
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    attachHover();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      observer.disconnect();

      document.querySelectorAll(SELECTORS).forEach(el => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
        if (el._cursorPull) {
          el.removeEventListener('mousemove', el._cursorPull);
          delete el._cursorPull;
        }
      });
    };
  }, [isMobile, visible]);

  if (isMobile) return null;

  return (
    <>
      {/* ── Outer trailing ring ─────────────────────── */}
      <div
        ref={outerRef}
        className={`cursor-outer cursor-outer--${state} ${visible ? 'cursor-visible' : ''}`}
        aria-hidden="true"
      >
        <div className="cursor-outer-ring" />
      </div>

      {/* ── Inner precise dot ───────────────────────── */}
      <div
        ref={innerRef}
        className={`cursor-inner cursor-inner--${state} ${visible ? 'cursor-visible' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}