import "./globals.css";

export const metadata = {
  title: "AI Color Mixing Studio",
  description: "Generate satisfying color mixing videos in 1 minute",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
