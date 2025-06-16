import React from "react";
import LoginFormClient from "../../../components/Auth/Employee/LoginFormUI";
import Link from "next/link";
import { routes } from "../../routes/index";

const LoginPageClient = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      {/* Sección izquierda: imagen o color */}
      <div className="hidden lg:block bg-[#4e4090] relative">
        {/* Texto */}
        <div className="relative z-10 flex items-center justify-center h-full px-10 text-base-100 text-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Bienvenido</h1>
            <p className="text-lg">
              Iniciá sesión para acceder a tu cuenta CLIENTE
            </p>
          </div>
        </div>
      </div>

      {/* Sección derecha: formulario */}
      <div className="flex flex-col items-center justify-center bg-base-100 px-6 py-12">
        <div className="w-full max-w-md">
          <LoginFormClient />
        </div>

        <p className="text-center mt-2">
          ¿Sos empleado?{" "}
          <Link
            href={routes.login}
            className="text-primary font-semibold inline-flex space-x-1 items-center hover:text-[#0d0d0d]"
          >
            Clickea aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPageClient;
