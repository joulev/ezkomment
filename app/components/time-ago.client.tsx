"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNowStrict } from "date-fns";

function getTimeAgo(date: string | number | Date, addSuffix: boolean) {
  return formatDistanceToNowStrict(new Date(date), { addSuffix });
}

export type Props = {
  date: string | number | Date;
  addSuffix?: boolean;
};

export default function TimeAgo({ date, addSuffix = true }: Props) {
  const [timeAgo, setTimeAgo] = useState("loading");
  useEffect(() => {
    const interval = setInterval(() => setTimeAgo(getTimeAgo(date, addSuffix)), 1000);
    return () => clearInterval(interval);
  }, [date, addSuffix]);
  return <time title={new Date(date).toISOString()}>{timeAgo}</time>;
}
