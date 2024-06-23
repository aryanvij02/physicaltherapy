"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Import your components
import {FitInView} from "./components/FitInView";
import TrainExercise from "./components/TrainExercise";
import ExecuteExercise from "./components/ExecuteExercise";
import CreateExercise from "./components/CreateExercise";

export default function Home() {
  const [currentState, setCurrentState] = useState('home'); // Initial state
  const [exercise, setExercise] = useState(''); // Initial exercise
  const [reps, setReps] = useState('0')
  const [intervals, setIntervals] = useState('0')
  const router = useRouter();

  useEffect(() => {
    console.log("Intervals", intervals)
    console.log("Reps", reps)
  }, [intervals, reps])


  const renderComponent = () => {
    console.log(currentState);
    switch (currentState) {
      case 'home':
        return <CreateExercise setCurrentState={setCurrentState} setExercise={setExercise} setReps={setReps} setIntervals={setIntervals}/>
      case 'fit':
        return <FitInView setCurrentState={setCurrentState}/>;
      case 'train':
        return <TrainExercise exercise={"Squat"}/>;
      default:
        return <ExecuteExercise exercise={"Squat"}/>;
    }
  };

  return (
    <main className="">
      {renderComponent()}
    </main>
  );
}