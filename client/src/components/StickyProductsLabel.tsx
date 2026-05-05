import { Link } from "wouter";

export function StickyProductsLabel() {
  return (
    <Link href="/products">
      <div className="hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-40 cursor-pointer">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base px-3 py-16 rounded-l-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center" style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}>
          READY TO GO PRODUCTS
        </div>
      </div>
    </Link>
  );
}
