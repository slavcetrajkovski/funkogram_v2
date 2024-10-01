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
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const isMaintenancePage = false;

    return (
        <html lang="mk">
        <Head>
            <meta charSet="UTF-8" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta property="og:title" content="Funkogram MK" />
            <meta property="og:description" content="Најголемата продавница за Funko POP! фигури во Македонија" />
            <meta property="og:image" content="/funkogram-cover.png" />
            <meta property="og:url" content="https://funkogram.mk/" />
        </Head>
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
