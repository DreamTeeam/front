"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { ButtonPrimary } from "@/components/UI/Buttons/Buttons";
import { routes } from "@/app/routes";
import { ButtonSecondary } from '@/components/UI/Buttons/Buttons';

const Profile = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isEmployee = useAuthStore((state) => state.isEmployee);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const fetchUser = useAuthStore.getState().fetchUser;
  const setInitialized = useAuthStore.getState().setInitialized;

  const [loading, setLoading] = useState(true);

  // Lógica de los f*roles para los botones.
  const roles = user?.roles || [];
  const isAdmin = roles.includes("ADMIN");
  const isClient = roles.includes("CLIENT");
  const subscriptionButtons = isAdmin || isClient;

  useEffect(() => {
    const init = async () => {
      if (!isInitialized) {
        await fetchUser();
        setInitialized(true);
      }
      setLoading(false);
    };
    init();
  }, [isInitialized]);

  if (loading) return <p className="p-4">Cargando perfil...</p>;
  if (!user) return <p className="p-4 text-red-500">No se pudo cargar el usuario.</p>;
  if (!isEmployee()) return <p className="p-4 text-red-500">Acceso no autorizado.</p>;

  return (
    <div className="">
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">
          Bienvenido <span className="text-secondary">{user.name}</span>
        </h2>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-primary">Datos Personales</h3>
          <p><strong className="text-gray-700">Nombre:</strong> {user.name}</p>
          <p><strong className="text-gray-700">Email:</strong> {user.email}</p>
          <p><strong className="text-gray-700">Roles:</strong> {user.roles?.join(", ")}</p>
        </div>

        {subscriptionButtons && (
          <div className="grid gap-10 w-auto max-w-50">
            <ButtonSecondary
              textContent="Ver suscripciones disponibles"
              onClick={() =>
                router.push(
                  isAdmin
                    ? routes.user.companysubscription
                    : routes.user.clientsubscription
                )
              }
            />

            <ButtonPrimary
              textContent="Cancelar suscripción"
              onClick={() => router.push(routes.payment.unsubscribe)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;