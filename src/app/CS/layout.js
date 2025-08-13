import { Geist, Geist_Mono } from "next/font/google";
import AdminRouteProtect from "../components/adminProtected"
import ScrollToTop from "@/app/components/ScrollToTop"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Color Sense Salon",
  description: "Best Unisex Salon in Garhshankar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > 
        <ScrollToTop/>
        <AdminRouteProtect>
          {children}
        </AdminRouteProtect>
      </body>
    </html>
  );
}
