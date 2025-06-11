import React, { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent: string
}

export const ButtonPrimary: FC<ButtonProps> = ({ textContent, ...props }) => {
	return (
		<button{...props}
			className="text-sm rounded-lg bg-primary py-1 px-4 text-white hover:bg-[#4e4090] transition-colors cursor-pointer"
		>{textContent}</button>
	)
};

export const ButtonSecondary: FC<ButtonProps> = ({ textContent, ...props }) => {
	return (
		<button{...props}
			className="text-sm rounded-lg bg-secondary py-1 px-4 text-white hover:bg-[#0d0d0d] transition-colors cursor-pointer"
		>{textContent}</button>
	)
};

export const ButtonAccent: FC<ButtonProps> = ({ textContent, ...props }) => {
	return (
		<button{...props}
			className="text-sm rounded-lg bg-accent py-2 px-2 text-white hover:bg-[#0d0d0d] transition-colors cursor-pointer"
		>{textContent}</button>
	)
};
