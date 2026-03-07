import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";

export async function middleware(request: NextRequest) {
    // Handle CORS Preflight
    if (request.method === "OPTIONS" && request.nextUrl.pathname.startsWith("/api")) {
        const response = new NextResponse(null, { status: 204 });
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        return response;
    }

    const session = await getSession();
    const res = await handleRequest(request, session);

    // Add CORS headers for all other API routes
    if (request.nextUrl.pathname.startsWith("/api")) {
        res.headers.set("Access-Control-Allow-Origin", "*");
    }

    return res;
}

async function handleRequest(request: NextRequest, session: any) {
    // If trying to access /login while already logged in
    if (session && request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // If the user is not logged in and trying to access protected routes
    if (!session && !request.nextUrl.pathname.startsWith("/login")) {
        // Allow public access to GET blogs
        if (request.nextUrl.pathname.startsWith("/api/blogs") && (request.method === "GET" || request.method === "OPTIONS")) {
            return NextResponse.next();
        }

        // Allow public access to login API
        if (request.nextUrl.pathname === "/api/login" && (request.method === "POST" || request.method === "OPTIONS")) {
            return NextResponse.next();
        }

        // Allow public access to POST submissions
        if (request.nextUrl.pathname === "/api/submissions" && (request.method === "POST" || request.method === "OPTIONS")) {
            return NextResponse.next();
        }



        if (request.nextUrl.pathname.startsWith("/api")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}


export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
