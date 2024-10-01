"use client";

import React, { useEffect, useState } from "react";
import { getProductDetails } from "@/service/ProductService";
import { usePathname } from "next/navigation";
import { ProductDto } from "@/model/product/ProductDto";
import ProductDetails from "@/components/product/ProductDetails";
import { Category } from "@/model/category/Category";

export default function ProductPageComponent() {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [product, setProduct] = useState<ProductDto>({
    id: 0,
    name: "",
    imageUrl: new Blob(),
    price: 0,
    stock: 0,
    productStatus: "",
    productType: "",
    deleted: false,
    categories: [] as Category[],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const fetchedProduct = await getProductDetails(Number(id));
          setProduct(fetchedProduct);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  return <ProductDetails product={product} />;
}
