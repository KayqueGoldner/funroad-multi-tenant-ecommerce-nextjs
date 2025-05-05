import Link from "next/link";

import type { CategoryGetManyOutputSingle } from "@/modules/categories/types";

interface SubcategoryMenuProps {
  category: CategoryGetManyOutputSingle;
  isOpen: boolean;
}

export const SubcategoryMenu = ({ category, isOpen }: SubcategoryMenuProps) => {
  if (
    !isOpen ||
    !category.subcategories ||
    category.subcategories.length === 0
  ) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5";

  return (
    <div
      className="absolute z-100"
      style={{
        top: "100%",
        left: 0,
      }}
    >
      {/* invisible bridge to maintain hover */}
      <div className="h-3 w-60" />
      <div
        className="w-60 -translate-x-0.5 -translate-y-0.5 overflow-hidden rounded-md border text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
        style={{ backgroundColor }}
      >
        <div>
          {category.subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className="flex w-full items-center justify-between p-4 text-left font-medium underline hover:bg-black hover:text-white"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
