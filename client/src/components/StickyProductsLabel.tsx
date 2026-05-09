import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";

export function StickyProductsLabel() {
  return (
    <>
      {/* Desktop Version - Reduced bottom padding */}
      <Link href="/products">
        <div className="hidden lg:block fixed right-8 top-[88px] z-40 cursor-pointer">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm px-4 py-4 pt-6 pb-4 rounded-b-md rounded-t-none hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg hover:shadow-xl">
            <ShoppingCart size={18} />
            READY TO GO PRODUCTS
          </div>
        </div>
      </Link>

      {/* Mobile Version - Text on separate rows */}
      <Link href="/products">
        <div className="lg:hidden fixed right-4 top-[84px] z-40 cursor-pointer">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-[11px] px-2 py-2 pt-3 rounded-b-md rounded-t-none hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex flex-col items-center justify-center gap-2 shadow-lg w-20 h-20">
            <ShoppingCart size={28} className="mt-2" />
            <div className="text-center leading-tight">
              <div>Ready</div>
              <div>To Go</div>
              <div>Products</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
