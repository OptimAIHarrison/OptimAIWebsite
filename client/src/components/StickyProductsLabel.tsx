import { Link } from "wouter";

export function StickyProductsLabel() {
  return (
    <>
      {/* Desktop Version - Matches "Get Free AI & Automation Audit" button styling */}
      <Link href="/products">
        <div className="hidden lg:block fixed right-8 top-16 z-40 cursor-pointer">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-sm px-4 py-2 rounded-b-md rounded-t-none hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center whitespace-nowrap shadow-lg hover:shadow-xl">
            READY TO GO PRODUCTS
          </div>
        </div>
      </Link>

      {/* Mobile Version - Smaller, positioned at header bottom */}
      <Link href="/products">
        <div className="lg:hidden fixed right-4 top-14 z-40 cursor-pointer">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium text-xs px-3 py-1.5 rounded-b-md rounded-t-none hover:from-purple-700 hover:to-pink-700 transition-all duration-300 flex items-center justify-center whitespace-nowrap shadow-lg">
            READY TO GO
          </div>
        </div>
      </Link>
    </>
  );
}
