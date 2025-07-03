import { NextRequest, NextResponse } from "next/server";
import { routes } from "./app/routes";

// Rutas públicas que no requieren autenticación
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/registerclient",
  "/loginclient",
  "/shop",             // <<< Agregado: deja entrar a /shop
  "/shop/categories",  // <<< Agregado: deja entrar directo a categorías
];

// Middleware
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Si la ruta comienza con una ruta pública, permitir el acceso
  const isPublic = PUBLIC_PATHS.some((r) =>
    pathname === r || pathname.startsWith(r + "/")
  );

  if (isPublic) {
    return NextResponse.next();
  }

  // Si no hay token, redirigir al login (solo para rutas no públicas)
  const token = req.cookies.get("access_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL(routes.public.login, req.url));
  }

  // Si hay token, seguir normalmente
  return NextResponse.next();
}

// Config: ignorar rutas estáticas y APIs
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|gif)).*)",
  ],
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