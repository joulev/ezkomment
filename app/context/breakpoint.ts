"use client";

import { createContext } from "react";

export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "unknown";

const BreakpointContext = createContext<Breakpoint>("unknown");

export default BreakpointContext;
