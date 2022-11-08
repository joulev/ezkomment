export type Props = {
  title: string;
  description?: string;
  url: string;
  og: {
    title?: string;
    label?: "docs" | "posts" | "orbital";
  };
};

function getOgImage({ title, label }: Props["og"]) {
  const url = new URL("https://ezkomment.joulev.dev/api/og");
  if (title) url.searchParams.append("title", title);
  if (label) url.searchParams.append("label", label);
  return url.href;
}

export default function Seo({ title, description, url, og }: Props) {
  const image = getOgImage(og);
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index,follow" />
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@joulev_3" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <link rel="canonical" href={url} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="152x152" />
    </>
  );
}
