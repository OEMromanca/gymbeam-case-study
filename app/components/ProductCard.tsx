import { Product } from "../types/types";

type IProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: IProductCardProps) {
  const { image, title, price } = product;

  return (
    <div className="border rounded shadow p-4 hover:shadow-lg transition">
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-contain mb-4"
      />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 font-bold">${price}</p>
    </div>
  );
}
