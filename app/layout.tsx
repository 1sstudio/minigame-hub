import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

import type { Metadata } from "next";
import Script from 'next/script';

import TouchWarning from "./components/touchwarning";

export const metadata: Metadata = {
  metadataBase: new URL('https://minigames.dropout.tv'),
  title: {
    default: "Game Changer Minigames!",
    template: "%s | Game Changer Minigames!"
  },
  description: "Interactive Web Stuff from Game Changer Season 7 and More!",
  openGraph: {
    siteName: "Game Changer Minigames",
    url: "https://minigames.dropout.tv/"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://global.ketchcdn.com/web/v3/config/dropout/minigames_site/boot.js" />
        <link rel="stylesheet" href="https://use.typekit.net/vdb6ymc.css"></link>
      </head>
      <body>
        <TouchWarning></TouchWarning>
        {children}
      </body>
    </html>
  );
}
