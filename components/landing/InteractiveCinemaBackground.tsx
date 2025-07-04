import { useEffect, useRef, useState } from "react";

const FLOATING_ICONS = ["🎬", "🎥", "🍿", "⭐", "🎞️"];
const ICON_COUNT = 30;

type IconData = {
    baseX: number;
    baseY: number;
    size: number;
    ref: HTMLDivElement | null;
};

export default function InteractiveCinemaScene() {
    const [mouseTarget, setMouseTarget] = useState({ x: 0.5, y: 0.5 });
    const mousePos = useRef({ x: 0.5, y: 0.5 });
    const iconsRef = useRef<IconData[]>(
        Array.from({ length: ICON_COUNT }).map(() => ({
            baseX: Math.random(), // پراکندگی کامل در عرض
            baseY: Math.random(), // پراکندگی کامل در ارتفاع
            size: 30 + Math.random() * 30,
            ref: null,
        }))
    );

    // حرکت موس
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouseTarget({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // انیمیشن شناور
    useEffect(() => {
        let frameId: number;
        const animate = () => {
            mousePos.current.x += (mouseTarget.x - mousePos.current.x) * 0.05;
            mousePos.current.y += (mouseTarget.y - mousePos.current.y) * 0.05;

            const time = Date.now() / 1000;

            iconsRef.current.forEach((icon, i) => {
                const el = icon.ref;
                if (!el) return;

                const waveX = 0.01 * Math.sin(time * 2 + i);
                const waveY = 0.01 * Math.cos(time * 2.5 + i);

                const offsetX = (mousePos.current.x - 0.5) * 0.05;
                const offsetY = (mousePos.current.y - 0.5) * 0.05;

                const finalX = icon.baseX + waveX + offsetX;
                const finalY = icon.baseY + waveY + offsetY;

                el.style.left = `${finalX * 100}%`;
                el.style.top = `${finalY * 100}%`;
            });

            frameId = requestAnimationFrame(animate);
        };
        animate();
        return () => cancelAnimationFrame(frameId);
    }, [mouseTarget]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {iconsRef.current.map((icon, i) => {
                const symbol = FLOATING_ICONS[i % FLOATING_ICONS.length];
                return (
                    <div
                        key={i}
                        ref={(el) => {
                            iconsRef.current[i].ref = el;
                        }}
                        className="absolute text-white opacity-15 transition-transform duration-1000 ease-in-out"
                        style={{
                            fontSize: `${icon.size}px`,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        {symbol}
                    </div>
                );
            })}
        </div>
    );
}
