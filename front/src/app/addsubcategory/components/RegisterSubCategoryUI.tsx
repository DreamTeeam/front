"use client"
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { ButtonAccent } from "../../../components/UI/Buttons/Buttons";

// Validación con Yup
const subCategorySchema = yup.object().shape({
    nombreSubCategoria: yup
        .string()
        .required("El nombre de la Sub-Categoria es obligatorio"),
    nombre: yup.string().required("La clave es obligatoria"),
    categoria: yup
        .array()
        .min(1, "Selecciona al menos una categoría")
        .of(yup.string().required()),
    image: yup.mixed().nullable(),
});

const RegisterSubCategory = () => {
    return (
        <section className="bg-white rounded-lg shadow-xl pt-30 pb-20 mr-20 ml-85">
            <h2 className="text-2xl font-bold mb-10 pl-10 text-[#4e4090]">
                Registrar nueva Sub-Categoria
            </h2>

            <Formik
                initialValues={{
                    nombreCategoria: "",
                    nombre: "",
                    image: null,
                    categoria: [], // ← ahora es un array
                }}
                validationSchema={subCategorySchema}
                onSubmit={(values) => {
                    console.log("Subcategoría a registrar:", values);
                    // Aquí podrías usar FormData si subís la imagen a un backend
                }}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto px-10">

                            <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                                <div className="mb-4">
                                    <label className="block text-md font-semibold text-[#4e4090]">
                                        Nombre de la Sub-Categoria:
                                    </label>
                                    <Field
                                        name="nombreSubCategoria"
                                        type="text"
                                        placeholder="Nombre de la Sub-Categoria"
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                    <ErrorMessage
                                        name="nombreSubCategoria"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-md font-semibold text-[#4e4090]">
                                        Clave de la Sub-Categoria:
                                    </label>
                                    <Field
                                        name="nombre"
                                        type="text"
                                        placeholder="Clave de la Sub-Categoria"
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
                                        Imagen de la Sub-Categoria
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

                            <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                                <div className="mb-4">
                                    <label className="block text-md font-semibold text-[#4e4090]">
                                        Categoria
                                    </label>
                                    <Field
                                        as="select"
                                        name="categoria"
                                        multiple
                                        className="w-full border border-gray-300 rounded p-2 h-32"
                                    >
                                        <option value="">Seleccionar Categoria</option>
                                        <option value="trekking">Trekking</option>
                                        <option value="urbanas">Urbanas</option>
                                    </Field>
                                    <ErrorMessage
                                        name="categoria"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>
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

export default RegisterSubCategory;
