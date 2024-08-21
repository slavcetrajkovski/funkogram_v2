"use client";

import {useEffect, useState} from "react";
import {useRouter, usePathname, useSearchParams} from "next/navigation";
import {getAllProducts} from "@/service/ProductService";
import ProductCard from "@/components/product/ProductCard";
import {ProductDto} from "@/model/product/ProductDto";
import {Page} from "@/model/Page";
import Pagination from "@/components/shared/Pagination";
import Spinner from "@/components/shared/Spinner";
import CatalogHeader from "@/components/catalog/CatalogHeader";
import {getAllCategories} from "@/service/CategoryService";

export default function CatalogLayout() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [products, setProducts] = useState<ProductDto[]>([]);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(parseInt(searchParams.get('page') as string) || 0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [productsPerPage, setProductsPerPage] = useState<number>(parseInt(searchParams.get('pageSize') as string) || 40);
    const [searchFilter, setSearchFilter] = useState(searchParams.get('searchFilter') || "");
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);
    const [sortFilter, setSortFilter] = useState<string>("");
    const [productStatusFilter, setProductStatusFilter] = useState<string>("");
    const [productStatus, setProductStatus] = useState<string[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response: Page<ProductDto> = await getAllProducts(currentPage,
                    productsPerPage, searchFilter, categoryFilter, sortFilter, productStatusFilter);
                setProducts(response.content);
                setTotalProducts(response.totalElements);
                setTotalPages(response.totalPages);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch products");
                setLoading(false);
            }
        };

        fetchProducts();
    }, [currentPage, productsPerPage, searchFilter, categoryFilter, sortFilter, productStatusFilter]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories();
                setCategories(response);
                setProductStatus(  ["NEW_ARRIVAL", "PREORDER", "IN_STOCK"])
            } catch (error) {
                setError("Failed to fetch categories");
            }
        }

        fetchCategories().then((r) => r);
    }, []);

    useEffect(() => {
        const pageParam = parseInt(searchParams.get('page') as string) || 0;
        setCurrentPage(pageParam);
        setSearchFilter(searchParams.get("searchFilter") || "");
        // setProductStatus(searchParams.get("productStatusFilter") || "");
    }, [searchParams]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('page', page.toString());
        router.push(`${pathname}?${newParams.toString()}`);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleProductsPerPageChange = (value: number) => {
        setProductsPerPage(value);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('pageSize', value.toString());
        router.push(`${pathname}?${newParams.toString()}`);
    };

    const handleCategoryChange = (value: string) => {
        setCategoryFilter(value);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('categoryFilter', value.toString());
        router.push(`${pathname}?${newParams.toString()}`);
    };

    const handleSortChange = (value: string) => {
        setSortFilter(value);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sortFilter', value.toString());
        router.push(`${pathname}?${newParams.toString()}`);
    }

    const handleProductStatusChange = (value: string) => {
        setProductStatusFilter(value);
        const newParams = new URLSearchParams(searchParams);
        newParams.set('productStatus', value.toString());
        router.push(`${pathname}?${newParams.toString()}`);
    }

    const clearFilters = () => {
        setCategoryFilter("");
        setSearchFilter("");
        setSortFilter("");
        setCurrentPage(0);
        setProductStatusFilter("");
        setProductsPerPage(40);

        const newParams = new URLSearchParams(searchParams);
        newParams.delete('categoryFilter');
        newParams.delete('searchFilter');
        newParams.delete('sortFilter');
        newParams.delete('page');
        newParams.delete('pageSize')
        newParams.delete('productStatus');
        router.push(`${pathname}?${newParams.toString()}`);
    };
    return (
        <div className="min-h-screen bg-yellow-700">
            <CatalogHeader
                totalProducts={totalProducts}
                productsPerPage={productsPerPage}
                categoryFilter={categoryFilter}
                sortFilter={sortFilter}
                productStatusFilter={productStatusFilter}
                categories={categories}
                productStatus={productStatus}
                clearFilters={clearFilters}
                handleProductsPerPageChange={handleProductsPerPageChange}
                handleCategoryChange={handleCategoryChange}
                handleSortChange={handleSortChange}
                handleProductStatusChange={handleProductStatusChange}
            />
            <div className="flex justify-center mt-6">
                {loading ? (
                    <Spinner position={`mt-10`}/>
                ) : (
                    <div
                        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-6">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product}/>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-center mt-6">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}
