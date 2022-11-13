import AuthLayoutClient from "./layout.client";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <meta name="robots" content="noindex" />
      <AuthLayoutClient>{children}</AuthLayoutClient>
    </>
  );
}
