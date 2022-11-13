export default function AppSiteCustomiseHead({ params }: { params: { "site-name": string } }) {
  return <title>{`Customise | ${params["site-name"]} | ezkomment`}</title>;
}
