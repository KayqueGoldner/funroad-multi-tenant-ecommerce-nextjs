import Link from "next/link";

import { generateTenantURL } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  slug: string;
}

export const Navbar = ({ slug }: NavbarProps) => {
  return (
    <nav className="h-20 border-b bg-white font-medium">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 lg:px-12">
        <p className="text-xl">Checkout</p>

        <Button variant="elevated" asChild>
          <Link href={generateTenantURL(slug)}>Continue Shopping</Link>
        </Button>
      </div>
    </nav>
  );
};
