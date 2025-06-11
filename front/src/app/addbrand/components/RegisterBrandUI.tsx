"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { ButtonAccent } from "../../../components/UI/Buttons/Buttons";

// Validaciones con Yup
const brandSchema = yup.object().shape({
    nombreMarca: yup
        .string()
        .required("El nombre de la marca es obligatorio"),
    nombre: yup.string().required("La clave es obligatoria"),
    subCategoria: yup
        .array()
        .min(1, "Selecciona al menos una Sub-Categoría")
        .of(yup.string().required()),
    image: yup.mixed().nullable(),
});

const RegisterBrand = () => {
    return (
        <section className="bg-white rounded-lg shadow-xl pt-30 pb-20 mr-20 ml-85">
            <h2 className="text-2xl font-bold mb-10 pl-10 text-[#4e4090]">
                Registrar nueva Marca
            </h2>

            <Formik
                initialValues={{
                    nombreCategoria: "",
                    nombre: "",
                    image: null,
                    categoria: [], // ← ahora es un array
                }}
                validationSchema={brandSchema}
                onSubmit={(values) => {
                    console.log("Marca a registrar:", values);
                    // Aquí podés construir FormData si necesitás enviar la imagen
                }}
            >
                {({ setFieldValue }) => (
                    <Form>
                        <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto px-10">
                            <div className="border border-gray-300 flex-1 p-6 bg-white rounded-lg">
                                <div className="mb-4">
                                    <label className="block text-md font-semibold text-[#4e4090]">
                                        Nombre de la Marca:
                                    </label>
                                    <Field
                                        name="nombreMarca"
                                        type="text"
                                        placeholder="Nombre de la Marca"
                                        className="w-full border border-gray-300 rounded p-2"
                                    />
                                    <ErrorMessage
                                        name="nombreMarca"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-md font-semibold text-[#4e4090]">
                                        Clave de la Marca:
                                    </label>
                                    <Field
                                        name="nombre"
                                        type="text"
                                        placeholder="Clave de la Marca"
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
                                        Imagen de la Marca
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
                                        Sub-Categoría
                                    </label>
                                    <Field
                                        as="select"
                                        name="subCategoria"
                                        multiple
                                        className="w-full border border-gray-300 rounded p-2 h-32"
                                    >
                                        <option value="">Seleccionar Sub-Categoría</option>
                                        <option value="trekking">Trekking</option>
                                        <option value="urbanas">Urbanas</option>
                                    </Field>
                                    <ErrorMessage
                                        name="subCategoria"
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

export default RegisterBrand;
