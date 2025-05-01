"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { PriceFilter } from "./price-filter";
import { useProductFilters } from "../../hooks/use-product-filters";

interface ProductFilterProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const ProductFilter = ({ title, className, children }: ProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn("flex flex-col gap-2 border-b p-4", className)}>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-between"
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" />
      </div>
      {isOpen && children}
    </div>
  );
};

export const ProductFilters = () => {
  const [filters, setFilters] = useProductFilters();

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="rounded-md border bg-white">
      <div className="flex items-center justify-between border-b p-4">
        <p className="font-medium">filters</p>
        <button type="button" className="underline" onClick={() => {}}>
          Clear
        </button>
      </div>
      <ProductFilter title="Price">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
    </div>
  );
};
