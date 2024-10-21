import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import TopBar from "@/components/shared/Topbar";
import React, { Suspense } from "react";
import Head from "next/head";

const inter = Roboto({ subsets: ["greek"], weight: "400" });


export const metadata: Metadata = {
    title: "Funkogram MK",
    description: "Најголемата продавница за Funko POP! фигури во Македонија",
    keywords: [
        "Funko Pop",
        "фигури",
        "каталог",
        "преднарачки",
        "ПРЕДНАРАЧКИ",
        "НОВО",
        "ДОСТАПНО",
        "Funkogram MK",
        "Funko POP!",
        "funko pop",
        "поп-култура",
        "pop-culture",
        "колекционерски фигури",
    ],
    openGraph: {
        title: "Funkogram MK",
        description: "Влези во светот на Funko Pop! фигурите и пронајди го твојот омилен лик од поп-културата. ",
        url: "https://www.funkogram.mk",
        siteName: "Funkogram MK",
        images: [
            {
                url: "/funkogram-cover.png",
                width: 1200,
                height: 630,
                alt: "Funkogram MK Каталог",
            },
        ],
        locale: "mk_MK",
        type: "website",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const isMaintenancePage = false;

    return (
        <html lang="mk">
        <body className={`${inter.className} bg-yellow-700`}>
        <Suspense>
            {!isMaintenancePage && (
                <>
                    <TopBar />
                    <Navbar />
                </>
            )}
            {children}
        </Suspense>
        </body>
        </html>
    );
}
