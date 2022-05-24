import { useRouter } from "next/router";

import { NextPageWithLayout } from "@client/types/utils.type";

const OpenGraphImageGenerator: NextPageWithLayout = () => {
  const router = useRouter();
  const title = router.query.title as string | undefined;
  if (!title) return null;
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        padding: "150px 120px",
        fontSize: title.length > 32 ? 72 : 80,
        gap: 48,
      }}
      className="bg-gradient-to-br from-indigo-400 to-indigo-600 text-neutral-100 flex flex-col justify-center"
    >
      <div className="flex flex-row divide-x divide-neutral-100 items-center" style={{ gap: 32 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logo-text-white.svg"
          alt="you shouldn't see this"
          width={397}
          height={80}
        />
        {router.query.label && (
          <div style={{ fontSize: 48, paddingLeft: 32 }} className="uppercase font-light">
            {router.query.label}
          </div>
        )}
      </div>
      <div className="font-semibold leading-tight line-clamp-2">{title}</div>
    </div>
  );
};

export default OpenGraphImageGenerator;
