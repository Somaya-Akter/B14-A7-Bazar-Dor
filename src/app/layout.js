import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToasterProvider from "@/components/ToasterProvider";

export const metadata = {
  title: "বাজার দর | BazarDor",
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর, মূল্য পরিবর্তন এবং বাজারভিত্তিক তথ্য এক নজরে দেখুন।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <Navbar />

        {children}

        <Footer />

        <ToasterProvider />
      </body>
    </html>
  );
}