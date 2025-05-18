import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeftIcon } from "lucide-react";

import { ProductList, ProductListSkeleton } from "../components/product-list";

export const LibraryView = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="w-full border-b bg-[#F4F4F0] p-4">
        <Link prefetch href="/" className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="text font-medium">Continue shopping</span>
        </Link>
      </nav>
      <header className="border-b bg-[#F4F4F0] py-8">
        <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col gap-y-4 px-4 lg:px-12">
          <h1 className="text-[40px] font-medium">Library</h1>
          <p className="font-medium">Your purchases and reviews</p>
        </div>
      </header>
      <section className="mx-auto max-w-(--breakpoint-xl) px-4 py-10 lg:px-12">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </section>
    </div>
  );
};
