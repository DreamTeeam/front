"use client"

import { ICardProduct } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { ButtonPrimary } from "../Buttons/Buttons";
import Link from "next/link";


export const CardProduct: React.FC<ICardProduct> = ({ id, name, image, sale_price }) => {
    const link = `/products/${id}/${encodeURIComponent(name)}`;
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
                <strong className="text-lg">${sale_price}</strong>
                <Link href={link}>
                    <ButtonPrimary textContent="Ver más" />
                </Link>
            </div>
        </div>
    )
}

export default CardProduct;