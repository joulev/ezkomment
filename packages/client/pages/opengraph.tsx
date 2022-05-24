/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";

import { NextPageWithLayout } from "@client/types/utils.type";

const OpenGraphImageGenerator: NextPageWithLayout = () => {
  const router = useRouter();
  const title = router.query.title as string | undefined;
  if (!title)
    return (
      <div
        style={{ width: 1200, height: 630, gap: 48, fontSize: 80 }}
        className="flex flex-col justify-center items-center bg-gradient-to-br from-indigo-400 to-indigo-600"
      >
        <div>
          <img
            src="/images/logo-text-white.svg"
            alt="you shouldn't see this"
            width={397}
            height={80}
          />
        </div>
        <div className="font-extralight text-white">
          Commenting made <span className="font-extrabold">easy</span>.
        </div>
      </div>
    );
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        padding: "150px 120px",
        fontSize: title.length > 32 ? 72 : 80,
        gap: 48,
      }}
      className="bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex flex-col justify-center"
    >
      <div className="flex flex-row divide-x divide-neutral-100 items-center" style={{ gap: 32 }}>
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
