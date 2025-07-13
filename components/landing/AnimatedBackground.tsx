import React, { useRef, useEffect } from "react";

const NUM_PARTICLES = 60;

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
}

const AnimatedBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: 0, y: 0 });
    const targetMouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Ensure window is defined
        if (typeof window !== "undefined") {
            mouse.current = {
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
            };
            targetMouse.current = { ...mouse.current };

            const canvas = canvasRef.current!;
            const ctx = canvas.getContext("2d")!;
            let width = (canvas.width = window.innerWidth);
            let height = (canvas.height = window.innerHeight);

            // Init particles
            particles.current = Array.from({ length: NUM_PARTICLES }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                size: 1 + Math.random() * 2.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: 0.1 + Math.random() * 0.4,
            }));

            const handleMouseMove = (e: MouseEvent) => {
                targetMouse.current.x = e.clientX;
                targetMouse.current.y = e.clientY;
            };

            window.addEventListener("mousemove", handleMouseMove);

            const animate = () => {
                mouse.current.x +=
                    (targetMouse.current.x - mouse.current.x) * 0.05;
                mouse.current.y +=
                    (targetMouse.current.y - mouse.current.y) * 0.05;

                ctx.clearRect(0, 0, width, height);

                particles.current.forEach((p) => {
                    p.x += p.speedX;
                    p.y += p.speedY;

                    const dx = mouse.current.x - p.x;
                    const dy = mouse.current.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 180) {
                        p.x += dx * 0.005;
                        p.y += dy * 0.005;
                    }

                    if (p.x < 0) p.x = width;
                    if (p.x > width) p.x = 0;
                    if (p.y < 0) p.y = height;
                    if (p.y > height) p.y = 0;

                    const gradient = ctx.createRadialGradient(
                        p.x,
                        p.y,
                        0,
                        p.x,
                        p.y,
                        p.size * 10
                    );
                    gradient.addColorStop(
                        0,
                        `rgba(255, 230, 150, ${p.opacity})`
                    );
                    gradient.addColorStop(1, "rgba(255, 230, 150, 0)");

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2);
                    ctx.fill();
                });

                requestAnimationFrame(animate);
            };

            animate();

            const handleResize = () => {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
            };

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
                pointerEvents: "none",
            }}
            // className="bg-gray-900"
            aria-hidden="true"
        />
    );
};

export default AnimatedBackground;
