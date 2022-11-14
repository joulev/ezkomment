export default function AppPageSettingsHead({ params }: { params: { "site-name": string } }) {
  return <title>{`Page settings | ${params["site-name"]} | ezkomment`}</title>;
}
