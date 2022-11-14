export default function AppPageOverviewHead({ params }: { params: { "site-name": string } }) {
  return <title>{`Page comments | ${params["site-name"]} | ezkomment`}</title>;
}
