/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { OgImageProps } from "@client/types/components.type";

/**
 * @note Do NOT use Tailwind classes or use relative image links here, since we will be generating
 * a self-contained HTML for this.
 */
const OgImage: FC<OgImageProps> = ({ title, label }) => {
  if (!title)
    return (
      <div
        style={{
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
          width: 1200,
          height: 630,
          fontSize: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 48,
          backgroundImage: "linear-gradient(to bottom right, #818cf8, #4f46e5)",
          color: "white",
        }}
      >
        <div>
          <img
            src="https://ezkomment.joulev.dev/images/logo-text-white.svg"
            alt="you shouldn't see this"
            width={397}
            height={80}
          />
        </div>
        <div style={{ fontWeight: 200 }}>
          Commenting made <span style={{ fontWeight: 800 }}>easy</span>.
        </div>
      </div>
    );
  return (
    <div
      style={{
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";',
        width: 1200,
        height: 630,
        padding: "150px 120px",
        fontSize: title.length > 32 ? 72 : 80,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 48,
        backgroundImage: "linear-gradient(to bottom right, #818cf8, #4f46e5)",
        color: "white",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 32 }}>
        <img
          src="https://ezkomment.joulev.dev/images/logo-text-white.svg"
          alt="you shouldn't see this"
          width={397}
          height={80}
        />
        {label && (
          <div
            style={{
              fontSize: 48,
              paddingLeft: 32,
              borderLeft: "solid 1px #f5f5f5",
              textTransform: "uppercase",
              fontWeight: 300,
            }}
          >
            {label}
          </div>
        )}
      </div>
      <div
        style={{
          fontWeight: 600,
          lineHeight: 1.25,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
        }}
      >
        {title}
      </div>
    </div>
  );
};

const ogImageHTML = (props: OgImageProps) => renderToStaticMarkup(<OgImage {...props} />);

export default ogImageHTML;
