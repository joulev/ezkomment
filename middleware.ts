import { NextResponse } from "next/server";

function generateCSRFToken() {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    return Array.from(bytes, byte => ("0" + (byte & 0xff).toString(16)).slice(-2)).join("");
}

export default function middleware() {
    const csrfToken = generateCSRFToken();
    const response = NextResponse.next();
    response.cookies.set("csrfToken", csrfToken, { secure: true, sameSite: "strict" });
    return response;
}
