import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "SmartBuy – Make Your Membership Pay For Itself",
  description: "Split bulk warehouse purchases with neighbors and save big.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
