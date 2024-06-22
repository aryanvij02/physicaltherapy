import Image from "next/image";
import PoseDetector from "./components/PoseDetector";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Monkey</p>
      <PoseDetector></PoseDetector>
    </main>
  );
}
