import { NextMiddleware, NextResponse } from "next/server";

const middleware: NextMiddleware = req => {
    const { pathname } = req.nextUrl;
    if (pathname === "/app") {
        const url = req.nextUrl.clone();
        url.pathname = "/app/dashboard";
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
};

export default middleware;
