import Image from "next/image";
import PoseDetector from "./components/PoseDetector";

export default function Home() {
  const exercise = "Squat";
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PoseDetector exercise={exercise}></PoseDetector>
    </main>
  );
}
