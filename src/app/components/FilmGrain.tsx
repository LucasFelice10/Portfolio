import { useEffect, useRef } from "react";

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SIZE = 256;
    canvas.width = SIZE;
    canvas.height = SIZE;

    let animId: number;
    const buf = new Uint8ClampedArray(SIZE * SIZE * 4);

    const draw = () => {
      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        buf[i] = v;
        buf[i + 1] = v;
        buf[i + 2] = v;
        buf[i + 3] = (Math.random() * 18 + 6) | 0;
      }
      ctx.putImageData(new ImageData(buf, SIZE, SIZE), 0, 0);
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[100]"
      style={{
        imageRendering: "pixelated",
        opacity: 1,
        mixBlendMode: "overlay",
      }}
    />
  );
}
