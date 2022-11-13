export default function AppSiteSettingsHead({ params }: { params: { "site-name": string } }) {
  return <title>{`Settings | ${params["site-name"]} | ezkomment`}</title>;
}
