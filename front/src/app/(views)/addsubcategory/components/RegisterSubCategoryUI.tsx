"use client";
import React, { useRef } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { ButtonAccent } from "@/components/ui/Buttons/Buttons";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import CloudinaryButton from "../../../../components/ui/Buttons/CloudinaryButton";
import InputFormik from "@/components/ui/Inputs/InputFormik";
import Image from "next/image";

const Select = dynamic(() => import("react-select"), { ssr: false });

type OptionType = {
  value: string;
  label: string;
};

const categoriaOptions = [
  { value: "trekking", label: "Trekking" },
  { value: "urbanas", label: "Urbanas" },
];

// Validación con Yup
const subCategorySchema = yup.object().shape({
  nombreSubCategoria: yup
    .string()
    .required("El nombre de la Sub-Categoria es obligatorio")
    .trim("No se permiten espacios en blanco")
    .min(1, "El nombre no puede estar vacío"),

  nombre: yup
    .string()
    .required("La clave es obligatoria")
    .trim("No se permiten espacios en blanco")
    .min(1, "La clave no puede estar vacía"),

  categoria: yup
    .array()
    .min(1, "Selecciona al menos una categoría")
    .of(yup.string().required()),

  image: yup
    .string()
    .required("La imagen es obligatoria"),
});


const RegisterSubCategory = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedCategoria, setSelectedCategoria] = React.useState<OptionType[]>([]);

  return (
    <section className="bg-white rounded-lg shadow-xl pt-30 pb-20 mr-20 ml-85">
      <h2 className="text-2xl font-bold mb-10 pl-10 text-[#4e4090]">
        Registrar nueva Sub-Categoria
      </h2>

      <Formik
        initialValues={{
          nombreSubCategoria: "",
          nombre: "",
          image: "",
          categoria: [],
        }}
        validationSchema={subCategorySchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Subcategoría a registrar:", values);
          // Llamada a api
          toast.success("Subcategoría registrada correctamente");

          resetForm();
          setSelectedCategoria([]);

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
                    name="nombreSubCategoria"
                    label="Nombre de la Sub-Categoría:"
                    type="text"
                    placeholder="Calzado de Montaña"
                  />
                </div>
                <div className="mb-4">
                  <InputFormik
                    name="nombre"
                    label="Clave de la Sub-Categoría:"
                    type="text"
                    placeholder="Clave de la Sub-Categoría"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-md font-semibold text-[#4e4090]">
                    Imagen de la Sub-Categoría
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
                    Categoría
                  </label>
                  <Select
                    isMulti
                    name="categoria"
                    options={categoriaOptions}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    value={selectedCategoria}
                    onChange={(newValue: any) => {
                      setSelectedCategoria(newValue);
                      const values = newValue ? newValue.map((option: OptionType) => option.value) : [];
                      setFieldValue("categoria", values);
                    }}
                  />
                  <ErrorMessage
                    name="categoria"
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

export default RegisterSubCategory;
