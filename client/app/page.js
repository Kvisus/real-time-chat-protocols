import Image from "next/image";
import LongPolling from "./LongPolling";
import EventSource from "./EventSource";
import WebSockets from "./WebSockets";

export default function Home() {
  return (
    <div className="">
      {/* <LongPolling /> */}
      {/* <EventSource /> */}
      <WebSockets />
    </div>
  );
}
