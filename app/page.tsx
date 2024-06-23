"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Import your components
import {FitInView} from "./components/FitInView";
import TrainExercise from "./components/TrainExercise";
import ExecuteExercise from "./components/ExecuteExercise";

export default function Home() {
  const [currentState, setCurrentState] = useState('train'); // Initial state
  const router = useRouter();

  const renderComponent = () => {
    console.log(currentState);
    switch (currentState) {
      case 'fit':
        return <FitInView setCurrentState={setCurrentState}/>;
      case 'train':
        return <TrainExercise exercise={"Squat"}/>;
      default:
        return <ExecuteExercise exercise={"Squat"}/>;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {renderComponent()}
    </main>
  );
}