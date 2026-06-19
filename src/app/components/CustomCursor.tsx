import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "./ui/use-mobile";

export function CustomCursor() {
  const isMobile = useIsMobile();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!isMobile) return;
    document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
      el.style.transform = "";
    });
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setHidden(false);

      const el = document.elementFromPoint(mx, my);
      const magnet = el?.closest("[data-magnetic]") as HTMLElement | null;
      if (magnet) {
        const rect = magnet.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        mx = cx + dx * 0.35;
        my = cy + dy * 0.35;
        magnet.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
      } else {
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          el.style.transform = "";
        });
      }
    };

    const onLeave = () => setHidden(true);
    const onEnter = () => setHidden(false);

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovered(!!el.closest("a, button, [data-magnetic], input, [role='button']"));
    };

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      animId = requestAnimationFrame(tick);
    };
    tick();

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousemove", checkHover);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousemove", checkHover);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[999]"
        style={{
          width: hovered ? 0 : 5,
          height: hovered ? 0 : 5,
          borderRadius: "50%",
          background: "#d946ef",
          transform: "translate(-50%, -50%)",
          transition: "width 0.15s, height 0.15s, opacity 0.3s",
          opacity: hidden ? 0 : 1,
          top: 0,
          left: 0,
          boxShadow: "0 0 8px rgba(217,70,239,0.8)",
        }}
      />
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[998]"
        style={{
          width: hovered ? 44 : 28,
          height: hovered ? 44 : 28,
          borderRadius: "50%",
          border: `1px solid ${hovered ? "#d946ef" : "rgba(167,139,250,0.4)"}`,
          transform: "translate(-50%, -50%)",
          transition: "width 0.3s cubic-bezier(0.22,1,0.36,1), height 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, opacity 0.3s",
          opacity: hidden ? 0 : 1,
          top: 0,
          left: 0,
          boxShadow: hovered ? "0 0 14px rgba(217,70,239,0.3)" : "none",
        }}
      />
    </>
  );
}
