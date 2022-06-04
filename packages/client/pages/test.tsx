import { useEffect, useState } from "react";

// This page will crash

export default function Test() {
  const [obj, setObj] = useState<any>("test");
  useEffect(() => setObj({ a: 1, b: 2 }), []);
  return <div>{obj}</div>;
}
