"use client";
import { parseCookies } from "nookies";

export default function AuthPage() {
  function onClick() {
    const cookies = parseCookies();
    alert(JSON.stringify(cookies));
  }
  return <button onClick={onClick}>Hello world</button>;
}
