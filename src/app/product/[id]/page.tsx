import ProductPageComponent from "@/components/product/ProductPageComponent";
import { Metadata } from "next";
import { getProductDetails } from "@/service/ProductService";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const product = await getProductDetails(Number(params.id));

    const imageUrl = `data:image/jpeg;base64,${product.imageUrl}`;

    return {
        title: `${product.name} - Funkogram MK`,
        description: `Најди го ${product.name} ексклузивно на Funkogram MK. Уживај во изборот од различни категории од поп-културата: ${product.categories.map(c => c.name).join(", ")}.`,
        keywords: [product.name, "funkos", "funkogram", "funko pop", "funko", "Funko", "Funko POP!", ...product.categories.map(c => c.name)],
        openGraph: {
            title: `${product.name} - Funkogram MK`,
            description: `Купи ${product.name} на Funkogram MK.`,
            url: `https://www.funkogram.mk/product/${product.id}`,
            siteName: "Funkogram MK",
            images: [
                {
                    url: imageUrl,
                    width: 800,
                    height: 600,
                    alt: `${product.name} Image`,
                },
            ],
            locale: "mk_MK",
            type: "website",
        },
        alternates: {
            canonical: `https://www.funkogram.mk/product/${product.id}`,
        },
    };
}

export default function ProductPage({ params }: { params: { id: string } }) {
    return <ProductPageComponent productId={params.id} />;
}
