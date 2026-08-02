import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useGesture } from '@use-gesture/react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  label: string;
  categoryIndex: number;
}

interface GlobeSkillsProps {
  skills: { name: string; categoryIndex: number }[];
  selectedCategory: number;
  radius?: number;
}

const CATEGORY_COLORS = [
  '#ef4444', // ML - Red
  '#3b82f6', // Web - Blue
  '#22c55e', // DevOps - Green
  '#06b6d4', // Databases - Cyan
  '#eab308', // Languages - Yellow
  '#a855f7'  // Blockchain - Purple
];

export function GlobeSkills({ skills, selectedCategory, radius = 240 }: GlobeSkillsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Track rotation velocity (X and Y axes)
  const velocityRef = useRef({ x: 0.002, y: 0.002 }); 
  const isDraggingRef = useRef(false);

  // Maintain point coordinates in a ref to avoid React render cycle overhead on every frame
  const pointsRef = useRef<Point3D[]>([]);

  // Initialize initial points distributed on a sphere
  useEffect(() => {
    const count = skills.length;
    const computed: Point3D[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const denominator = count > 1 ? count - 1 : 1;
      const y = 1 - (i / denominator) * 2; 
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;

      computed.push({
        x: Math.cos(theta) * radiusAtY * radius,
        y: y * radius,
        z: Math.sin(theta) * radiusAtY * radius,
        label: skills[i]?.name || '',
        categoryIndex: skills[i]?.categoryIndex ?? 0
      });
    }
    pointsRef.current = computed;
  }, [skills, radius]);

  // Interactive mouse pointer drift
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Drifting towards cursor
    velocityRef.current.x = -(y / (rect.height / 2)) * 0.005;
    velocityRef.current.y = (x / (rect.width / 2)) * 0.005;
  };

  const handlePointerLeave = () => {
    velocityRef.current = { x: 0.002, y: 0.002 };
  };

  // Mobile-friendly drag gestures
  useGesture(
    {
      onDragStart: () => {
        isDraggingRef.current = true;
      },
      onDrag: ({ delta: [dx, dy] }) => {
        // Direct rotation based on delta distance (feels like trackball)
        velocityRef.current.x = -dy * 0.003;
        velocityRef.current.y = dx * 0.003;
      },
      onDragEnd: ({ velocity: [vx, vy], direction: [dx, dy] }) => {
        isDraggingRef.current = false;
        // Keep inertia momentum
        velocityRef.current = {
          x: -vy * dy * 0.05,
          y: vx * dx * 0.05
        };
      }
    },
    { target: containerRef, eventOptions: { passive: false } }
  );

  // High-performance animation loop (Direct DOM Manipulation)
  useEffect(() => {
    let frame: number;

    const animate = () => {
      if (!isDraggingRef.current) {
        // Apply friction
        velocityRef.current.x *= 0.95;
        velocityRef.current.y *= 0.95;

        // Auto drift
        const minSpeed = 0.001;
        if (Math.abs(velocityRef.current.x) < minSpeed) velocityRef.current.x = minSpeed * Math.sign(velocityRef.current.x || 1);
        if (Math.abs(velocityRef.current.y) < minSpeed) velocityRef.current.y = minSpeed * Math.sign(velocityRef.current.y || 1);
      }

      const cosX = Math.cos(velocityRef.current.x);
      const sinX = Math.sin(velocityRef.current.x);
      const cosY = Math.cos(velocityRef.current.y);
      const sinY = Math.sin(velocityRef.current.y);

      // Apply rotation matrix incrementally
      pointsRef.current = pointsRef.current.map((p, i) => {
        // Rotate around X-axis
        const y1 = p.y * cosX - p.z * sinX;
        const z1 = p.y * sinX + p.z * cosX;
        
        // Rotate around Y-axis
        const x2 = p.x * cosY - z1 * sinY;
        const z2 = p.x * sinY + z1 * cosY;

        const newP = { ...p, x: x2, y: y1, z: z2 };

        // Paint directly to DOM using GPU-accelerated properties only (bypassing layout/paint thrashing)
        const el = itemRefs.current[i];
        if (el) {
          const isHighlighted = newP.categoryIndex === selectedCategory;
          const isFront = newP.z > 0;
          const scale = (newP.z + radius * 1.5) / (radius * 2.5); // Depth scale
          
          let opacity = 0.6 + 0.4 * ((newP.z + radius) / (radius * 2));
          if (!isFront) opacity *= 0.5;
          if (!isHighlighted) opacity *= 0.45;
          
          const zIndex = Math.round(newP.z + radius);
          const finalScale = isHighlighted ? scale * 1.2 : scale; // Pop out if selected

          // Use translate3d for hardware acceleration, avoid left/top
          el.style.transform = `translate(-50%, -50%) translate3d(${newP.x}px, ${newP.y}px, 0) scale(${finalScale})`;
          el.style.zIndex = zIndex.toString();
          el.style.opacity = opacity.toString();
        }

        return newP;
      });

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [radius, selectedCategory]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-[550px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden select-none"
      style={{ touchAction: 'none' }} // Crucial for mobile dragging
    >
      {/* Visual Globe grid backgrounds */}
      <div className="absolute w-[550px] h-[550px] rounded-full border border-white/5 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-primary/10 pointer-events-none animate-[spin_85s_linear_infinite]" />
      
      <div className="relative w-full h-full">
        {skills.map((skill, i) => {
          const isHighlighted = skill.categoryIndex === selectedCategory;
          const color = CATEGORY_COLORS[skill.categoryIndex] || '#fff';

          return (
            <div
              key={skill.name}
              ref={el => itemRefs.current[i] = el}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 font-semibold px-3 py-1.5 rounded-full border text-center whitespace-nowrap transition-colors duration-300"
              style={{
                color,
                borderColor: isHighlighted ? `${color}aa` : `${color}20`,
                backgroundColor: isHighlighted ? `${color}22` : `${color}05`,
                textShadow: isHighlighted ? `0 0 8px ${color}` : 'none',
                boxShadow: isHighlighted ? `0 0 20px 2px ${color}30` : 'none',
                borderWidth: isHighlighted ? '2px' : '1px',
                // Position and scale are handled continuously by the animation loop
                left: '50%',
                top: '50%',
                opacity: 0,
              }}
            >
              {skill.name}
            </div>
          );
        })}
      </div>
    </div>
  );
}
