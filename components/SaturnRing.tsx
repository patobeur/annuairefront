import React from 'react';

const SaturnRing: React.FC = () => {
    // Repeat the text to ensure it fills the circumference and loops smoothly
    const text = "AUBERON-AI.COM • ".repeat(5);
    const characters = text.split('');
    
    // Radii for desktop and mobile, to position the ring inside the central sphere
    const desktopRadius = 500;
    const mobileRadius = 135;

    return (
        <>
            <div
                className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none"
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div
                    className="absolute top-1/2 left-1/2 w-full h-full"
                    style={{
                        transformStyle: 'preserve-3d',
                        animation: 'spinRing 40s linear infinite',
                    }}
                >
                    {/* Desktop version */}
                    {characters.map((char, i) => {
                        const angle = (i / characters.length) * 360;
                        return (
                            <span
                                key={i}
                                className="absolute top-1/2 left-1/2 -mt-2.5 -ml-1 text-sky-300 font-orbitron text-lg hidden md:inline-block"
                                style={{
                                    transform: `rotate(${angle}deg) translateX(${desktopRadius}px) rotateZ(90deg)`,
                                    textShadow: '0 0 8px rgba(125, 211, 252, 1)',
                                }}
                            >
                                {char}
                            </span>
                        );
                    })}
                    {/* Mobile version */}
                    {characters.map((char, i) => {
                        const angle = (i / characters.length) * 360;
                        return (
                            <span
                                key={`mobile-${i}`}
                                className="absolute top-1/2 left-1/2 -mt-2 -ml-1 text-sky-300 font-orbitron text-base md:hidden"
                                style={{
                                    transform: `rotate(${angle}deg) translateX(${mobileRadius}px) rotateZ(90deg)`,
                                    textShadow: '0 0 5px rgba(125, 211, 252, 1)',
                                }}
                            >
                                {char}
                            </span>
                        );
                    })}
                </div>
            </div>
            <style>{`
                @keyframes spinRing {
                    from { transform: rotateX(65deg) rotateZ(0deg); }
                    to { transform: rotateX(65deg) rotateZ(360deg); }
                }
            `}</style>
        </>
    );
};

export default SaturnRing;
