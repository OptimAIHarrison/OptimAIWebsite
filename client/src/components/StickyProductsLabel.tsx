import { Link } from "wouter";

export function StickyProductsLabel() {
  return (
    <Link href="/products">
      <div className="hidden lg:block fixed right-6 top-20 z-40 cursor-pointer">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs px-2 py-12 rounded-b-xl rounded-t-none hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center" style={{
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        }}>
          READY TO GO PRODUCTS
        </div>
      </div>
    </Link>
  );
}
