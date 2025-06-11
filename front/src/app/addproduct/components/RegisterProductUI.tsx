"use client"
import React from "react";
import { ButtonAccent } from "../../../components/UI/Buttons/Buttons";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";

// Validaciones con Yup
const productoSchema = yup.object().shape({
    nombre: yup.string().required("Requerido"),
    descripcion: yup.string().max(300, "Máx. 300 caracteres"),
    precioCompra: yup.number().typeError("Debe ser número").required("Requerido"),
    stock: yup.number().typeError("Debe ser número").min(0, "No negativo").required("Requerido"),
    categoria: yup.string().required("Selecciona una categoría"),
    subcategoria: yup.string().required("Selecciona una Sub-Categoría"),
    marca: yup.string().required("Selecciona una marca"),
    unidaddemedida: yup.string().required("Selecciona una unidad"),
    image: yup.mixed().nullable(),
});

const RegisterProduct = () => {
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
                    image: null,
                }}
                validationSchema={productoSchema}
                onSubmit={(values) => {
                    console.log("Producto a registrar:", values);
                }}
            >
                {({ setFieldValue }) => (
                   <Form>
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto px-10">

              <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                <label className="block text-md font-semibold text-[#4e4090]">Nombre del Producto:</label>
                <Field name="nombre" className="w-full border border-gray-300 rounded p-2" />
                <ErrorMessage name="nombre" component="div" className="text-red-500 text-sm mb-2" />

                <label className="block text-md font-semibold text-[#4e4090] mt-4">Descripción:</label>
                <Field name="descripcion" className="w-full border border-gray-300 rounded p-2" />
                <ErrorMessage name="descripcion" component="div" className="text-red-500 text-sm mb-2" />

                <label className="block text-md font-semibold text-[#4e4090] mt-4">Precio de Compra:</label>
                <Field name="precioCompra" type="number" className="w-full border border-gray-300 rounded p-2" />
                <ErrorMessage name="precioCompra" component="div" className="text-red-500 text-sm mb-2" />

                <label className="block text-md font-semibold text-[#4e4090] mt-4">Stock Inicial:</label>
                <Field name="stock" type="number" className="w-full border border-gray-300 rounded p-2" />
                <ErrorMessage name="stock" component="div" className="text-red-500 text-sm mb-2" />

                <label className="block text-md font-semibold text-[#4e4090] mt-4">Imagen:</label>
                <input
                  name="image"
                  type="file"
                  className="w-full border border-gray-300 rounded p-2"
                  onChange={(e) => setFieldValue("image", e.target.files?.[0])}
                />
              </div>

              <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                <label className="block text-md font-semibold text-[#4e4090]">Categoría</label>
                <Field as="select" name="categoria" className="w-full border border-gray-300 rounded p-2">
                  <option value="">Seleccionar categoría</option>
                  <option value="zapatillas">Zapatillas</option>
                  <option value="botas">Botas</option>
                  <option value="sandalias">Sandalias</option>
                </Field>
                <ErrorMessage name="categoria" component="div" className="text-red-500 text-sm mb-2" />

                <label className="block text-md font-semibold text-[#4e4090] mt-4">Sub-Categoría</label>
                <Field as="select" name="subcategoria" className="w-full border border-gray-300 rounded p-2">
                  <option value="">Seleccionar Sub-Categoría</option>
                  <option value="trekking">Trekking</option>
                  <option value="urbanas">Urbanas</option>
                </Field>
                <ErrorMessage name="subcategoria" component="div" className="text-red-500 text-sm mb-2" />

                <label className="block text-md font-semibold text-[#4e4090] mt-4">Marca</label>
                <Field as="select" name="marca" className="w-full border border-gray-300 rounded p-2">
                  <option value="">Seleccionar marca</option>
                  <option value="nike">Nike</option>
                  <option value="adidas">Adidas</option>
                  <option value="puma">Puma</option>
                </Field>
                <ErrorMessage name="marca" component="div" className="text-red-500 text-sm mb-2" />

                <label className="block text-md font-semibold text-[#4e4090] mt-4">Unidad de Medida</label>
                <Field as="select" name="unidaddemedida" className="w-full border border-gray-300 rounded p-2">
                  <option value="">Seleccionar unidad</option>
                  <option value="36">36</option>
                  <option value="39">39</option>
                  <option value="42">42</option>
                </Field>
                <ErrorMessage name="unidaddemedida" component="div" className="text-red-500 text-sm mb-2" />
              </div>
            </div>

            <div className="flex justify-end mt-6 mr-10">
              <ButtonAccent textContent="GUARDAR" />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default RegisterProduct;