"use client";

import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ButtonAccent } from "@/components/UI/Buttons/Buttons";
import CloudinaryButton from "@/components/UI/Buttons/CloudinaryButton";
import InputFormik from "@/components/UI/Inputs/InputFormik";
import Image from "next/image";
import api from '@/lib/axiosInstance'

const Select = dynamic(() => import("react-select"), { ssr: false });

type OptionType = {
  value: string;
  label: string;
};

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

});

const RegisterBrand = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [subCategoryOptions, setSubCategoryOptions] = useState<OptionType[]>(
    []
  );
  const [selectedSubCategory, setSelectedSubCategory] = React.useState<
    OptionType[]
  >([]);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await api.get("/sub-categories");

        const formattedOptions = response.data.map((sub: any) => ({
          value: sub.id,
          label: sub.name,
        }));

        setSubCategoryOptions(formattedOptions);
      } catch (error) {
        console.error("Error al cargar subcategorías:", error);
        toast.error("No se pudieron cargar las subcategorías");
      }
    };

    fetchSubCategories();
  }, []);

  return (
    <div>
      <section >
        <h2 className="text-2xl font-bold mb-10 text-[#4e4090] text-center sm:text-left sm:pl-10">
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
          onSubmit={async (values, { resetForm }) => {
            try {
              console.log("Marca a registrar:", values);

              await api.post("/brands", {
                name: values.nombreMarca,
                key: values.nombre,
                image: values.image,
                subcategories: values.subCategoria,
              });

              toast.success("Marca registrada correctamente");
              resetForm();
              setSelectedSubCategory([]);

              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            } catch (error: any) {
              const errorMessage = error.response?.data?.message || "Ocurrió un error al registrar la marca";
              toast.error(errorMessage);
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="border border-gray-300 flex-1 p-6 sm:p-8 bg-white rounded-lg">
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
                    <label className="block text-md font-semibold text-[#4e4090] mb-2">
                      Imagen de la Marca
                    </label>
                    <CloudinaryButton
                      onUploadSuccess={(url: string) =>
                        setFieldValue("image", url)
                      }
                    />
                      <div className="w-40 h-40 relative border rounded overflow-hidden mt-4">
                        <Image
                          src={values.image}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="border border-gray-300 flex-1 p-6 sm:p-8 bg-white rounded-lg">
                  <div className="mb-4">
                    <label className="block text-md font-semibold text-[#4e4090] mb-2">
                      Sub-Categoría
                    </label>
                    <Select
                      isMulti
                      name="subCategoria"
                      options={subCategoryOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      value={selectedSubCategory}
                      onChange={(newValue: any) => {
                        setSelectedSubCategory(newValue);
                        const values = newValue
                          ? newValue.map((option: OptionType) => option.value)
                          : [];
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

              <div className="flex justify-center lg:justify-end mt-6 mr-10">
                <ButtonAccent type="submit" textContent="GUARDAR" />
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
};

export default RegisterBrand;
