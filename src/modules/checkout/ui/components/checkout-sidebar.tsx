import { CircleXIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface CheckoutSidebarProps {
  total: number;
  onCheckout: () => void;
  isCanceled?: boolean;
  isPending?: boolean;
}

export const CheckoutSidebar = ({
  total,
  onCheckout,
  isCanceled,
  isPending,
}: CheckoutSidebarProps) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-md border bg-white">
      <div className="flex items-center justify-between border-b p-4">
        <h4 className="text-lg font-medium">Total</h4>
        <p className="text-lg font-medium">{formatCurrency(total)}</p>
      </div>
      <div className="flex items-center justify-center p-4">
        <Button
          variant="elevated"
          size="lg"
          disabled={isPending}
          onClick={onCheckout}
          className="bg-primary hover:text-primary w-full text-base text-white hover:bg-pink-400"
        >
          Checkout
        </Button>
      </div>

      {isCanceled && (
        <div className="flex items-center justify-center border-t p-4">
          <div className="flex w-full items-center gap-x-2 rounded border border-red-400 bg-red-100 px-4 py-3 font-medium">
            <div className="flex items-center">
              <CircleXIcon className="mr-2 size-6 fill-red-500 text-red-100" />
              <span>Checkout failed. Please try again.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
