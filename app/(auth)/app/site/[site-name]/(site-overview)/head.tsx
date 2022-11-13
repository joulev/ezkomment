export default function AppSiteOverviewHead({ params }: { params: { "site-name": string } }) {
  return (
    <>
      <title>{`${params["site-name"]} | ezkomment`}</title>
      <meta name="robots" content="noindex" />
    </>
  );
}
