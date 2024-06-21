import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TO-DO App / AWS",
  description: "NextJS + Redux + AWS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={nunito.className}>{children}</body>
      </html>
    </StoreProvider>
  );
}
