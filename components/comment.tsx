import { FC, useEffect, useRef } from "react";

const Comment: FC<{ ezkUrl: string }> = ({ ezkUrl }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    window.addEventListener("message", event => {
      if (iframeRef.current && event.data.hasOwnProperty("EzkFrameHeight"))
        iframeRef.current.style.height = `${event.data.EzkFrameHeight}px`;
    });
  }, []);
  return <iframe src={ezkUrl} className="w-full" ref={iframeRef} />;
};

export default Comment;
