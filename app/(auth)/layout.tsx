import AuthLayoutClient from "./layout.client";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return <AuthLayoutClient>{children}</AuthLayoutClient>;
}
