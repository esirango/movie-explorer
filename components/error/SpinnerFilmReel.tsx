import React from "react";

const SpinningFilmReel = () => {
    return (
        <div className="max-w-40 h-36 mb-6 mx-auto">
            <svg
                viewBox="0 0 64 64"
                className="w-full h-full spinning-svg"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#6366F1"
                    strokeWidth="6"
                    fill="#C7D2FE"
                />
                {[...Array(6)].map((_, i) => {
                    const angle = i * 60 * (Math.PI / 180);
                    const x = 32 + 16 * Math.cos(angle);
                    const y = 32 + 16 * Math.sin(angle);
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="5"
                            fill="#4F46E5"
                            stroke="#312E81"
                            strokeWidth="2"
                        />
                    );
                })}
                <circle cx="32" cy="32" r="8" fill="#4338CA" />
            </svg>

            <style jsx>{`
                .spinning-svg {
                    animation: spin 4s linear infinite;
                    transform-origin: 50% 50%;
                    cursor: pointer;
                    transition: animation-duration 0.3s ease;
                }

                .spinning-svg:hover {
                    animation-duration: 1s;
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }

                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default SpinningFilmReel;
