import { NextRequest, NextResponse } from "next/server";

function generateCSRFToken() {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    return Array.from(bytes, byte => ("0" + (byte & 0xff).toString(16)).slice(-2)).join("");
}

const PUBLIC_FILE = /\.(.*)$/;

export default function middleware(request: NextRequest) {
    if (
        !PUBLIC_FILE.test(request.nextUrl.pathname) &&
        !request.nextUrl.pathname.includes("/api/")
    ) {
        const csrfToken = generateCSRFToken();
        const response = NextResponse.next();
        response.cookies.set("csrfToken", csrfToken, { secure: true, sameSite: "strict" });
        return response;
    }
}
