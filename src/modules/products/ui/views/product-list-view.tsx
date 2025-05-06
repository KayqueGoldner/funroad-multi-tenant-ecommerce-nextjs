import { Suspense } from "react";

import { ProductFilters } from "../components/product-filters";
import { ProductList, ProductListSkeleton } from "../components/product-list";
import { ProductSort } from "../components/product-sort";

interface ProductListViewProps {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
}

export const ProductListView = ({
  category,
  tenantSlug,
  narrowView = false,
}: ProductListViewProps) => {
  return (
    <div className="flex flex-col gap-4 px-4 py-8 lg:px-12">
      <div className="flex flex-col justify-between gap-y-2 lg:flex-row lg:items-center lg:gap-y-0">
        <p className="text-2xl font-medium">Curated for you</p>
        <ProductSort />
      </div>

      <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-6 xl:grid-cols-8">
        <div className="lg:col-span-2 xl:col-span-2">
          <ProductFilters />
        </div>
        <div className="lg:col-span-4 xl:col-span-6">
          <Suspense fallback={<ProductListSkeleton narrowView={narrowView} />}>
            <ProductList
              category={category}
              tenantSlug={tenantSlug}
              narrowView={narrowView}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
