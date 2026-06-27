export default function LabBackground() {
  return (
    <>
      {/* Glow pools */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 25% 35%, var(--lab-glow-1, rgba(167,139,250,0.12)) 0%, transparent 50%), radial-gradient(circle at 75% 65%, var(--lab-glow-2, rgba(255,107,107,0.08)) 0%, transparent 50%), radial-gradient(circle at 50% 85%, var(--lab-glow-3, rgba(45,212,191,0.06)) 0%, transparent 50%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(var(--lab-dot-color, rgba(255,255,255,0.025)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Floating molecule hexagons */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Molecule 1 */}
        <div
          className="absolute"
          style={{
            top: "12%",
            left: "8%",
            animation: "drift 14s ease-in-out infinite",
          }}
        >
          <Hexagon
            size={80}
            borderColor="rgba(167, 139, 250, 0.12)"
            glowColor="rgba(167, 139, 250, 0.06)"
          />
        </div>

        {/* Molecule 2 */}
        <div
          className="absolute"
          style={{
            bottom: "18%",
            right: "10%",
            animation: "drift 18s ease-in-out infinite reverse",
          }}
        >
          <Hexagon
            size={60}
            borderColor="rgba(45, 212, 191, 0.1)"
            glowColor="rgba(45, 212, 191, 0.05)"
          />
        </div>

        {/* Molecule 3 */}
        <div
          className="absolute"
          style={{
            top: "55%",
            right: "22%",
            animation: "drift 16s ease-in-out infinite 3s",
          }}
        >
          <Hexagon
            size={48}
            borderColor="rgba(255, 107, 107, 0.1)"
            glowColor="rgba(255, 107, 107, 0.05)"
          />
        </div>

        {/* Bond lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.08, animation: "bond-pulse 4s ease-in-out infinite" }}
        >
          <line x1="12%" y1="16%" x2="18%" y2="12%" stroke="#a78bfa" strokeWidth="0.5" />
          <line x1="85%" y1="75%" x2="78%" y2="70%" stroke="#2dd4bf" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Coffee cup with steam */}
      <div
        className="fixed bottom-6 right-6 pointer-events-none select-none"
        style={{ animation: "float 6s ease-in-out infinite" }}
      >
        {/* Steam wisps above cup */}
        <div className="relative">
          <div
            className="absolute"
            style={{
              bottom: "100%",
              left: 10,
              width: 4,
              height: 32,
              borderRadius: 2,
              background: "linear-gradient(to top, rgba(167,139,250,0.15), transparent)",
              animation: "steam 3s ease-out infinite",
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: "100%",
              left: 20,
              width: 3,
              height: 24,
              borderRadius: 2,
              background: "linear-gradient(to top, rgba(167,139,250,0.12), transparent)",
              animation: "steam 3.5s ease-out infinite 0.8s",
            }}
          />
          <div
            className="absolute"
            style={{
              bottom: "100%",
              left: 30,
              width: 3,
              height: 28,
              borderRadius: 2,
              background: "linear-gradient(to top, rgba(167,139,250,0.1), transparent)",
              animation: "steam 4s ease-out infinite 1.6s",
            }}
          />
          <svg width="48" height="36" viewBox="0 0 48 36" fill="none" aria-hidden="true">
            {/* Cup body */}
            <rect
              x="8"
              y="0"
              width="28"
              height="28"
              rx="3"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            {/* Handle */}
            <path
              d="M36 8 Q44 8 44 16 Q44 22 36 20"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
              fill="none"
            />
            {/* Liquid */}
            <rect x="10" y="16" width="24" height="10" rx="1" fill="rgba(167, 139, 250, 0.06)" />
          </svg>
        </div>
      </div>
    </>
  );
}

function Hexagon({
  size,
  borderColor,
  glowColor,
}: {
  size: number;
  borderColor: string;
  glowColor: string;
}) {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2;
    points.push(
      `${(size / 2 + (size / 2) * Math.cos(angle)).toFixed(1)},${(size / 2 + (size / 2) * Math.sin(angle)).toFixed(1)}`
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ animation: "molecule-rotate 30s linear infinite" }}
      aria-hidden="true"
    >
      <polygon points={points.join(" ")} stroke={borderColor} strokeWidth="0.5" fill={glowColor} />
      {/* "Atom" nodes */}
      <circle cx={size / 2} cy={size / 2} r={2.5} fill="rgba(167,139,250,0.2)" />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        return (
          <circle
            key={i}
            cx={size / 2 + (size / 2) * 0.7 * Math.cos(angle)}
            cy={size / 2 + (size / 2) * 0.7 * Math.sin(angle)}
            r={1.5}
            fill="rgba(255,255,255,0.08)"
          />
        );
      })}
    </svg>
  );
}
