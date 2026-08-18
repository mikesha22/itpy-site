import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "ITPY — информатика, которую ты понимаешь";
const description =
  "Личный сайт преподавателя информатики: подготовка к ЕГЭ и ОГЭ, Python и понятные разборы сложных тем.";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host")?.split(",")[0];
  const rawHost = forwardedHost ?? requestHeaders.get("host") ?? "localhost:3000";
  const host = /^[a-z0-9.:-]+$/i.test(rawHost) ? rawHost : "localhost:3000";
  const rawProtocol =
    requestHeaders.get("x-forwarded-proto")?.split(",")[0] ??
    (host.startsWith("localhost") ? "http" : "https");
  const protocol = rawProtocol === "http" ? "http" : "https";
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title,
    description,
    icons: {
      icon: "/itpy-logo.png",
      shortcut: "/itpy-logo.png",
    },
    openGraph: {
      type: "website",
      siteName: "ITPY",
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1680,
          height: 945,
          alt: "ITPY — информатика, которую ты понимаешь",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
