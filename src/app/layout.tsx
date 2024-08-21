import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import TopBar from "@/components/shared/Topbar";
import React, {Suspense} from "react";

const inter = Roboto({subsets: ["greek"], weight: "400"});

export const metadata: Metadata = {
    title: "Funkogram MK",
    description: "The biggest shop for Funko Pops in Macedonia.",
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <html>
        <body className={`${inter.className} bg-yellow-700`}>
        <Suspense>
            <TopBar/>
            {/*<Navbar/>*/}
            {children}
        </Suspense>
        </body>
        </html>
    );
}
