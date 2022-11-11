import A from "~/app/components/anchor.client";
import Logo from "~/app/components/logo/logo";

export default function AuthLoading() {
  return (
    <main className="h-screen grid place-items-center">
      <div className="w-full h-full px-6 py-12 sm:py-6 sm:w-96 sm:h-auto mx-auto bg-card sm:border sm:border-card sm:rounded">
        <div className="text-center">
          <A href="/" notStyled className="inline-block mx-auto">
            <Logo />
          </A>
          <h1 className="text-3xl mt-6 mb-12">Continue to ezkomment</h1>
          <div className="flex flex-col gap-6">
            <div className="h-[38px] pulse"></div>
            <div className="h-[38px] pulse"></div>
          </div>
        </div>
      </div>
    </main>
  );
}
