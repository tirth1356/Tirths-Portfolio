import { useRef, useState, ReactNode } from 'react';

interface BentoItem {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  gradient?: string;
}

interface MagicBentoProps {
  items: BentoItem[];
}

function BentoCard({ item }: { item: BentoItem }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-purple-500/20 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/40 ${item.className ?? ''}`}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(147,51,234,0.12), transparent 40%)`,
        }}
      />
      {/* Gradient overlay */}
      {item.gradient && (
        <div className={`absolute inset-0 opacity-10 ${item.gradient}`} />
      )}
      <div className="relative z-10">
        <div className="mb-4 inline-flex p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
          {item.icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
      </div>
    </div>
  );
}

export function MagicBento({ items }: MagicBentoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <BentoCard key={i} item={item} />
      ))}
    </div>
  );
}
