import CatalogLayout from "@/components/catalog/CatalogLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Каталог - Funkogram MK",
    description: "Влези во светот на Funko Pop! фигурите и пронајди го твојот омилен лик од поп-културата.",
    keywords: [
        "funkos", "funkogram", "funko pop", "funko", "Funko POP!", "каталог", "Каталог",
        "НОВО", "ново", "ПРЕДНАРАЧКА", "преднарачка", "ДОСТАПНО", "достапно", "колекционерски фигури", "поп-култура", "pop-culture", "Поп-култура"
    ],
    openGraph: {
        title: "Каталог - Funkogram MK",
        description: "Влези во светот на Funko Pop! фигурите и пронајди го твојот омилен лик од поп-културата. ",
        url: "https://www.funkogram.mk/catalog",
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
    twitter: {
        card: "summary_large_image",
        site: "@funkogram_mk",
        title: "Каталог - Funkogram MK",
        description: "Влези во светот на Funko Pop! фигурите и пронајди го твојот омилен лик од поп-културата.",
        images: [
            {
                url: "/funkogram-logo.png",
                alt: "Funkogram MK Каталог",
            },
        ],
    },
    alternates: {
        canonical: "https://www.funkogram.mk/catalog",
    },
};

export default function Catalog() {
    return <CatalogLayout />;
}
