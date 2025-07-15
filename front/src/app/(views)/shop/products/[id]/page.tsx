import React from "react";
import ProductDetailClient from "@/components/Products/ProductDetailClient";
import api from "@/lib/axiosInstance";
import { redirect } from "next/navigation";
import { Breadcrumb } from "@/components/BreadCrumb/BreadCrumb";
import { routes } from "@/app/routes";
import { Params } from "@/interfaces/index";


async function getSizes() {
  try {
    const res = await api.get("/sizes", {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data ?? [];
  } catch (err) {
    console.error("Error al obtener sizes:", err);
    return [];
  }
}

async function getColors() {
  try {
    const res = await api.get("/colors", {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data ?? [];
  } catch (err) {
    console.error("Error al obtener colors:", err);
    return [];
  }
}

async function getProductById(id: string) {
  try {
    const res = await api.get(`/products/${id}`, {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data ?? null;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return null;
  }
}

const ProductDetailPage = async ({ params }: { params: Params }) => {
  const id = (await params as any)?.id;


  const [sizes, colors, product] = await Promise.all([
    getSizes(),
    getColors(),
    getProductById(id),
  ]);

  if (!product) redirect("/404");

  const customItems = [
    { label: "Tienda", href: routes.shop.categories },
    {
      label: product.category?.name ?? "Categoría",
      href: `/shop/categories/${product.category?.slug}`,
    },
    {
      label: product.subCategory?.name ?? "Subcategoría",
      href: `/shop/categories/${product.category?.slug}/${product.subCategory?.slug}`,
    },
    {
      label: product.name,
      current: true,
    },
  ];

  return (
      <div className="mb-4">
        <Breadcrumb customItems={customItems} />
          <ProductDetailClient product={product} sizes={sizes} colors={colors} />
      </div>
  );
};

export default ProductDetailPage;
