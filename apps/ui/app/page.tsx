export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "system-ui, sans-serif",
        background: "#0f0f0f",
        color: "#f5f5f5",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 40%, rgba(120, 80, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255, 100, 200, 0.12) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(0, 200, 255, 0.08) 0%, transparent 50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <h1
        style={{
          fontSize: "clamp(2.5rem, 8vw, 6rem)",
          fontWeight: 900,
          margin: 0,
          background:
            "linear-gradient(135deg, #a78bfa, #f472b6, #2dd4bf, #a78bfa)",
          backgroundSize: "300% 300%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shimmer 4s ease-in-out infinite",
          letterSpacing: "-0.03em",
          position: "relative",
          zIndex: 1,
        }}
      >
        Coming Soon
      </h1>
      <p
        style={{
          marginTop: "1.5rem",
          fontSize: "clamp(0.875rem, 2vw, 1.25rem)",
          color: "#888",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          position: "relative",
          zIndex: 1,
        }}
      >
        Vedify Labs
      </p>
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </main>
  );
}
