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
      .get(`/categories/slug/${categorySlug}`) // ✅ Asegurate de que exista este endpoint
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
    <div className="flex flex-wrap justify-center gap-y-10">
      <div className="w-full mb-2"></div>
      {subcategories.length > 0 ? (
        subcategories.map((subcat, index) => (
          <Link
            href={`/shop/categories/${categorySlug}/${subcat.slug}`}
            key={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4"
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
