import DropdownPageSize from "@/components/shared/filter/DropdownPageSize";
import CategoryFilter from "@/components/shared/filter/CategoryFilter";
import ClearFilter from "@/components/shared/filter/ClearFilter";
import SortFilter from "@/components/shared/filter/SortFilter";
import ProductStatusFilter from "@/components/shared/filter/ProductStatusFilter";
import FilterMenu from "@/components/shared/filter/FilterMenu";
import ProductTypeFilter from "@/components/shared/filter/ProductTypeFilter";

interface CatalogHeaderProps {
    totalProducts: number;
    productsPerPage: number;
    categoryFilter: string;
    sortFilter: string;
    categories: string[];
    productStatusFilter: string;
    productTypeFilter: string;
    productStatus: string[];
    productType: string[];
    handleProductsPerPageChange: (value: number) => void;
    handleCategoryChange: (value: string) => void;
    handleSortChange: (value: string) => void;
    handleProductStatusChange: (value: string) => void;
    handleProductTypeChange: (value: string) => void;
    clearFilters: () => void;
}

export default function CatalogHeader({
                                          totalProducts,
                                          productsPerPage,
                                          handleProductsPerPageChange,
                                          handleCategoryChange,
                                          handleSortChange,
                                          handleProductStatusChange,
                                          handleProductTypeChange,
                                          categoryFilter,
                                          sortFilter,
                                          productTypeFilter,
                                          productStatusFilter,
                                          productStatus,
                                          productType,
                                          categories,
                                          clearFilters,
                                      }: CatalogHeaderProps) {
    return (
        <div className="mx-4 xl:flex xl:mx-14 pt-10">
            <FilterMenu
                productsPerPage={productsPerPage}
                categoryFilter={categoryFilter}
                sortFilter={sortFilter}
                productTypeFilter={productTypeFilter}
                categories={categories}
                productStatusFilter={productStatusFilter}
                productStatus={productStatus}
                handleProductsPerPageChange={handleProductsPerPageChange}
                handleCategoryChange={handleCategoryChange}
                handleSortChange={handleSortChange}
                handleProductStatusChange={handleProductStatusChange}
                handleProductTypeChange={handleProductTypeChange}
                productType={productType}
                clearFilters={clearFilters}
            />
            <h1 className="text-xl xl:text-2xl text-black font-bold mt-4 xl:mt-0">
                <span className="text-funkogram_red">{totalProducts}</span> Funko POP! фигури
            </h1>
            <div className="hidden xl:flex xl:ml-auto xl:items-center xl:space-x-6 xl:text-black">
                <ClearFilter onClear={clearFilters}/>
                <DropdownPageSize
                    options={[40, 52, 64]}
                    value={productsPerPage}
                    onChange={handleProductsPerPageChange}
                />
                <ProductStatusFilter
                    options={["Сите", ...productStatus]}
                    value={productStatusFilter}
                    onChange={handleProductStatusChange}
                />
                <CategoryFilter
                    options={["Сите", ...categories]}
                    value={categoryFilter}
                    onChange={handleCategoryChange}
                />
                <SortFilter
                    options={["Најниска цена", "Највисока цена"]}
                    value={sortFilter}
                    onChange={handleSortChange}
                />
                <ProductTypeFilter
                    options={["Сите", ...productType]}
                    value={productTypeFilter}
                    onChange={handleProductTypeChange}
                />
            </div>
        </div>
    );
}
