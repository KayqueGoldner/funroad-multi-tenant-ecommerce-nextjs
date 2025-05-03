"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { useProductFilters } from "../../hooks/use-product-filters";

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="flex items-center gap-x-2">
      <Button
        variant="secondary"
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "curated" &&
            "hover:border-border border-transparent bg-transparent hover:bg-transparent",
        )}
        onClick={() => setFilters({ sort: "curated" })}
      >
        Curated
      </Button>
      <Button
        variant="secondary"
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "trending" &&
            "hover:border-border border-transparent bg-transparent hover:bg-transparent",
        )}
        onClick={() => setFilters({ sort: "trending" })}
      >
        Trending
      </Button>
      <Button
        variant="secondary"
        size="sm"
        className={cn(
          "rounded-full bg-white hover:bg-white",
          filters.sort !== "hot_and_new" &&
            "hover:border-border border-transparent bg-transparent hover:bg-transparent",
        )}
        onClick={() => setFilters({ sort: "hot_and_new" })}
      >
        Hot & New
      </Button>
    </div>
  );
};
