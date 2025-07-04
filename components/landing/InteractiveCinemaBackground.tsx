import { useEffect, useRef, useState } from "react";

const FLOATING_ICONS = ["🎬", "🎥", "🍿", "⭐", "🎞️"];

type Position = { x: number; y: number }; // 0..1 به عنوان درصد (0% تا 100%)

function lerp(start: number, end: number, t: number) {
    return start + (end - start) * t;
}

export default function InteractiveCinemaBackground() {
    // موقعیت پایه هر آیکون (ثابت)
    const [basePositions] = useState(() =>
        Array.from({ length: 25 }).map(() => ({
            x: Math.random(),
            y: Math.random(),
            size: 24 + Math.random() * 20,
            animationDuration: 40 + Math.random() * 20,
            animationDelay: Math.random() * 5,
        }))
    );

    // موقعیت فعلی هر آیکون (برای انیمیشن نرم)
    const positionsRef = useRef(basePositions.map(({ x, y }) => ({ x, y })));

    // موقعیت موس نرمال شده بین -1 و 1
    const targetPosRef = useRef({ x: 0, y: 0 });

    const [, forceUpdate] = useState(0); // برای رندر

    useEffect(() => {
        function onMouseMove(e: MouseEvent) {
            const x = (e.clientX / window.innerWidth) * 2 - 1; // -1 تا 1
            const y = (e.clientY / window.innerHeight) * 2 - 1; // -1 تا 1
            targetPosRef.current = { x, y };
        }

        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    useEffect(() => {
        let animationFrameId: number;

        function animate() {
            // مقدار نرمی حرکت (0=بدون حرکت، 1=آنی)
            const smoothing = 0.1;

            // آپدیت موقعیت آیکون‌ها
            positionsRef.current = positionsRef.current.map((pos, i) => {
                const base = basePositions[i];
                // افکت جابجایی بر اساس موس: می‌خوایم تا مثلا ±5% تغییر مکان بدیم
                const offsetRange = 0.05;

                // هدف نهایی = موقعیت پایه + افکت جابه‌جایی بر اساس موس
                const targetX = base.x + targetPosRef.current.x * offsetRange;
                const targetY = base.y + targetPosRef.current.y * offsetRange;

                // مقدار نهایی با نرمی lerp شده
                const newX = lerp(pos.x, targetX, smoothing);
                const newY = lerp(pos.y, targetY, smoothing);

                return { x: newX, y: newY };
            });

            // مجبور می‌کنیم React رندر کنه
            forceUpdate((n) => n + 1);

            animationFrameId = requestAnimationFrame(animate);
        }

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, [basePositions]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {basePositions.map(
                ({ size, animationDuration, animationDelay }, i) => {
                    const pos = positionsRef.current[i];
                    return (
                        <div
                            key={i}
                            className="absolute animate-float text-white opacity-20"
                            style={{
                                top: `${pos.y * 100}%`,
                                left: `${pos.x * 100}%`,
                                fontSize: `${size}px`,
                                animationDuration: `${animationDuration}s`,
                                animationDelay: `${animationDelay}s`,
                                transition: "top 0.1s ease, left 0.1s ease",
                            }}
                        >
                            {FLOATING_ICONS[i % FLOATING_ICONS.length]}
                        </div>
                    );
                }
            )}

            <style jsx>{`
                @keyframes float {
                    0% {
                        transform: translateY(0px) scale(1);
                    }
                    50% {
                        transform: translateY(-40px) scale(1.1) rotate(5deg);
                    }
                    100% {
                        transform: translateY(0px) scale(1);
                    }
                }

                .animate-float {
                    animation-name: float;
                    animation-timing-function: ease-in-out;
                    animation-iteration-count: infinite;
                }
            `}</style>
        </div>
    );
}
