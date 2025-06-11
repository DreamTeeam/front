import { FieldProps } from "formik";
import React from "react";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  options?: { value: string; label: string }[]; // solo para select
}

const Input: React.FC<FieldProps & InputProps> = ({
  field, 
  form,  
  label,
  type = "text",
  placeholder = "",
  required = false,
  options = [],
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={field.name} className="block text-md font-semibold text-[#4e4090]">
          {label}
        </label>
      )}

      {type === "select" ? (
        <select
          id={field.name}
          {...field}
          required={required}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="">Seleccionar una opción</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.name}
          type={type}
          placeholder={placeholder}
          required={required}
          {...field}
          className="w-full px-4 py-2 border-0 border-b-2 border-[#4e4090] focus:outline-none focus:ring-0"
        />
      )}
    </div>
  );
};

export default Input;