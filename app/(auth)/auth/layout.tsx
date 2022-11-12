import AuthPageLayoutClient from "./layout.client";

export default function AuthPageLayout({ children }: React.PropsWithChildren) {
  return <AuthPageLayoutClient>{children}</AuthPageLayoutClient>;
}
