import { NextMiddleware, NextResponse } from "next/server";

const middleware: NextMiddleware = req => {
    const { pathname } = req.nextUrl;
    if (pathname === "/docs") {
        const url = req.nextUrl.clone();
        url.pathname = "/docs/getting-started";
        return NextResponse.redirect(url);
    }
    return NextResponse.next();
};

export default middleware;
