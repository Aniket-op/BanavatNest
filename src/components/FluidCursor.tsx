'use client';

import { useEffect, useRef } from "react";

const FluidCursor: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let mouse = { x: width / 2, y: height / 2 };
        let pos = { x: width / 2, y: height / 2 };

        const friction = 0.88;
        const speed = 0.12;
        let vx = 0;
        let vy = 0;

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            vx += (mouse.x - pos.x) * speed;
            vy += (mouse.y - pos.y) * speed;
            vx *= friction;
            vy *= friction;
            pos.x += vx;
            pos.y += vy;

            const isDarkMode = document.documentElement.classList.contains("dark");
            const baseAlpha = isDarkMode ? 0.15 : 0.35;
            const coreAlpha = isDarkMode ? 0.3 : 0.45;

            const gradient = ctx.createRadialGradient(
                pos.x, pos.y, 0,
                pos.x, pos.y, isDarkMode ? 600 : 450,
            );

            gradient.addColorStop(0, `rgba(132, 204, 22, ${baseAlpha})`);
            gradient.addColorStop(0.5, `rgba(132, 204, 22, ${baseAlpha * 0.2})`);
            gradient.addColorStop(1, "rgba(132, 204, 22, 0)");

            ctx.fillStyle = gradient;
            ctx.globalCompositeOperation = isDarkMode ? 'screen' : 'source-over';

            ctx.beginPath();
            ctx.arc(pos.x, pos.y, isDarkMode ? 600 : 450, 0, Math.PI * 2);
            ctx.fill();

            const coreGradient = ctx.createRadialGradient(
                pos.x, pos.y, 0,
                pos.x, pos.y, 120,
            );
            coreGradient.addColorStop(0, `rgba(132, 204, 22, ${coreAlpha})`);
            coreGradient.addColorStop(0.6, `rgba(132, 204, 22, ${coreAlpha * 0.1})`);
            coreGradient.addColorStop(1, "rgba(132, 204, 22, 0)");

            ctx.fillStyle = coreGradient;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 120, 0, Math.PI * 2);
            ctx.fill();

            ctx.globalCompositeOperation = 'source-over';

            requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0 opacity-100 transition-opacity"
            style={{ filter: 'blur(50px)' }}
        />
    );
};

export default FluidCursor;
