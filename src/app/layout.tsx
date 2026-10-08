import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Preloader } from "@/components/Preloader";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AMEC Technology — Engineering Powertrain, Energy & Scalable Technologies",
  description:
    "AMEC Technology develops production-ready systems across electric mobility, renewable energy, and OEM engineering — bridging concepts and deployment through strong engineering fundamentals, validation, and scalable design.",
  icons: {
    icon: "/AMEC_SHIELD.png",
    shortcut: "/AMEC_SHIELD.png",
    apple: "/AMEC_SHIELD.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-bg text-white antialiased">
        <Preloader />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
