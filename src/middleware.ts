import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  PublicRoutes,
  ApiRoutes,
  AuthRoutes,
  DEFAULT_REDIRECT_ROUTE,
  DEFAULT_AUTH_ROUTE
} from '@/routes'

const {auth} = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl} = req;
  const pathname = nextUrl.pathname
  const isLoggedIn = !!req.auth
  const isApiRoute = pathname.startsWith(ApiRoutes) 
  const isAuthRoute = AuthRoutes.includes(pathname)
  const isPublicRoute = PublicRoutes.includes(pathname)  
  if (isApiRoute) {
    return ;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_ROUTE, nextUrl.toString()))
    }
    return ;
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_AUTH_ROUTE, nextUrl.toString()))
  }
  return ;

  
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
