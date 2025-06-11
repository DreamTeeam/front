"use client"
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { ButtonAccent } from "../../../components/UI/Buttons/Buttons";

// Validación con Yup
const categorySchema = yup.object().shape({
  nombreCategoria: yup
    .string()
    .required("El nombre de la categoria es obligatorio"),
  nombre: yup.string().required("La clave es obligatoria"),
  image: yup.mixed().nullable(),
});

const RegisterCategory = () => {
  return (
    <section className="bg-white rounded-lg shadow-xl pt-30 pb-20 mr-20 ml-85">
      <h2 className="text-2xl font-bold mb-10 pl-38 text-[#4e4090]">
        Registrar nueva Categoria
      </h2>

      <Formik
        initialValues={{
          nombre: "",
          categoria: "",
          image: null,
        }}
        validationSchema={categorySchema}
        onSubmit={(values) => {
          console.log("Categoría a registrar:", values);
          // Aquí iría la lógica para enviar al backend (incluso como FormData si lleva imagen)
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="w-full max-w-4xl mx-auto px-10">
              <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                <div className="mb-4">
                  <label className="block text-md font-semibold text-[#4e4090]">
                    Nombre de la Categoria:
                  </label>
                  <Field
                    name="nombreCategoria"
                    type="text"
                    placeholder="Nombre de la Categoria"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="nombreCategoria"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-md font-semibold text-[#4e4090]">
                    Clave de la Categoria:
                  </label>
                  <Field
                    name="nombre"
                    type="text"
                    placeholder="Clave de la Categoria"
                    className="w-full border border-gray-300 rounded p-2"
                  />
                  <ErrorMessage
                    name="nombre"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-md font-semibold text-[#4e4090]">
                    Imagen de la Categoria
                  </label>
                  <input
                    name="image"
                    type="file"
                    className="w-full border border-gray-300 rounded p-2"
                    onChange={(event) => {
                      const file = event.currentTarget.files?.[0];
                      setFieldValue("image", file);
                    }}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 mr-38">
              <ButtonAccent textContent="GUARDAR" />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RegisterCategory;
