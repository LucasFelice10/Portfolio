import { useEffect, useRef } from "react";

export function CRTOverlay() {
  const grainRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 200;
    canvas.width = SIZE;
    canvas.height = SIZE;

    let animId: number;
    const buf = new Uint8ClampedArray(SIZE * SIZE * 4);

    const draw = () => {
      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        buf[i] = v;
        buf[i + 1] = (v * 0.72) | 0;
        buf[i + 2] = 0;
        buf[i + 3] = (Math.random() * 12 + 2) | 0;
      }
      ctx.putImageData(new ImageData(buf, SIZE, SIZE), 0, 0);
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-[90]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)",
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[91]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      {/* Amber film grain */}
      <canvas
        ref={grainRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[92]"
        style={{ imageRendering: "pixelated", mixBlendMode: "screen", opacity: 0.5 }}
      />

      {/* Horizontal flicker line */}
      <div
        className="fixed left-0 right-0 pointer-events-none z-[93]"
        style={{
          height: "2px",
          background: "rgba(255,184,0,0.04)",
          animation: "flicker-line 8s linear infinite",
        }}
      />

      <style>{`
        @keyframes flicker-line {
          0%   { top: -2px; opacity: 0; }
          2%   { opacity: 1; }
          98%  { opacity: 1; }
          100% { top: 100vh; opacity: 0; }
        }
      `}</style>
    </>
  );
}
