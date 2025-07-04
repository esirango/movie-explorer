import { useEffect, useRef, useState } from "react";

const FLOATING_ICONS = ["🎬", "🎥", "🍿", "⭐", "🎞️"];

export default function InteractiveCinemaScene() {
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* لایه نوری که با موس حرکت می‌کنه */}
            <div
                className="absolute w-[200px] h-[200px] rounded-full bg-white opacity-5 blur-3xl"
                style={{
                    left: `${mousePos.x * 100}%`,
                    top: `${mousePos.y * 100}%`,
                    transform: "translate(-50%, -50%)",
                    transition: "left 0.1s ease-out, top 0.1s ease-out",
                }}
            />

            {/* آیکون‌های ثابت با افکت‌های ملایم */}
            {Array.from({ length: 20 }).map((_, i) => {
                const angle = (i / 20) * Math.PI * 2;
                const radius = 0.4 + Math.random() * 0.1;

                const x = 0.5 + Math.cos(angle) * radius;
                const y = 0.5 + Math.sin(angle) * radius;

                const icon = FLOATING_ICONS[i % FLOATING_ICONS.length];
                const animationDelay = Math.random() * 5;

                return (
                    <div
                        key={i}
                        className="absolute text-white opacity-15"
                        style={{
                            top: `${y * 100}%`,
                            left: `${x * 100}%`,
                            fontSize: `${40 + Math.random() * 20}px`,
                            transform: "translate(-50%, -50%)",
                            animation: `pulse ${
                                8 + Math.random() * 4
                            }s ease-in-out infinite`,
                            animationDelay: `${animationDelay}s`,
                        }}
                    >
                        {icon}
                    </div>
                );
            })}

            <style jsx>{`
                @keyframes pulse {
                    0% {
                        transform: translate(-50%, -50%) scale(1) rotate(0deg);
                        opacity: 0.1;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.05)
                            rotate(3deg);
                        opacity: 0.2;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(1) rotate(0deg);
                        opacity: 0.1;
                    }
                }
            `}</style>
        </div>
    );
}
