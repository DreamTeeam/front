"use client";

import { useEffect, useState } from "react";
import { ICard } from "@/interfaces";
import api from "@/lib/axiosInstance";
import CardCategory from "@/components/UI/Cards/CardCategory";
import Link from "next/link";

interface Props {
  categorySlug: string;
}

const SubcategoryList: React.FC<Props> = ({ categorySlug }) => {
  const [subcategories, setSubcategories] = useState<ICard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/categories/slug/${categorySlug}`)
      .then((res) => setSubcategories(res.data.subcategories || []))
      .catch((err) => {
        console.error("Error al obtener subcategorías:", err);
        setSubcategories([]);
      })
      .finally(() => setLoading(false));
  }, [categorySlug]);

  if (loading)
    return <p className="text-center mt-10">Cargando subcategorías...</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mx-auto px-4">
      {subcategories.length > 0 ? (
        subcategories.map((subcat, index) => (
          <Link
            href={`/shop/categories/${categorySlug}/${subcat.slug}`}
            key={index}
          >
            <CardCategory
              name={subcat.name}
              image={subcat.image}
              slug={subcat.slug}
            />
          </Link>
        ))
      ) : (
        <div className="w-full h-60 flex justify-center items-center">
          <p className="text-center text-gray-500 text-lg w-full">
            No hay subcategorías disponibles.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubcategoryList;
