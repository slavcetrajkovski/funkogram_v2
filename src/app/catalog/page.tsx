import CatalogLayout from "@/components/catalog/CatalogLayout";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Каталог - Funkogram MK",
};

export default function Catalog() {
    return (
        <CatalogLayout />
    );
}