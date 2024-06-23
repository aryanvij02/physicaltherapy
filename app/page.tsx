"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Import your components
import {FitInView} from "./components/FitInView";
import TrainExercise from "./components/TrainExercise";
import ExecuteExercise from "./components/ExecuteExercise";
import CreateExercise from "./components/CreateExercise";
import LandingPage from "./components/LandingPage";
import NewExercise from "./components/NewExercise";

export default function Home() {
  const [currentState, setCurrentState] = useState('train'); // Initial state
  const [exercise, setExercise] = useState(''); // Initial exercise
  const [reps, setReps] = useState('0')
  const [intervalsExecute, setIntervalsExecute] = useState('0')
  const [intervalPerSetTrain, setIntervalPerSetTrain] = useState('0')
  const [intervalBetweenSetsTrain, setIntervalBetweenSetsTrain] = useState('0')
  const router = useRouter();

  // useEffect(() => {
  //   console.log("Intervals", intervals)
  //   console.log("Reps", reps)
  // }, [intervals, reps])


  const renderComponent = () => {
    console.log(currentState);
    switch (currentState) {
      case 'landing':
        return <LandingPage setCurrentState={setCurrentState}/>
      case 'home':
        return <CreateExercise setCurrentState={setCurrentState} setExercise={setExercise} setReps={setReps} setIntervals={setIntervalsExecute}/>
      case 'fit':
        return <FitInView setCurrentState={setCurrentState}/>;
      case 'train':
        return <TrainExercise exercise={"Squat"} intervalPerSetTrain={intervalPerSetTrain} intervalBetweenSetsTrain={intervalBetweenSetsTrain}/>;
      case 'newexercise':
        return <NewExercise setCurrentState={setCurrentState}/>;
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