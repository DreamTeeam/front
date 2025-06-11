import { ICardProduct } from "@/interfaces";
import Image from "next/image";
import React from "react";
import {ButtonPrimary} from "../Buttons/Buttons";

export const CardProduct: React.FC<ICardProduct> = ({ name, image, price }) => {
    return (
        <div className="w-xs bg-white p-4 text-center border border-gray-300 hover:border-[#6e5cc4] rounded-lg transition-colors duration-300">
            <div className="w-full aspect-square relative overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="max-h-64 aspect-auto object-cover"
                />
            </div>
            <div className="mt-4 text-m font-semibold text-gray-800">
                {name}
            </div>
            <div className="mt-4 flex justify-between items-center text-sm font-semibold text-gray-800">
                <strong>${price}</strong>
                <ButtonPrimary
                    textContent="Comprar"
                />
            </div>
        </div>
    )
}

export default CardProduct;