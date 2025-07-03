import { NextRequest, NextResponse } from "next/server";
import { accessControl } from "./app/helpers/accessControl";
import { routes } from "./app/routes";
import { jwtVerify } from "jose";
import { IAuthMeUser } from "./interfaces";

async function verifyToken(token: string): Promise<IAuthMeUser | null> {
  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    console.log("🟢 Token válido. Payload decodificado:", payload);
    return payload as unknown as IAuthMeUser;
  } catch (error) {
    console.error("❌ Error al verificar el token JWT:", error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  console.log("📍 Path solicitado:", pathname);
  console.log("🍪 Token detectado en cookie:", token || "No hay token");

  const isPublic = accessControl.publicRoutes.some((r) => {
    if (r === "/") return pathname === r;
    return pathname.startsWith(r);
  });

  console.log("🔓 ¿Ruta pública?:", isPublic);

  if (!token) {
    console.log("🛑 No hay token");
    return isPublic
      ? (console.log("✅ Acceso permitido sin token (ruta pública)"), NextResponse.next())
      : (console.log("🔁 Redirigiendo a login..."), NextResponse.redirect(new URL(routes.public.login, req.url)));
  }

  const user = await verifyToken(token);

  if (!user) {
    console.log("🛑 Token inválido o expirado");
    const response = isPublic
      ? (console.log("⚠️ Ruta pública, seguimos sin sesión"), NextResponse.next())
      : (console.log("🔁 Redirigiendo a login por token inválido"), NextResponse.redirect(new URL(routes.public.login, req.url)));
    response.cookies.set("access_token", "", { maxAge: -1 });
    return response;
  }

  console.log("🙋‍♂️ Usuario decodificado:", user);

  const isClient = user.roles?.length === 0;
  console.log("🔐 ¿Es CLIENT?:", isClient);

  if (isPublic) {
    if (
      pathname === routes.public.login ||
      pathname === routes.public.loginClient
    ) {
      const fallback = isClient
        ? routes.client.profileClient
        : routes.shop.categories;

      console.log("🔁 Usuario logueado intentando entrar a login. Redirigiendo a:", fallback);
      return NextResponse.redirect(new URL(fallback, req.url));
    }
  }

  const hasAccess = accessControl.canAccessPath(user, pathname);
  console.log("🔐 ¿Tiene acceso a esta ruta?", hasAccess);

  if (!isPublic && !hasAccess) {
    const fallback = isClient
      ? routes.public.loginClient
      : routes.public.login;

    console.log("🚫 Acceso denegado. Redirigiendo a:", fallback);
    return NextResponse.redirect(new URL(fallback, req.url));
  }

  console.log("✅ Acceso autorizado");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|assets|public).*)"],
};
