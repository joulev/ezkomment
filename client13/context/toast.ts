import { createContext } from "react";

export type Toast = {
    type: "success" | "error";
    message: React.ReactNode;
} | null;

export type SetToastContextType = React.Dispatch<React.SetStateAction<Toast>>;

const SetToastContext = createContext<SetToastContextType>(() => {});

export default SetToastContext;
