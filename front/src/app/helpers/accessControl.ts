import { routes } from "../routes";
import { IAuthMeUser } from "@/interfaces";

// Rutas por rol
export const accessByRole: Record<string, string[]> = {
  CLIENT: [routes.client.subscription, routes.user.profile],
  CASHIER: [
    routes.user.profile,
    routes.user.reports,
    routes.user.support,
    routes.user.chat,
    routes.user.reportsemployee,
    routes.user.ordercancel,
    ...Object.values(routes.shop),
    ...Object.values(routes.payment),
  ],
  ADMIN: [
    ...Object.values(routes.user),
    ...Object.values(routes.shop),
    ...Object.values(routes.manager.add),
    ...Object.values(routes.manager.settings),
    ...Object.values(routes.manager.cashier),
    ...Object.values(routes.payment),
  ],
  SUPERADMIN: [
    ...Object.values(routes.user),
    ...Object.values(routes.shop),
    ...Object.values(routes.manager.add),
    ...Object.values(routes.manager.settings),
    ...Object.values(routes.manager.cashier),
    ...Object.values(routes.payment),
  ],
};

// 🟢 Agregamos /shop como ruta pública extra
const publicRoutes = [
  ...Object.values(routes.public),
  "/shop", // para /shop
  "/shop/categories", // para /shop/categories directamente
];

// Chequea si un path es accesible según roles
const canAccessPath = (user: IAuthMeUser | null, path: string): boolean => {
  if (!user) return false;
  const roles = user.roles?.length ? user.roles : ["CLIENT"];
  const allowedRoutes = roles.flatMap((role) => accessByRole[role] ?? []);
  return allowedRoutes.some((route) => path.startsWith(route));
};

export const accessControl = {
  publicRoutes,
  canAccessPath,
};





// import { routes } from "../routes";
// import { IAuthMeUser } from "@/interfaces";

// export const accessByRole: Record<string, string[]> = {
//   CLIENT: [routes.client.subscription, routes.user.profile],
//   CASHIER: [
//     routes.user.profile,
//     routes.user.reports,
//     routes.user.support,
//     routes.user.chat,
//     routes.user.reportsemployee,
//     routes.user.ordercancel,
//     ...Object.values(routes.shop),
//     ...Object.values(routes.payment)
//   ],
//   ADMIN: [
//     ...Object.values(routes.user),
//     ...Object.values(routes.shop),
//     ...Object.values(routes.manager.add),
//     ...Object.values(routes.manager.settings),
//     ...Object.values(routes.manager.cashier),
//     ...Object.values(routes.payment),
//   ],
//   SUPERADMIN: [
//     ...Object.values(routes.user),
//     ...Object.values(routes.shop),
//     ...Object.values(routes.manager.add),
//     ...Object.values(routes.manager.settings),
//     ...Object.values(routes.manager.cashier),
//     ...Object.values(routes.payment),
//   ],
// };

// const publicRoutes = Object.values(routes.public);

// const canAccessPath = (user: IAuthMeUser | null, path: string): boolean => {
//   if (!user) return false;
//   const roles = user.roles?.length ? user.roles : ["CLIENT"];
//   const allowedRoutes = roles.flatMap((role) => accessByRole[role] ?? []);
//   return allowedRoutes.some((route) => path.startsWith(route));
// };

// export const accessControl = {
//   publicRoutes,
//   canAccessPath,
// };
