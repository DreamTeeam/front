"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import { ApiProduct, ICardProduct } from "@/interfaces";
import CardProduct from "@/components/UI/Cards/CardProduct";
import Link from "next/link";
interface ProductListProps {
  category?: string;
  subcategory?: string;
}

const ProductList: React.FC<ProductListProps> = ({ category, subcategory }) => {
  const [products, setProducts] = useState<ICardProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "/products";

    if (category && subcategory) {
      url = `/products/category/${category}/subcategory/${subcategory}`;
    }

    api
      .get(url)
      .then((res) => {
        const fetchedProducts: ApiProduct[] = res.data;

        const mappedProducts: ICardProduct[] = fetchedProducts.map(
          (product: ApiProduct) => {
            const imageUrl =
              product.image ||
              product.variants?.[0]?.image?.[0] ||
              "/notimage.jpg";

            return {
              id: product.id,
              name: product.name,
              image: imageUrl,
              slug:
                product.slug || product.name.toLowerCase().replace(/\s+/g, "-"),
              sale_price: product.sale_price,
            };
          }
        );
        setProducts(mappedProducts);
      })
      .catch((err) => console.error("Error al obtener productos:", err))
      .finally(() => setLoading(false));
  }, [category, subcategory]);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-auto px-4">
      {products.length > 0 ? (
        products.map((product) => (
          <Link href={`/shop/products/${product.id}`} key={product.id}>
            <CardProduct
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              slug={product.slug}
              sale_price={product.sale_price}
            />
          </Link>
        ))
      ) : (
        <div className="w-full h-60 flex justify-center items-center">
          <p className="text-center text-gray-500 text-lg w-full">
            No hay productos disponibles.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
