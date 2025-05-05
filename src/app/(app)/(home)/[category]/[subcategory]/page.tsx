import { SearchParams } from "nuqs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { loadProductFilters } from "@/modules/products/search-params";
import { DEFAULT_LIMIT } from "@/constants";

interface SubcategoryPageProps {
  params: Promise<{
    subcategory: string;
    searchParams: Promise<SearchParams>;
  }>;
}

const SubcategoryPage = async ({ params }: SubcategoryPageProps) => {
  const { subcategory, searchParams } = await params;
  const filters = await loadProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      category: subcategory,
      limit: DEFAULT_LIMIT,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={subcategory} />
    </HydrationBoundary>
  );
};

export default SubcategoryPage;
