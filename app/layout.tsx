import Script from "next/script";
import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "AI Webflow Mini",
  description: "Minimal AI-to-Webflow-safe section builder"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
