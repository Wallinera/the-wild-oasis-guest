import { auth } from "@/app/_lib/auth";

export const proxy = auth;

// import { NextResponse } from "next/server";

// export function middleware(request) {
//   console.log(request);

//   return NextResponse.redirect(new URL("/about", request.url));
// }

export const config = {
  matcher: ["/account/:path*", "/login"],
};
