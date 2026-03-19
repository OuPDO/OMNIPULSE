import { Montserrat, Merriweather_Sans, Caveat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const merriweatherSans = Merriweather_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-merriweather-sans",
  display: "swap",
});

export const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-caveat",
  display: "swap",
});
