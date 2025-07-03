"use client";
import React, { useEffect, useRef, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import InputFormik from "@/components/UI/Inputs/InputFormik";
import VariantProduct from "./VariantProduct";
import { ButtonAccent } from "@/components/UI/Buttons/Buttons";
import api from '@/lib/axiosInstance'

const productoSchemaParcial  = yup.object().shape({
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

  precioVenta: yup
    .number()
    .typeError("Debe ser un número")
    .required("El precio de venta es obligatorio")
    .moreThan(0, "El precio debe ser mayor a 0"),

  claveProducto: yup
    .string()
    .required("La clave del producto es obligatoria")
    .trim("No se permiten espacios en blanco")
    .min(1, "La clave no puede estar vacía"),

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
});

const productoSchemaCompleto = productoSchemaParcial.shape({
  variantes: yup
    .array()
    .of(
      yup.object().shape({
        color_id: yup.string().required("El color es obligatorio"),
        descripcion: yup.string().required("La descripción es obligatoria"),
        images: yup
          .array()
          .of(yup.string().required("La imagen es obligatoria"))
          .min(1, "Debe agregar al menos una imagen"),
        variants2: yup
          .array()
          .of(
            yup.object().shape({
              talle: yup.string().required("El talle es obligatorio"),
              stock: yup
                .number()
                .typeError("El stock debe ser un número")
                .required("El stock es obligatorio")
                .min(1, "El stock debe ser mayor a 0"),
            })
          )
          .min(1, "Debe agregar al menos un talle y stock"),
      })
    )
    .min(1, "Debe agregar al menos una variante"),
});

const RegisterProduct = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [productoAceptado, setProductoAceptado] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [catRes, subRes, marcasRes] = await Promise.all([
          api.get("/categories"),
          api.get("/sub-categories"),
          api.get("/brands"),
        ]);

        setCategorias(catRes.data);
        setSubcategorias(subRes.data);
        setMarcas(marcasRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        toast.error("Error al cargar categorías o marcas");
      }
    };

    fetchDatos();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 sm:mb-10 text-[#4e4090] text-center sm:text-left sm:pl-10">
        Registrar nuevo Producto
      </h2>
      <Formik
        initialValues={{
          nombre: "",
          descripcion: "",
          precioCompra: "",
          categoria: "",
          precioVenta: "",
          claveProducto: "",
          subcategoria: "",
          marca: "",
          variantes: [],
        }}
validationSchema={productoSchemaCompleto}
        onSubmit={async (values, { resetForm }) => {
          try {
            const productToSend = {
              name: values.nombre,
              description: values.descripcion,
              code: values.claveProducto,
              purchase_price: parseFloat(values.precioCompra),
              sale_price: parseFloat(values.precioVenta),
              category_id: values.categoria,
              sub_category_id: values.subcategoria,
              brand_id: values.marca,
              variants: values.variantes.map((v: any) => ({
                description: v.descripcion,
                color_id: v.color_id,
                image: v.images,
                variantSizes: v.variants2.map((v2: any) => ({
                  stock: parseInt(v2.stock),
                  size_id: v2.talle,
                })),
              })),
            };
            console.log("Producto pasado al back", productToSend);

            const response = await api.post("/products", productToSend);
            

            if (response.status === 201 || response.status === 200) {
              toast.success("Producto registrado correctamente");
              resetForm();
              setProductoAceptado(false);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Ocurrió un error al registrar la categoría";
            toast.error(errorMessage);
          }
        }}

      >
        {({ values, isValid, validateForm  }) => (
          <Form>
            <div className="flex flex-col lg:flex-row gap-6 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
              <div className="border border-gray-300 flex-1 p-6 sm:p-8 bg-white rounded-lg">
                <InputFormik
                  name="nombre"
                  label="Nombre del Producto:"
                  type="text"
                  placeholder="Nombre del Producto"
                />

                <InputFormik
                  name="claveProducto"
                  label="Clave del Producto:"
                  type="text"
                  placeholder="Ej: SKU123"
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
                  name="precioVenta"
                  label="Precio de Venta:"
                  type="text"
                  placeholder="Ingrese precio de venta"
                />
              </div>

              <div className="border border-gray-300 flex-1 p-6 sm:p-8 bg-white rounded-lg">
                <label className="block text-md font-semibold text-[#4e4090]">
                  Categoría
                </label>
                <Field
                  as="select"
                  name="categoria"
                  className="w-full border border-gray-300 rounded p-2 text-black bg-white"
                >
                  <option value="">Seleccionar categoría</option>
                  {categorias.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
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
                  className="w-full border border-gray-300 rounded p-2 text-black"
                >
                  <option value="">Seleccionar Sub-Categoría</option>
                  {subcategorias.map((sub: any) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name}
                    </option>
                  ))}
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
                  className="w-full border border-gray-300 rounded p-2  text-black"
                >
                  <option value="">Seleccionar marca</option>
                  {marcas.map((marca: any) => (
                    <option key={marca.id} value={marca.id}>
                      {marca.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="marca"
                  component="div"
                  className="text-red-500 text-sm mb-2"
                />
              </div>
            </div>
            {/* Botón aceptar, que habilita las variantes */}
            {!productoAceptado && (
              <div className="flex justify-center md:justify-end mt-6 px-4 sm:px-6 lg:px-10">
                <ButtonAccent
                  type="button"
                  textContent="ACEPTAR"
                  onClick={() => {
                    productoSchemaParcial.validate(values, { abortEarly: true })
                      .then(() => {
                        setProductoAceptado(true);
                        toast.success("Producto aceptado. Ahora agrega las variantes");
                      })
                      .catch(() => {
                        toast.error("Por favor, completa todos los campos obligatorios.");
                      });
                  }}
                />
              </div>
            )}

            {/*Sección de variantes, solo si ya fue aceptado */}
            {productoAceptado && <VariantProduct name="variantes" />}

            {productoAceptado && (
              <div className="flex justify-center md:justify-end mt-6 px-4 sm:px-6 lg:px-10">
                <ButtonAccent type="submit" textContent="GUARDAR" onClick={async (e) => {
            e.preventDefault(); // Evitás que envíe el form sin control
            await validateForm();

            if (!isValid) {
              toast.error("Por favor, completá todos los campos obligatorios, incluyendo las variantes.");
              return;
            }

            // Si todo está bien, enviamos el form
            (e.target as HTMLButtonElement).closest('form')?.requestSubmit();
          }}/>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterProduct;