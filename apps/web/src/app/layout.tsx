import type { Metadata } from "next";
import { montserrat, merriweatherSans, caveat } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OMNIPULSE | ObladenMedia",
    template: "%s | OMNIPULSE",
  },
  description: "Die zentrale Plattform für digitales Agenturmanagement von ObladenMedia.",
  metadataBase: new URL("https://omnipulse.oblm.de"),
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "OMNIPULSE",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${montserrat.variable} ${merriweatherSans.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
