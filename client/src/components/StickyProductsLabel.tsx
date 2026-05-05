import { Link } from "wouter";

export function StickyProductsLabel() {
  return (
    <Link href="/products">
      <div className="hidden lg:block fixed right-1/2 translate-x-1/2 top-16 z-40 cursor-pointer">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs px-6 py-2 rounded-b-2xl rounded-t-none hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center whitespace-nowrap">
          READY TO GO PRODUCTS
        </div>
      </div>
    </Link>
  );
}
