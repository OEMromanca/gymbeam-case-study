import Link from "next/link";
import { fetchProducts } from "../api/api";
import ProtectedClient from "../components/ProtectedClient";
import { IProductsPageProps, Product } from "../types/types";

const categoryColors: Record<string, string> = {
  "men's clothing": "bg-blue-600",
  "women's clothing": "bg-pink-600",
  electronics: "bg-green-600",
  jewelery: "bg-yellow-500",
};

export default async function ProductsPage({
  searchParams,
}: IProductsPageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 6;

  const products: Product[] = await fetchProducts();

  const start = (page - 1) * limit;
  const paginatedProducts = products.slice(start, start + limit);

  const totalPages = Math.ceil(products.length / limit);

  return (
    <ProtectedClient>
      <div className="max-w-7xl mx-auto p-6 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map(
            ({
              id,
              image,
              title,
              description,
              category,
              price,
              rating,
            }: Product) => (
              <Link key={id} href={`/products/${id}`} className="block">
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col h-full">
                  <img
                    src={image}
                    alt={title}
                    className="h-60 w-full object-contain p-4 border-b border-gray-300"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <span
                      className={`text-xs text-white ${
                        categoryColors[category] || "bg-gray-500"
                      } rounded-full px-3 py-1 w-fit mb-2 uppercase`}
                    >
                      {category}
                    </span>
                    <h3 className="text-md font-semibold text-gray-800 line-clamp-2 mb-1">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 flex-grow">
                      {description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-semibold text-violet-700">
                        {price.toFixed(2)} €
                      </span>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span key={i}>
                            {i < Math.round(rating?.rate || 0) ? "★" : "☆"}
                          </span>
                        ))}
                        <span className="text-gray-500 ml-1">
                          ({rating?.count})
                        </span>
                      </div>
                    </div>
                    <button
                      className="mt-4 w-full bg-violet-600 text-white py-2 rounded-md hover:bg-violet-700 transition text-sm cursor-pointer"
                      type="button"
                    >
                      Zobraziť
                    </button>
                  </div>
                </div>
              </Link>
            )
          )}
        </div>

        <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
          {page > 1 && (
            <Link
              href={`/products?page=${page - 1}`}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              ← Predchádzajúca
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === page;
            return (
              <Link
                key={pageNum}
                href={`/products?page=${pageNum}`}
                className={`px-4 py-2 border rounded hover:bg-gray-100 ${
                  isActive ? "bg-violet-600 text-white pointer-events-none" : ""
                }`}
              >
                {pageNum}
              </Link>
            );
          })}

          {page < totalPages && (
            <Link
              href={`/products?page=${page + 1}`}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Ďalšia →
            </Link>
          )}
        </div>
      </div>
    </ProtectedClient>
  );
}
