import { Link } from "wouter";

export function StickyProductsLabel() {
  return (
    <>
      {/* Desktop Version - Larger */}
      <Link href="/products">
        <div className="hidden lg:block fixed right-8 top-20 z-40 cursor-pointer">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm px-6 py-3 rounded-b-xl rounded-t-none hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center whitespace-nowrap shadow-lg hover:shadow-xl">
            READY TO GO PRODUCTS
          </div>
        </div>
      </Link>

      {/* Mobile Version - Smaller */}
      <Link href="/products">
        <div className="lg:hidden fixed right-4 top-14 z-40 cursor-pointer">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs px-3 py-1.5 rounded-b-lg rounded-t-none hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center whitespace-nowrap shadow-lg">
            READY TO GO
          </div>
        </div>
      </Link>
    </>
  );
}
