export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "var(--font-body), system-ui, sans-serif",
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
      <div
        style={{
          position: "absolute",
          borderRadius: "50%",
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(168, 85, 247, 0.1), transparent 70%)",
          top: "15%",
          left: "10%",
          animation: "drift 12s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          borderRadius: "50%",
          width: 200,
          height: 200,
          background:
            "radial-gradient(circle, rgba(45, 212, 191, 0.08), transparent 70%)",
          bottom: "20%",
          right: "15%",
          animation: "drift 10s ease-in-out infinite reverse",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 60,
          height: 60,
          border: "1px solid rgba(168, 85, 247, 0.15)",
          borderRadius: 8,
          top: "25%",
          right: "20%",
          animation: "spin 20s linear infinite",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 40,
          height: 40,
          border: "1px solid rgba(45, 212, 191, 0.12)",
          borderRadius: "50%",
          bottom: "30%",
          left: "20%",
          animation: "pulse 4s ease-in-out infinite",
          zIndex: 0,
        }}
      />
      <h1
        style={{
          fontSize: "clamp(2.5rem, 8vw, 6rem)",
          fontWeight: 900,
          margin: 0,
          fontFamily: "var(--font-heading), monospace",
          background:
            "linear-gradient(135deg, #a78bfa, #f472b6, #2dd4bf, #a78bfa)",
          backgroundSize: "300% 300%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shimmer 4s ease-in-out infinite",
          letterSpacing: "-0.03em",
          position: "relative",
          zIndex: 1,
          textShadow: "0 0 80px rgba(168, 85, 247, 0.15)",
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
          animation: "fadeIn 2s ease-out 0.5s both",
        }}
      >
        Vedify Labs
      </p>
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes drift {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-20px, 20px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.3); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
