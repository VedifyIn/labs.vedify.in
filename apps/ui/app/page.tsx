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
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: 700, margin: 0 }}>
        Coming Soon
      </h1>
      <p style={{ marginTop: "1rem", fontSize: "1.125rem", color: "#888" }}>
        Vedify Labs
      </p>
    </main>
  );
}
