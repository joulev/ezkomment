import clsx from "clsx";
import { FC, useEffect, useRef, useState } from "react";

type SiteGraphProps = {
  totalComment: number[];
  newComment: number[];
};

const DateText: FC<{ daysAgo: number }> = ({ daysAgo }) => {
  if (daysAgo === 0) return <>Today</>;
  if (daysAgo === 1) return <>Yesterday</>;
  return <>{daysAgo} days ago</>;
};

const SiteGraph: FC<SiteGraphProps> = ({ totalComment, newComment }) => {
  const wrapper = useRef<HTMLDivElement>(null);
  const xpos = (i: number) => ((wrapper.current?.clientWidth ?? 0) / 31) * (i + 1);
  const minColHeight = 20;
  const minLineHeight = 40;
  const circleR = 3;

  const [colWidth, setColWidth] = useState(0);
  const [maxColHeight, setMaxColHeight] = useState(0);
  const [rangeNewComment, setRangeNewComment] = useState(0);
  const [minNewComment, setMinNewComment] = useState(0);

  const [maxLineHeight, setMaxLineHeight] = useState(0);
  const [rangeTotalComment, setRangeTotalComment] = useState(0);
  const [minTotalComment, setMinTotalComment] = useState(0);

  const [currentHover, setCurrentHover] = useState(-1);
  const [fullColWidth, setFullColWidth] = useState(0);

  useEffect(() => {
    setMinNewComment(Math.min(...newComment));
    setRangeNewComment(Math.max(...newComment) - Math.min(...newComment));
  }, [newComment]);

  useEffect(() => {
    setMinTotalComment(Math.min(...totalComment));
    setRangeTotalComment(Math.max(...totalComment) - Math.min(...totalComment));
  }, [totalComment]);

  useEffect(() => {
    const handleResize = () => {
      setFullColWidth((wrapper.current?.clientWidth ?? 0) / 31);
      setColWidth((wrapper.current?.clientWidth ?? 0) / 72);
      setMaxColHeight((wrapper.current?.clientHeight ?? 0) / 1.5);
      setMaxLineHeight((wrapper.current?.clientHeight ?? 0) / 1.2);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getNewCommentHeight = (val: number) =>
    ((val - minNewComment) / rangeNewComment) * (maxColHeight - minColHeight) + minColHeight;
  const getTotalCommentHeight = (val: number) =>
    ((val - minTotalComment) / rangeTotalComment) * (maxLineHeight - minLineHeight) + minLineHeight;

  return (
    <div
      className={clsx(
        "aspect-h-8 aspect-w-12 md:aspect-h-6 lg:aspect-h-8",
        "rounded border border-neutral-300 dark:border-neutral-700 overflow-hidden relative -z-10"
      )}
      ref={wrapper}
    >
      <svg className="bg-white dark:bg-black">
        <g transform={`matrix(1 0 0 -1 0 ${wrapper.current?.clientHeight})`}>
          {[4, 9, 14, 19, 24].map(val => (
            <line
              key={val}
              x1={xpos(val)}
              y1={0}
              x2={xpos(val)}
              y2={wrapper.current?.clientHeight ?? 0}
              strokeWidth={1}
              className="stroke-neutral-300 dark:stroke-neutral-700"
            />
          ))}
          {newComment.map((val, i) => (
            <rect
              key={i}
              x={xpos(i) - colWidth / 2}
              y={0}
              width={colWidth}
              height={getNewCommentHeight(val)}
              className={clsx(
                "transition",
                currentHover === i ? "fill-indigo-500" : "fill-neutral-500"
              )}
            />
          ))}
          {totalComment.map(
            (val, i) =>
              i !== 0 && (
                <line
                  key={i}
                  x1={xpos(i - 1)}
                  y1={getTotalCommentHeight(totalComment[i - 1])}
                  x2={xpos(i)}
                  y2={getTotalCommentHeight(val)}
                  strokeWidth={1.5}
                  className="stroke-neutral-500"
                />
              )
          )}
          {totalComment.map((val, i) => (
            <circle
              key={i}
              cx={xpos(i)}
              cy={getTotalCommentHeight(val)}
              r={circleR}
              strokeWidth={1.5}
              className={clsx(
                "transition fill-white dark:fill-black",
                currentHover === i ? "stroke-indigo-500" : "stroke-black dark:stroke-white"
              )}
            />
          ))}
          {Array(30)
            .fill(0)
            .map((_, i) => (
              <rect
                key={i}
                x={xpos(i) - fullColWidth / 2}
                y={0}
                width={fullColWidth}
                height={wrapper.current?.clientHeight ?? 0}
                onMouseEnter={() => setCurrentHover(i)}
                onMouseLeave={() => setCurrentHover(-1)}
                fill="transparent"
              />
            ))}
        </g>
      </svg>
      <div
        className={clsx(
          "absolute -z-10 -top-px -left-px p-3 text-sm rounded max-w-fit h-[90px]",
          "bg-neutral-100 dark:bg-neutral-900",
          "border border-neutral-300 dark:border-neutral-700 transition",
          currentHover === -1 ? "opacity-0 invisible" : "opacity-100 visible"
        )}
      >
        <div>
          <div className="text-neutral-500 mb-1.5">
            <DateText daysAgo={29 - currentHover} />
          </div>
          <div>
            <strong>Total comments:</strong> {currentHover === -1 ? 0 : totalComment[currentHover]}
          </div>
          <div>
            <strong>New comments:</strong> {currentHover === -1 ? 0 : newComment[currentHover]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteGraph;
