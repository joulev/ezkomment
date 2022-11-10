import { OgImageProps } from "~/old/types/client/components.type";

export default function getOgImage({ title, label }: OgImageProps) {
    const url = new URL("https://ezkomment.joulev.dev/api/og");
    if (title) url.searchParams.append("title", title);
    if (label) url.searchParams.append("label", label);
    return url.href;
}
