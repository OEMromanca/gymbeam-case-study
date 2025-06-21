import Link from "next/link";
import { fetchProduct } from "@/app/api/api";
import ProtectedClient from "@/app/components/ProtectedClient";

type Props = {
  params: { id: string };
};

const categoryColors: Record<string, string> = {
  "men's clothing": "bg-blue-600 text-white",
  "women's clothing": "bg-pink-600 text-white",
  electronics: "bg-green-600 text-white",
  jewelery: "bg-yellow-500 text-black",
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await fetchProduct(id);
  const {
    image,
    title,
    description,
    price,
    category,
    rating: { rate, count },
  } = product;

  const categoryColor = categoryColors[category] || "bg-gray-300 text-black";

  return (
    <ProtectedClient>
      <div className="flex flex-col items-center justify-center min-h-full bg-gray-100 px-4 py-8">
        <div className="w-full max-w-2xl mb-6">
          <Link href="/products" className="text-sm hover:underline font-bold">
            ← Späť na produkty
          </Link>
        </div>

        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div className="flex justify-center">
            <img
              src={image}
              alt={title}
              className="w-full max-w-md h-64 object-contain rounded-md"
            />
          </div>

          <div className="text-center">
            <span
              className={`inline-block ${categoryColor} text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide`}
            >
              {category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{title}</h1>
            <p className="text-gray-700 mt-4">{description}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
            <div>
              <p className="text-xl font-bold text-indigo-600">${price}</p>
              <p className="text-sm text-gray-500">Cena s DPH</p>
            </div>

            <div>
              <p className="text-yellow-500 text-lg font-semibold">
                ⭐ {rate} / 5
              </p>
              <p className="text-sm text-gray-500">({count} hodnotení)</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedClient>
  );
}
