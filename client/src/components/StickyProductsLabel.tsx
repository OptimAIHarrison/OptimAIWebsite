import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";

export function StickyProductsLabel() {
  return (
    <>
      {/* Desktop Version - Reduced bottom padding */}
      <Link href="/products">
        <div className="hidden lg:block fixed right-8 top-[88px] z-40 cursor-pointer">
          <div className="bg-brand-gradient text-white font-medium text-sm px-4 py-4 pt-6 pb-4 rounded-b-md rounded-t-none hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl">
            <ShoppingCart size={18} />
            READY TO GO PRODUCTS
          </div>
        </div>
      </Link>

      {/* Mobile version: compact pill, bottom-left, so it never covers page content */}
      <Link href="/products">
        <div className="lg:hidden fixed left-4 bottom-4 z-40 cursor-pointer">
          <div className="bg-brand-gradient text-white font-medium text-sm px-4 py-3 rounded-full flex items-center gap-2 shadow-lg">
            <ShoppingCart size={16} />
            Ready-to-go products
          </div>
        </div>
      </Link>
    </>
  );
}
