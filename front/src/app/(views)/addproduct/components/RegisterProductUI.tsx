"use client";
import React, { useRef } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { ButtonAccent } from "../../../../components/ui/Buttons/Buttons";
import toast from "react-hot-toast";
import CloudinaryButton from "../../../../components/ui/Buttons/CloudinaryButton";
import InputFormik from "@/components/ui/Inputs/InputFormik";
import Image from "next/image";

const productoSchema = yup.object().shape({
  nombre: yup
    .string()
    .required("El nombre es obligatorio")
    .trim("No se permiten espacios en blanco")
    .min(1, "El nombre no puede estar vacío"),

  descripcion: yup
    .string()
    .trim("No se permiten espacios en blanco")
    .max(300, "Máx. 300 caracteres"),

  precioCompra: yup
    .number()
    .typeError("Debe ser un número")
    .required("El precio de compra es obligatorio")
    .moreThan(0, "El precio debe ser mayor a 0"),

  stock: yup
    .number()
    .typeError("Debe ser un número")
    .required("El stock es obligatorio")
    .moreThan(0, "El stock debe ser mayor a 0"),

  categoria: yup
    .string()
    .required("Selecciona una categoría")
    .trim("No se permiten espacios en blanco")
    .min(1, "La categoría no puede estar vacía"),

  subcategoria: yup
    .string()
    .required("Selecciona una Sub-Categoría")
    .trim("No se permiten espacios en blanco")
    .min(1, "La Sub-Categoría no puede estar vacía"),

  marca: yup
    .string()
    .required("Selecciona una marca")
    .trim("No se permiten espacios en blanco")
    .min(1, "La marca no puede estar vacía"),

  unidaddemedida: yup
    .string()
    .required("Selecciona una unidad")
    .trim("No se permiten espacios en blanco")
    .min(1, "La unidad no puede estar vacía"),

  image: yup
    .string()
    .required("La imagen es obligatoria"),
});

const RegisterProduct = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="bg-white rounded-lg shadow-xl pt-30 pb-20 mr-20 ml-85">
      <h2 className="text-2xl font-bold mb-10 pl-10 text-[#4e4090]">
        Registrar nuevo Producto
      </h2>
      <Formik
        initialValues={{
          nombre: "",
          descripcion: "",
          precioCompra: "",
          categoria: "",
          stock: "",
          subcategoria: "",
          marca: "",
          unidaddemedida: "",
          image: "",
        }}
        validationSchema={productoSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Producto a registrar:", values);
          // Llamada a api
          toast.success("Producto registrado correctamente");

          resetForm();

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto px-10">
              <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                <InputFormik
                    name="nombre"
                    label="Nombre del Producto:"
                    type="text"
                    placeholder="Nombre del Producto"
                  />

                <InputFormik
                    name="descripcion"
                    label="Descripción:"
                    type="text"
                    placeholder="Descripción del producto"
                  />

                <InputFormik
                    name="precioCompra"
                    label="Precio de Compra:"
                    type="text"
                    placeholder="Ingrese precio"
                  />

                <InputFormik
                    name="stock"
                    label="Stock Inicial:"
                    type="text"
                    placeholder="Ingrese stock"
                  />

                <div>
                  <label className="block text-md font-semibold text-[#4e4090] mt-4">
                    Imagen:
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
                <label className="block text-md font-semibold text-[#4e4090]">
                  Categoría
                </label>
                <Field
                  as="select"
                  name="categoria"
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="zapatillas">Zapatillas</option>
                  <option value="botas">Botas</option>
                  <option value="sandalias">Sandalias</option>
                </Field>
                <ErrorMessage
                  name="categoria"
                  component="div"
                  className="text-red-500 text-sm mb-2"
                />

                <label className="block text-md font-semibold text-[#4e4090] mt-4">
                  Sub-Categoría
                </label>
                <Field
                  as="select"
                  name="subcategoria"
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="">Seleccionar Sub-Categoría</option>
                  <option value="trekking">Trekking</option>
                  <option value="urbanas">Urbanas</option>
                </Field>
                <ErrorMessage
                  name="subcategoria"
                  component="div"
                  className="text-red-500 text-sm mb-2"
                />

                <label className="block text-md font-semibold text-[#4e4090] mt-4">
                  Marca
                </label>
                <Field
                  as="select"
                  name="marca"
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="">Seleccionar marca</option>
                  <option value="nike">Nike</option>
                  <option value="adidas">Adidas</option>
                  <option value="puma">Puma</option>
                </Field>
                <ErrorMessage
                  name="marca"
                  component="div"
                  className="text-red-500 text-sm mb-2"
                />

                <label className="block text-md font-semibold text-[#4e4090] mt-4">
                  Unidad de Medida
                </label>
                <Field
                  as="select"
                  name="unidaddemedida"
                  className="w-full border border-gray-300 rounded p-2"
                >
                  <option value="">Seleccionar unidad</option>
                  <option value="36">36</option>
                  <option value="39">39</option>
                  <option value="42">42</option>
                </Field>
                <ErrorMessage
                  name="unidaddemedida"
                  component="div"
                  className="text-red-500 text-sm mb-2"
                />
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

export default RegisterProduct;
