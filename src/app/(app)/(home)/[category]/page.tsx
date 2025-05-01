import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { ProductFilters } from "@/modules/products/ui/components/product-filters";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { category } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col gap-4 px-4 py-8 lg:px-12">
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-6 xl:grid-cols-8">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>
          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList category={category} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default CategoryPage;
