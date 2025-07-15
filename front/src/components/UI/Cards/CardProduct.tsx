"use client";

import Image from "next/image";
import { ButtonPrimary } from "../Buttons/Buttons";
import { ICardProduct } from "@/interfaces";

export const CardProduct: React.FC<ICardProduct> = ({
  name,
  image,
  sale_price,
}) => {
  return (
    // 1. Estructura Flexible: h-full y flex-col aseguran que todas las tarjetas
    //    en una misma fila tengan la misma altura, sin importar el contenido.
    <div className="h-full flex flex-col bg-white p-4 border border-gray-200 rounded-lg transition-all duration-300 group hover:border-primary">
      {/* Contenedor de la imagen */}
      <div className="w-full aspect-square relative overflow-hidden rounded-md">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            // 2. Optimización de Imagen: object-cover asegura que la imagen llene el espacio
            //    sin deformarse. La clase 'group-hover:scale-105' añade un sutil zoom.
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded-md">
            Sin imagen
          </div>
        )}
      </div>

      {/* Contenedor del contenido que crece para empujar el pie de la tarjeta hacia abajo */}
      <div className="flex flex-col flex-grow mt-4">
        {/* 3. Manejo de Nombres Largos: 'truncate' evita que nombres muy largos rompan
            el layout, añadiendo "..." al final. El 'title' muestra el nombre completo al pasar el mouse. */}
        <h3 className="text-base font-semibold text-gray-800 truncate uppercase" title={name}>
          {name}
        </h3>

        {/* Pie de la tarjeta: mt-auto lo empuja hacia el fondo */}
        <div className="mt-auto flex justify-between items-center pt-3">
          <strong className="text-xl text-primary font-bold">${sale_price}</strong>
          {/* El botón podría ser un Link o un botón que añade al carrito */}
          <ButtonPrimary textContent="Ver más" />
        </div>
      </div>
    </div>
  );
};

export default CardProduct;