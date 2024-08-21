import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import DropdownPageSize from "@/components/shared/filter/DropdownPageSize";
import CategoryFilter from "@/components/shared/filter/CategoryFilter";
import ClearFilter from "@/components/shared/filter/ClearFilter";
import SortFilter from "@/components/shared/filter/SortFilter";
import ProductStatusFilter from "@/components/shared/filter/ProductStatusFilter";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ResponsiveFilterMenuProps {
    productsPerPage: number;
    categoryFilter: string;
    sortFilter: string;
    categories: string[];
    productStatusFilter: string;
    productStatus: string[];
    handleProductsPerPageChange: (value: number) => void;
    handleCategoryChange: (value: string) => void;
    handleSortChange: (value: string) => void;
    handleProductStatusChange: (value: string) => void;
    clearFilters: () => void;
}

export default function FilterMenu({
                                       productsPerPage,
                                       categoryFilter,
                                       sortFilter,
                                       categories,
                                       productStatusFilter,
                                       productStatus,
                                       handleProductsPerPageChange,
                                       handleCategoryChange,
                                       handleSortChange,
                                       handleProductStatusChange,
                                       clearFilters,
                                   }: ResponsiveFilterMenuProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const allCategories = ["Сите", ...categories];
    const allProductStatus = ["Сите", ...productStatus];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1280) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <div className="xl:hidden flex justify-center mt-4">
                <button
                    onClick={toggleMenu}
                    className="flex items-center justify-center px-4 py-2 bg-funkogram_red font-bold text-lg text-white rounded"
                >
                    <FontAwesomeIcon icon={faBars as IconProp} className="mr-2" />
                    {isMenuOpen ? "Затвори Филтри" : "Филтрирај"}
                </button>
                {isMenuOpen && (
                    <ClearFilter
                        onClear={clearFilters}
                        position={"ml-4 mt-3"}
                    />
                )}
            </div>
            {isMenuOpen && (
                <div className="flex flex-col items-center justify-center p-4 mt-2 text-black bg-funkogram_red shadow-lg rounded-md w-full max-w-xl space-y-4 mx-auto">
                    <DropdownPageSize
                        options={[40, 52, 64]}
                        value={productsPerPage}
                        onChange={handleProductsPerPageChange}
                    />
                    <ProductStatusFilter
                        options={allProductStatus}
                        value={productStatusFilter}
                        onChange={handleProductStatusChange}
                    />
                    <CategoryFilter
                        options={allCategories}
                        value={categoryFilter}
                        onChange={handleCategoryChange}
                    />
                    <SortFilter
                        options={["Најниска цена", "Највисока цена"]}
                        value={sortFilter}
                        onChange={handleSortChange}
                    />
                </div>
            )}
        </>
    );
}
