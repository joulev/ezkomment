import "~/client/styles/globals.css";

import LayoutClient from "./layout.client";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200 overflow-y-scroll">
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
