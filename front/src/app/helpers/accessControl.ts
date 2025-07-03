import { routes } from "../routes/index";
import { IAuthMeUser } from "@/interfaces";

// 🔁 Normaliza los paths para evitar problemas con slashes finales
const normalizePath = (path: string): string => {
  return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
};

export const accessByRole: Record<string, string[]> = {
  CLIENT: [
    routes.client.profileClient,
    routes.client.subscription,
  ],
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

const publicRoutes = Object.values(routes.public).map(normalizePath);

const canAccessPath = (user: IAuthMeUser | null, path: string): boolean => {
  if (!user) return false;

  const normalizedPath = normalizePath(path);
  const roles = user.roles?.length ? user.roles : ["CLIENT"];

  const allowedRoutes = roles.flatMap((role) => accessByRole[role] ?? []);
  return allowedRoutes.some((route) => normalizedPath.startsWith(normalizePath(route)));
};

export const accessControl = {
  publicRoutes,
  canAccessPath,
};
