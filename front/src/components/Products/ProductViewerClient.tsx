"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import toast from "react-hot-toast";
import { ButtonPrimary } from "../UI/Buttons/Buttons";

interface VariantSize {
  size_id: string;
  stock: number;
}

export interface Variant {
  id: string;
  image: string[];
  color_id: string;
  description: string;
  variantSizes: VariantSize[];
}

interface Props {
  product: {
    name: string;
    description: string;
    sale_price: number;
  };
  variants: Variant[];
  getColorLabel: (id: string) => string;
  getColorHexCode: (id: string) => string;
  getSizeLabel: (id: string) => string;
}

const ProductViewerClient: React.FC<Props> = ({
  product,
  variants,
  getColorLabel,
  getColorHexCode,
  getSizeLabel,
}) => {
  const addItem = useCartStore((state) => state.addItem);

  const [activeColor, setActiveColor] = useState<string>(variants[0]?.color_id || "");
  const [selectedImage, setSelectedImage] = useState<string>(variants[0]?.image?.[0] || "/placeholder-image.jpg");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const currentVariant = variants.find(v => v.color_id === activeColor) || variants[0];

  useEffect(() => {
    if (currentVariant && !currentVariant.image.includes(selectedImage)) {
      setSelectedImage(currentVariant.image[0] || "/placeholder-image.jpg");
    }
  }, [activeColor]);

  const handleColorClick = (colorId: string) => {
    const found = variants.find(v => v.color_id === colorId);
    if (found) {
      setActiveColor(colorId);
      setSelectedImage(found.image[0] || "/placeholder-image.jpg");
      setSelectedSizes([]);
    }
  };

  

  const toggleSize = (sizeId: string) => {
    setSelectedSizes(prev =>
      prev.includes(sizeId)
        ? prev.filter(id => id !== sizeId)
        : [...prev, sizeId]
    );
  };

  const handleAddToCart = () => {
    if (!currentVariant || selectedSizes.length === 0) {
      toast.error("Seleccioná al menos un talle.");
      return;
    }

    selectedSizes.forEach(sizeId => {
      const stockObj = currentVariant.variantSizes.find(vs => vs.size_id === sizeId);
      if (!stockObj) return;

      const itemId = `${product.name}-${currentVariant.color_id}-${sizeId}`;

      addItem({
        id: itemId,
        idVariant: currentVariant.id,
        // variant_product_id: currentVariant.id,
        sizeId: sizeId, // ""
        name: `${product.name} - ${getColorLabel(currentVariant.color_id)} - ${getSizeLabel(sizeId)}`,
        price: product.sale_price,
        quantity: 1,
        stock: stockObj.stock,
      });
    });

    toast.success("Producto agregado al carrito");
    setSelectedSizes([]);
  };

  if (!variants || variants.length === 0) {
    return <p className="text-center text-red-500 font-semibold">No hay variantes disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 lg:gap-16">
      {/* Miniaturas */}
      <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-visible">
        {currentVariant.image.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(img)}
            className={`w-20 h-20 sm:w-24 sm:h-24 relative rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer 
              ${img === selectedImage ? "border-primary-500 ring-2 ring-primary-500 ring-offset-2" : "border-gray-300 hover:border-gray-400"}`}
          >
            <Image src={img} alt={`Variante ${idx}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Detalles del producto */}
      <div className="flex flex-col gap-4">
        <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden shadow-md border">
          <Image src={selectedImage} alt={product.name} fill className="object-cover" />
        </div>

        <h1 className="text-3xl font-bold text-secondary">{product.name}</h1>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-2xl font-semibold text-primary">${product.sale_price}</p>

        {/* Colores */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">
            Color: <span className="font-normal text-gray-600">{getColorLabel(activeColor)}</span>
          </h3>
          <div className="flex flex-wrap gap-3">
            {Array.from(new Set(variants.map(v => v.color_id))).map(colorId => (
              <button
                key={colorId}
                onClick={() => handleColorClick(colorId)}
                className={`w-10 h-10 rounded-full border-2 transition duration-200 
                  ${colorId === activeColor ? "border-primary-500 ring-2 ring-primary-500 ring-offset-2" : "border-gray-300 hover:border-gray-400"}`}
                style={{ backgroundColor: getColorHexCode(colorId) }}
                title={getColorLabel(colorId)}
              />
            ))}
          </div>
        </div>

        {/* Talles */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 mt-4">Talles y Stock:</h3>
          <div className="flex flex-wrap gap-2">
            {currentVariant.variantSizes.map(vs => {
              const isOutOfStock = vs.stock <= 0;
              const isSelected = selectedSizes.includes(vs.size_id);

              return (
                <button
                  key={vs.size_id}
                  type="button"
                  onClick={() => !isOutOfStock && toggleSize(vs.size_id)}
                  className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200
                    ${isSelected
                      ? "bg-primary text-white border-primary"
                      : isOutOfStock
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200 line-through"
                        : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 cursor-pointer"
                    }`}
                  disabled={isOutOfStock}
                >
                  {getSizeLabel(vs.size_id)}{" "}
                  <span className="ml-1 text-sm opacity-80">(Stock: {vs.stock})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Botón */}
        <ButtonPrimary
          onClick={handleAddToCart}
          className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-secondary transition-all duration-300"
          textContent="Añadir al carrito"
        />
      </div>
    </div>
  );
};

export default ProductViewerClient;