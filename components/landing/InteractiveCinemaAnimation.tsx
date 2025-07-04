import { useEffect, useRef, useState } from "react";

const FLOATING_ELEMENTS = Array.from({ length: 10 });

export default function InteractiveCinemaAnimation() {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const animationFrameId = useRef<number | null>(null);

    useEffect(() => {
        function handleMouseMove(e: MouseEvent) {
            if (animationFrameId.current !== null) return;

            animationFrameId.current = requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth) * 2 - 1;
                const y = (e.clientY / window.innerHeight) * 2 - 1;
                setPos({ x, y });
                animationFrameId.current = null;
            });
        }

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            if (animationFrameId.current)
                cancelAnimationFrame(animationFrameId.current);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className="w-full h-[500px] relative overflow-hidden select-none mt-8">
            {/* باکس اصلی انیمیشن */}
            <div
                style={{
                    transform: `translate(-50%, -50%) rotateY(${
                        pos.x * 25
                    }deg) rotateX(${-pos.y * 25}deg) scale(1.05)`,
                    transition: "transform 0.1s ease-out",
                    willChange: "transform",
                    boxShadow:
                        "0 0 40px rgba(128,0,255,0.7), 0 0 25px rgba(255,0,150,0.6), 0 0 15px rgba(100,100,255,0.5)",
                }}
                className={`
                    w-80 h-80 md:w-96 md:h-96 rounded-3xl bg-gradient-to-tr
                    from-indigo-500 via-purple-700 to-indigo-600
                    dark:from-indigo-700 dark:via-purple-900 dark:to-indigo-800
                    shadow-2xl absolute left-1/2 top-1/2 transform 
                    -translate-x-1/2 -translate-y-1/2 z-20
                `}
            >
                <img
                    src="/assets/images/landing/filmReel.png"
                    alt="Cinema Reel"
                    className="w-full h-full object-cover rounded-3xl"
                    draggable={false}
                    style={{
                        filter: "brightness(1.3) contrast(1.2) drop-shadow(0 0 15px rgba(255,255,255,0.5))",
                    }}
                />

                <div
                    className="absolute inset-0 rounded-3xl opacity-30 animate-pulse pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(128,0,255,0.25) 50%, rgba(255,255,255,0.15) 100%)",
                        mixBlendMode: "screen",
                    }}
                />
            </div>

            {/* المان‌های شناور */}
            {FLOATING_ELEMENTS.map((_, i) => (
                <div
                    key={i}
                    className="absolute w-4 h-4 rounded-full bg-white opacity-20 blur-sm animate-float"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${3 + Math.random() * 4}s`,
                        animationDelay: `${Math.random() * 2}s`,
                    }}
                />
            ))}

            {/* استایل انیمیشن شناوری */}
            <style jsx>{`
                @keyframes float {
                    0% {
                        transform: translateY(0) scale(1);
                    }
                    50% {
                        transform: translateY(-30px) scale(1.2);
                    }
                    100% {
                        transform: translateY(0) scale(1);
                    }
                }
                .animate-float {
                    animation-name: float;
                    animation-iteration-count: infinite;
                    animation-timing-function: ease-in-out;
                }
            `}</style>
        </div>
    );
}
