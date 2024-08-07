import DropdownPageSize from "@/components/shared/filter/DropdownPageSize";
import CategoryFilter from "@/components/shared/filter/CategoryFilter";
import ClearFilter from "@/components/shared/filter/ClearFilter";
import SortFilter from "@/components/shared/filter/SortFilter";

interface CatalogHeaderProps {
    totalProducts: number;
    productsPerPage: number;
    categoryFilter: string;
    sortFilter: string;
    categories: string[];
    handleProductsPerPageChange: (value: number) => void;
    handleCategoryChange: (value: string) => void;
    handleSortChange: (value: string) => void;
    clearFilters: () => void;
}

export default function CatalogHeader({totalProducts,
                                          productsPerPage,
                                          handleProductsPerPageChange,
                                          handleCategoryChange,
                                          handleSortChange,
                                          categoryFilter,
                                          sortFilter,
                                          categories,
                                          clearFilters,}: CatalogHeaderProps) {
    const allCategories = ["Сите", ...categories];

    return (
        <div className="flex mx-14 pt-10">
            <h1 className="text-2xl text-black font-bold">
                <span className="text-funkogram_red">{totalProducts}</span> Funko POP! фигури
            </h1>
            <div className="ml-auto flex items-center space-x-6 text-black">
                <ClearFilter onClear={clearFilters} />
                <DropdownPageSize
                    options={[40, 52, 64]}
                    value={productsPerPage}
                    onChange={handleProductsPerPageChange}
                />
                <CategoryFilter
                    options={allCategories}
                    value={categoryFilter}
                    onChange={handleCategoryChange}
                />
                <SortFilter
                    options={["Најниска цена", "Највисока цена"]}
                    value={sortFilter}
                    onChange={handleSortChange}/>
            </div>
        </div>
    )
}