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
import LoadingPage from "./components/LoadingPage";
import { SquatData } from "@/utils/types";
import { saveTrainingData } from "@/utils/savetrainingdata";


export default function Home() {
  const [currentState, setCurrentState] = useState('newexercise'); // Initial state
  const [exercise, setExercise] = useState(''); // Initial exercise
  const [startRep, setStartRep] = useState('0')
  const [reps, setReps] = useState('0')
  const [intervalsExecute, setIntervalsExecute] = useState('0')
  const [intervalPerSetTrain, setIntervalPerSetTrain] = useState('0')
  const [intervalBetweenSetsTrain, setIntervalBetweenSetsTrain] = useState('0')

  //Saved training data
  const [trainingData, setTrainingData] = useState<any[]>([])


  const renderComponent = () => {
    console.log(currentState);
    switch (currentState) {
      case 'loadingpagetraining':
        return <LoadingPage loadingText={"Get ready to do your rep"} setReps={setReps} setCurrentState={setCurrentState} reps={reps} intervalBetweenSetsTrain={intervalBetweenSetsTrain}/>
      case 'landing':
        return <LandingPage setCurrentState={setCurrentState}/>
      case 'savetrainingdata':
        const strTrainingData = JSON.stringify(trainingData)
        console.log('This is training data all', trainingData)
        saveTrainingData(strTrainingData)
        setCurrentState('home')
        return 
      case 'home':
        return <CreateExercise setCurrentState={setCurrentState} setExercise={setExercise} setReps={setReps} setStartRep={setStartRep} setIntervals={setIntervalsExecute}/>
      case 'fit':
        return <FitInView setCurrentState={setCurrentState}/>;
      case 'train':
        return <TrainExercise exercise={exercise} trainingData={trainingData} setTrainingData={setTrainingData} reps={reps} setReps={setReps} startRep={startRep} intervalPerSetTrain={intervalPerSetTrain} intervalBetweenSetsTrain={intervalBetweenSetsTrain} setCurrentState={setCurrentState}/>;
      case 'newexercise':
        return <NewExercise exercise={exercise} setExercise={setExercise} setCurrentState={setCurrentState} setReps={setReps} setStartRep={setStartRep} setIntervalPerSetTrain={setIntervalPerSetTrain} setIntervalBetweenSetsTrain={setIntervalBetweenSetsTrain}/>;
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

