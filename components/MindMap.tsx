import React, { useState, useEffect, useRef } from 'react';
import type { MindMapData } from '../types';
import SaturnRing from './SaturnRing';

interface MindMapProps {
  data: MindMapData;
}

const Node: React.FC<{ 
  title: string; 
  style: React.CSSProperties; 
  index: number; 
  link: string; 
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ title, style, index, link, onMouseEnter, onMouseLeave }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className="absolute w-36 h-24 md:w-40 md:h-28 p-2 flex items-center justify-center text-center text-xs md:text-sm font-medium
               bg-sky-900/30 border border-sky-400/50 rounded-lg shadow-lg shadow-sky-500/20 backdrop-blur-sm
               hover:border-sky-300 hover:shadow-sky-400/40 transition-all duration-300 ease-out cursor-pointer"
    style={{...style, animation: `fadeInNode 0.5s ${index * 0.05}s ease-out forwards`, opacity: 0 }}
  >
    <span className="text-sky-200">{title}</span>
    <style>{`
        @keyframes fadeInNode {
            from { opacity: 0; transform: var(--transform-from); }
            to { opacity: 1; transform: var(--transform-to); }
        }
    `}</style>
  </a>
);

// Helper function to generate a jagged path for the arc
const generateArcPath = (x1: number, y1: number, x2: number, y2: number): string => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.sqrt(dx * dx + dy * dy);
  const segments = Math.max(5, Math.floor(length / 20));
  let path = `M ${x1} ${y1}`;
  
  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const x = x1 + dx * t + (Math.random() - 0.5) * 20;
    const y = y1 + dy * t + (Math.random() - 0.5) * 20;
    path += ` L ${x} ${y}`;
  }
  
  path += ` L ${x2} ${y2}`;
  return path;
};


export const MindMap: React.FC<MindMapProps> = ({ data }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY, currentTarget } = e;
      const { left, top, width, height } = (currentTarget as HTMLElement).getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;

      const MAX_ROTATION = 12;
      setRotation({ x: -y * MAX_ROTATION, y: x * MAX_ROTATION });
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
    };
    
    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    container?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container?.removeEventListener('mousemove', handleMouseMove);
      container?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const numNodes = data.nodes.length;
  const angleStep = (2 * Math.PI) / numNodes;

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const radius = isMobile ? 260 : 450;
  const nodeZ = 20;

  const hoveredNode = hoveredNodeId !== null ? data.nodes.find(node => node.id === hoveredNodeId) : null;
  let arcPathData = { x: 0, y: 0, path: '' };

  if (hoveredNode) {
    const nodeIndex = data.nodes.findIndex(n => n.id === hoveredNode.id);
    const angle = nodeIndex * angleStep;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    arcPathData = { x, y, path: generateArcPath(0, 0, x, y) };
  }

  return (
    <div 
        ref={containerRef} 
        className="w-full h-full flex items-center justify-center"
        style={{ perspective: '1500px' }}
    >
      <div 
        className="relative transition-transform duration-300 ease-out" 
        style={{ 
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 md:w-96 md:h-96 rounded-full flex items-center justify-center
                     shadow-2xl shadow-sky-400/40 border-2 border-sky-300/50
                     transform-style-3d transition-transform duration-300 ease-out"
          style={{ transform: 'translate(-50%, -50%) translateZ(60px)' }}
        >
          <img
            src="https://image.pollinations.ai/prompt/A%20glowing,%20intricate%203D%20sphere%20of%20neural%20networks,%20with%20the%20word%20'AI'%20glowing%20in%20the%20center,%20against%20a%20dark,%20starry%20background"
            alt="AI Sphere"
            className="w-full h-full object-cover rounded-full"
          />
          <SaturnRing />
        </div>

        <svg
          className="absolute w-full h-full top-0 left-0 pointer-events-none"
          style={{
            width: `${radius * 2.5}px`,
            height: `${radius * 2.5}px`,
            left: '50%',
            top: '50%',
            marginLeft: `-${radius * 1.25}px`,
            marginTop: `-${radius * 1.25}px`,
            transform: `translateZ(${nodeZ}px)`,
            opacity: hoveredNodeId !== null ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
          viewBox={`0 0 ${radius * 2.5} ${radius * 2.5}`}
        >
          <defs>
            <filter id="electric-arc-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.01 0.5"
                numOctaves="3"
                result="turbulence"
              >
                 <animate 
                    attributeName="baseFrequency" 
                    dur="0.1s" 
                    values="0.01 0.5; 0.02 0.4; 0.01 0.5" 
                    repeatCount="indefinite"
                 />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="10" />
            </filter>
          </defs>
          {hoveredNode && (
            <g transform={`translate(${radius*1.25}, ${radius*1.25})`}>
                <path
                    key={hoveredNodeId} // Re-render path on hover change
                    d={arcPathData.path}
                    fill="none"
                    stroke="rgba(125, 211, 252, 0.8)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#electric-arc-filter)"
                />
                 <path
                    d={arcPathData.path}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.9)"
                    strokeWidth="1"
                    strokeLinecap="round"
                    filter="url(#electric-arc-filter)"
                />
            </g>
          )}
        </svg>

        {data.nodes.map((node, i) => {
          const angle = i * angleStep;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          
          const transformTo = `translateX(-50%) translateY(-50%) translate3d(${x}px, ${y}px, ${nodeZ}px)`;
          const transformFrom = `translateX(-50%) translateY(-50%) translate3d(${x*0.5}px, ${y*0.5}px, -50px)`;
          
          return (
            <Node
              key={node.id}
              title={node.title}
              link={node.link}
              index={i}
              onMouseEnter={() => setHoveredNodeId(node.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              style={
                {
                  top: '50%',
                  left: '50%',
                  '--transform-from': transformFrom,
                  '--transform-to': transformTo,
                } as React.CSSProperties
              }
            />
          );
        })}
      </div>
    </div>
  );
};