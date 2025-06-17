"use client";

import { ButtonAccent } from "@/components/UI/Buttons/Buttons";
import { useAuthStore } from "../../../app/stores/authStore";
import {useRouter} from "next/navigation";
import {routes} from "@/app/routes";

//CartStore; 

export const UserWidget = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push(routes.login);
  };

  return (
    <div className="flex flex-col my-auto">
      <ButtonAccent
        textContent="Cerrar Sesión"
        onClick={handleLogout}
      ></ButtonAccent>
    </div>
  );
};
