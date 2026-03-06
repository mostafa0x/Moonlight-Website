"use client";

import { useEffect, useRef } from "react";

const totalFrames = 192; // عدل حسب عدد الصور
const fps = 24;

export default function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const images: HTMLImageElement[] = [];

    let frame = 0;
    let lastTime = 0;

    // تحميل الصور
    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `/imgs/back/${String(i).padStart(3, "0")}.webp`;
      images.push(img);
    }

    const render = (index: number) => {
      const img = images[index];
      if (!img) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    const animate = (time: number) => {
      const delta = time - lastTime;

      if (delta > 1000 / fps) {
        frame = (frame + 1) % totalFrames;
        render(frame);
        lastTime = time;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={1920}
      height={1080}
      className="w-full h-screen object-cover"
    />
  );
}
