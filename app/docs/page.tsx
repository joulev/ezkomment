import DocsBottomBar from "./components/bottombar.client";

export default function Page() {
  return (
    <main className="ml-0 mt-18 lg:ml-96 lg:mt-0">
      <div className="container lg:max-w-prose py-12">
        <article className="post">
          <div>Hello, world</div>
        </article>
        <hr />
        <DocsBottomBar lastModified={"2022-08-01T08:37:27Z"} path={[]} />
      </div>
    </main>
  );
}
