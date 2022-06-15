import { NextMiddleware, NextResponse } from "next/server";

const middleware: NextMiddleware = req =>
    NextResponse.rewrite(new URL("/api" + req.nextUrl.pathname, req.url));

export default middleware;
