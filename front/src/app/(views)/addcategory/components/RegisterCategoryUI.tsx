"use client"
import React, { useRef } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { ButtonAccent } from "../../../../components/ui/Buttons/Buttons";
import toast from "react-hot-toast";
import CloudinaryButton from "../../../../components/ui/Buttons/CloudinaryButton";
import InputFormik from "@/components/ui/Inputs/InputFormik";

const categorySchema = yup.object().shape({
  nombreCategoria: yup
    .string()
    .required("El nombre de la categoría es obligatorio")
    .trim("No se permiten espacios en blanco")
    .min(1, "El nombre de la categoría no puede estar vacío"),

  nombre: yup
    .string()
    .required("La clave es obligatoria")
    .trim("No se permiten espacios en blanco")
    .min(1, "La clave no puede estar vacía"),

  image: yup
    .string()
    .required("La imagen es obligatoria"),
});

const RegisterCategory = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="bg-white rounded-lg shadow-xl pt-30 pb-20 mr-20 ml-85">
      <h2 className="text-2xl font-bold mb-10 pl-38 text-[#4e4090]">
        Registrar nueva Categoria
      </h2>

      <Formik
        initialValues={{
          nombre: "",
          nombreCategoria: "",
          image: "",
        }}
        validationSchema={categorySchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Categoría a registrar:", values);
          // Llamada a api
          toast.success("Categoría registrada correctamente ✅");

          resetForm();

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="w-full max-w-4xl mx-auto px-10">
              <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                <div className="mb-4">
                  <InputFormik
                    name="nombreCategoria"
                    label="Nombre de la Categoria:"
                    type="text"
                    placeholder="Nombre de la Sub-Categoría"
                  />
                </div>
                <div className="mb-4">
                  <InputFormik
                    name="nombre"
                    label="Clave de la Categoria:"
                    type="text"
                    placeholder="Clave de la Categoria"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-md font-semibold text-[#4e4090]">
                    Imagen de la Categoria
                  </label>
                  <CloudinaryButton
                    onUploadSuccess={(url: string) => setFieldValue("image", url)}
                  />
                  {values.image && (
                    <div className="mt-4">
                      <img
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
            </div>

            <div className="flex justify-end mt-6 mr-38">
              <ButtonAccent type="submit" textContent="GUARDAR" />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RegisterCategory;
