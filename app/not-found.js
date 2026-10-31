import Link from "next/link";

export const metadata = {
  title: "Page Not Found – Tiffexx",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        textAlign: "center",
        fontFamily: "var(--font-plus-jakarta-sans), sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          fontWeight: 800,
          color: "#52110c",
          marginBottom: "12px",
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#2b1210",
          marginBottom: "12px",
        }}
      >
        Page Not Found
      </h2>
      <p
        style={{
          fontSize: "14px",
          color: "#6b5551",
          maxWidth: "400px",
          marginBottom: "24px",
        }}
      >
        Sorry, we couldn&apos;t find the page you were looking for. Please check the URL or head back home.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffca0f",
          color: "#52110c",
          padding: "12px 24px",
          borderRadius: "8px",
          fontWeight: 700,
          fontSize: "14px",
          textDecoration: "none",
        }}
      >
        Return to Home
      </Link>
    </div>
  );
}

