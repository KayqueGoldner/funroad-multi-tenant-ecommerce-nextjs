"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useTRPC } from "@/trpc/client";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";

import { DEFAULT_BG_COLOR } from "../../../constants";
import { SearchInput } from "./search-input";
import { Categories } from "./categories";
import { BreadcrumbNavigation } from "./breadcrumbsnavigation";

export const SearchFilters = () => {
  const [filters, setFilters] = useProductFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions());

  const params = useParams();
  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || "all";
  const activeCategoryData = data.find(
    (category) => category.slug === activeCategory,
  );
  const activeCategoryColor = activeCategoryData?.color || DEFAULT_BG_COLOR;
  const activeCategoryName = activeCategoryData?.name || null;

  const activeSubcategory = params.subcategory as string | undefined;
  const activeSubcategoryName =
    activeCategoryData?.subcategories?.find(
      (subcategory) => subcategory.slug === activeSubcategory,
    )?.name || null;

  return (
    <div
      className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-12"
      style={{
        backgroundColor: activeCategoryColor,
      }}
    >
      <SearchInput
        defaultValue={filters.search}
        onChange={(value: string) => setFilters({ search: value })}
      />
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
      <BreadcrumbNavigation
        activeCategoryName={activeCategoryName}
        activeCategory={activeCategory}
        activeSubcategoryName={activeSubcategoryName}
      />
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-12"
      style={{
        backgroundColor: "#F5F5F5",
      }}
    >
      <SearchInput disabled />
      <div className="hidden lg:block">
        <div className="h-11" />
      </div>
    </div>
  );
};
