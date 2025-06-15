"use client";

import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { ButtonAccent } from "@/components/ui/Buttons/Buttons";
import CloudinaryButton from "@/components/ui/Buttons/CloudinaryButton";
import InputFormik from "@/components/ui/Inputs/InputFormik";
import Image from "next/image";

const Select = dynamic(() => import("react-select"), { ssr: false });

type OptionType = {
  value: string;
  label: string;
};

const subCategoriaOptions = [
  { value: "trekking", label: "Trekking" },
  { value: "urbanas", label: "Urbanas" },
];

const brandSchema = yup.object().shape({
  nombreMarca: yup
    .string()
    .required("El nombre de la marca es obligatorio")
    .trim("No se permiten espacios en blanco")
    .min(1, "El nombre de la marca no puede estar vacío"),

  nombre: yup
    .string()
    .required("La clave es obligatoria")
    .trim("No se permiten espacios en blanco")
    .min(1, "La clave no puede estar vacía"),

  subCategoria: yup
    .array()
    .min(1, "Selecciona al menos una Sub-Categoría")
    .of(yup.string().required()),

  image: yup
    .string()
    .required("La imagen es obligatoria"),
});

const RegisterBrand = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<OptionType[]>([]);

  return (
    <section className="bg-white rounded-lg shadow-xl pt-30 pb-20 mr-20 ml-85">
      <h2 className="text-2xl font-bold mb-10 pl-10 text-[#4e4090]">
        Registrar nueva Marca
      </h2>

      <Formik
        initialValues={{
          nombreMarca: "",
          nombre: "",
          image: "",
          subCategoria: [],
        }}
        validationSchema={brandSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Marca a registrar:", values);
          // Llamada a api
          toast.success("Marca registrada correctamente ✅");

          resetForm();
          setSelectedSubCategory([]);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto px-10">
              <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                <div className="mb-4">
                  <InputFormik
                    name="nombreMarca"
                    label="Nombre de la Marca:"
                    type="text"
                    placeholder="Nombre de la Marca"
                  />
                </div>

                <div className="mb-4">
                  <InputFormik
                    name="nombre"
                    label="Clave de la Marca:"
                    type="text"
                    placeholder="Clave de la Marca"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-md font-semibold text-[#4e4090]">
                    Imagen de la Marca
                  </label>
                  <CloudinaryButton
                    onUploadSuccess={(url: string) => setFieldValue("image", url)}
                  />
                  {values.image && (
                    <div className="mt-4">
                      <Image
                        src={values.image}
                        alt="Preview"
                        className="w-40 h-40 object-cover border rounded"
                      />
                    </div>
                  )}
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                <div className="mb-4">
                  <label className="block text-md font-semibold text-[#4e4090]">
                    Sub-Categoría
                  </label>
                  <Select
                    isMulti
                    name="subCategoria"
                    options={subCategoriaOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={selectedSubCategory}
                    onChange={(newValue: any) => {
                      setSelectedSubCategory(newValue); 
                      const values = newValue ? newValue.map((option: OptionType) => option.value) : [];
                      setFieldValue("subCategoria", values); 
                    }}
                  />
                  <ErrorMessage
                    name="subCategoria"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 mr-10">
              <ButtonAccent type="submit" textContent="GUARDAR" />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RegisterBrand;