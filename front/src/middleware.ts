import { NextRequest, NextResponse } from "next/server";
import { accessControl } from "./app/helpers/accessControl";
import { routes } from "./app/routes";
import { jwtVerify } from "jose";
import { IAuthMeUser } from "./interfaces";

// 🔐 Verifica y decodifica el token JWT
async function verifyToken(token: string): Promise<IAuthMeUser | null> {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("❌ JWT_SECRET no está definido en middleware.");
      return null;
    }

    const encodedSecret = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, encodedSecret);

    return payload as unknown as IAuthMeUser;
  } catch (error) {
    console.error("❌ Error al verificar el token JWT:", error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  console.log("⚡️ Middleware ejecutado");
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("access_token")?.value;

  console.log("🔍 Pathname:", pathname);
  console.log("🍪 Access token presente:", Boolean(token));
  console.log("🌍 JWT_SECRET está definido:", Boolean(process.env.JWT_SECRET));

  const isPublic = accessControl.publicRoutes.some((r) => {
    if (r === "/") return pathname === r;
    return pathname.startsWith(r);
  });

  // 🧱 CASO 1: No hay token
  if (!token) {
    console.log("🔓 No hay token.");
    return isPublic
      ? NextResponse.next()
      : NextResponse.redirect(new URL(routes.public.login, req.url));
  }

  // 🔑 CASO 2: Hay token → verificar
  const user = await verifyToken(token);

  // ❌ Token inválido
  if (!user) {
    console.log("🚫 Token inválido o expirado. Limpiando cookie...");
    const response = isPublic
      ? NextResponse.next()
      : NextResponse.redirect(new URL(routes.public.login, req.url));

    response.cookies.set("access_token", "", { maxAge: -1 });
    return response;
  }

  // 🧍‍♂️ Determinar si es cliente (sin roles)
  const isClient = user.roles?.length === 0;
  console.log("🧠 Usuario verificado:", user.email, "| Cliente:", isClient);

  // 🔁 CASO 3: Está logueado pero entra al login
  if (isPublic) {
    if (
      pathname === routes.public.login ||
      pathname === routes.public.loginClient
    ) {
      const fallback = isClient
        ? routes.client.profileClient
        : routes.shop.categories;

      console.log("🔁 Usuario logueado redirigido a:", fallback);
      return NextResponse.redirect(new URL(fallback, req.url));
    }
  }

  // 🚫 CASO 4: No tiene permiso
  if (!isPublic && !accessControl.canAccessPath(user, pathname)) {
    const fallback = isClient
      ? routes.public.loginClient
      : routes.public.login;

    console.log("⛔ Usuario sin permisos. Redirigiendo a:", fallback);
    return NextResponse.redirect(new URL(fallback, req.url));
  }

  // ✅ OK
  console.log("✅ Autenticación y permisos correctos.");
  return NextResponse.next();
}

// ⚙️ Ignora assets estáticos y APIs
export const config = {
  matcher: "/:path*",
};



// import { NextRequest, NextResponse } from "next/server";
// import { accessControl } from "./app/helpers/accessControl";
// import { routes } from "./app/routes";
// import { jwtVerify } from "jose";
// import { IAuthMeUser } from "./interfaces";

// // Verifica y decodifica el token JWT
// async function verifyToken(token: string): Promise<IAuthMeUser | null> {
//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//     const { payload } = await jwtVerify(token, secret);
//     return payload as unknown as IAuthMeUser;
//   } catch (error) {
//     console.error("Error al verificar el token JWT:", error);
//     return null;
//   }
// }

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
// console.log("Cookies:", req.cookies);
// const token = req.cookies.get("access_token")?.value;
// console.log("Access token:", token);

//   const isPublic = accessControl.publicRoutes.some((r) => {
//   if (r === '/') {
//     return pathname === r;
//   }
//   return pathname.startsWith(r);
// });

//   // CASO 1: No hay token
//   if (!token) {
//     return isPublic
//       ? NextResponse.next()
//       : NextResponse.redirect(new URL(routes.public.login, req.url));
//   }

//   // CASO 2: Hay un token, intentamos verificarlo
//   const user = await verifyToken(token);

//   // CASO 2.1: El token es inválido (user es null)
//   if (!user) {
//     const response = isPublic
//       ? NextResponse.next() // Si ya está en pública, solo limpia la cookie
//       : NextResponse.redirect(new URL(routes.public.login, req.url)); // Si no, redirige al login y limpia cookie
//     response.cookies.set("access_token", "", { maxAge: -1 });
//     return response;
//   }

//   // Helper
//   const isClient = user.roles?.length === 0;

//   // CASO 3: El usuario ya está logueado e intenta entrar a login
//   if (isPublic) {
//     if (
//       pathname === routes.public.login ||
//       pathname === routes.public.loginClient
//     ) {
//       const fallback = isClient
//         ? routes.client.profileClient // o subscription, según el caso
//         : routes.shop.categories;

//       return NextResponse.redirect(new URL(fallback, req.url));
//     }
//   }

//   // CASO 4: Token válido, pero el usuario no tiene permisos para la ruta
//   if (!isPublic && !accessControl.canAccessPath(user, pathname)) {
//     const fallback = isClient
//       ? routes.public.loginClient
//       : routes.public.login;

//     return NextResponse.redirect(new URL(fallback, req.url));
//   }

//   return NextResponse.next();
// }



// // Ignora assets estáticos y APIs
// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|gif)).*)",
//   ],
// };
