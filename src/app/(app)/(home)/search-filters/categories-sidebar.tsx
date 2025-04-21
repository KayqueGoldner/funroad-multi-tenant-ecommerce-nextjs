import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { CustomCategory } from "@/app/(app)/(home)/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface CategoriesSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[];
}

export const CategoriesSidebar = ({
  open,
  onOpenChange,
  data,
}: CategoriesSidebarProps) => {
  const [parentCategories, setParentCategories] = useState<
    CustomCategory[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<CustomCategory | null>(null);
  const router = useRouter();

  // if there is a parent category, show the children, otherwise show root categories
  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    setParentCategories(null);
    setSelectedCategory(null);
    onOpenChange(open);
  };

  const handleCategoryClick = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CustomCategory[]);
      setSelectedCategory(category);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`/${selectedCategory.slug}/${category.slug}`);
      } else {
        if (category.slug === "all") {
          router.push("/");
        } else {
          router.push(`/${category.slug}`);
        }
      }

      handleOpenChange(false);
    }
  };

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  };

  const backgroundColor = selectedCategory?.color ?? "white";

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor }}
      >
        <SheetHeader className="border-b p-4">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex h-full flex-col overflow-y-auto pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
            >
              <ChevronLeftIcon className="mr-2 size-4" />
              Back
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              className="flex w-full cursor-pointer items-center justify-between p-4 text-left text-base font-medium hover:bg-black hover:text-white"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
