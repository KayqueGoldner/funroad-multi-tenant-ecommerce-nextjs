"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { useProductFilters } from "../../hooks/use-product-filters";

interface ProductListProps {
  category?: string;
}

export const ProductList = ({ category }: ProductListProps) => {
  const [filters] = useProductFilters();

  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category,
      ...filters,
    }),
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {data?.docs.map((product) => (
        <div key={product.id} className="rounded-md border bg-white p-4">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export const ProductListSkeleton = () => {
  return <div>Loading...</div>;
};
