"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { Button } from "@/components/ui/button";

interface CartButtonProps {
  tenantSlug: string;
  productId: string;
  isPurchased?: boolean;
}

export const CartButton = ({
  tenantSlug,
  productId,
  isPurchased,
}: CartButtonProps) => {
  const cart = useCart(tenantSlug);

  if (isPurchased) {
    return (
      <Button
        variant="elevated"
        className="flex-1 bg-white font-medium"
        asChild
      >
        <Link prefetch href={`/library/${productId}`}>
          View in Library
        </Link>
      </Button>
    );
  }

  return (
    <Button
      variant="elevated"
      className={cn(
        "flex-1 bg-pink-400",
        cart.isProductInCart(productId) && "bg-white",
      )}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};
