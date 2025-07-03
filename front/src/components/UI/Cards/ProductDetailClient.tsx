"use client";


import ProductViewerClient from "../../Products/ProductViewerClient";
import { Variant } from "../../Products/ProductViewerClient";

interface Product {
  name: string;
  description: string;
  sale_price: number;
  variants: Variant[];
}
interface Size {
    id: string;
    size_us?: number;
    size_eur?: number;
    size_cm?: number;
}
interface Color {
    id: string;
    name: string;
}
interface Props {
    product: Product;
    sizes: Size[];
    colors: Color[];
}


const ProductDetailClient: React.FC<Props> = ({ product, sizes, colors }) => {


    const getSizeLabel = (id: string): string => {
        const size = sizes.find((s) => s.id === id);
        if (!size) return id;
        return [
            size.size_us ? `US: ${size.size_us}` : null,
            size.size_eur ? `EUR: ${size.size_eur}` : null,
            size.size_cm ? `CM: ${size.size_cm}` : null,
        ]
            .filter(Boolean)
            .join(" - ");
    };

    const getColorHexCode = (id: string): string => {
    const color = colors.find((c) => c.id === id);
    // Devuelve un color por defecto si no se encuentra
    return color ? color.name.toLowerCase() : "#cccccc";
};


    const getColorLabel = (id: string): string => {
        const color = colors.find((c) => c.id === id);
        return color ? color.name : id;
    };


    if (!product || !product.variants || product.variants.length === 0) {
        return <p className="text-center text-red-500 font-semibold">No hay productos disponibles.</p>;
    }


    return (
        <div>
            <div className="max-w-6xl mx-auto">
                <ProductViewerClient
                    product={{
                        name: product.name,
                        description: product.description,
                        sale_price: product.sale_price,
                    }}
                    variants={product?.variants ?? []}
                    getColorLabel={getColorLabel}
                    getColorHexCode={getColorHexCode}
                    getSizeLabel={getSizeLabel}
                />
            </div>
        </div>
    );
};


export default ProductDetailClient;