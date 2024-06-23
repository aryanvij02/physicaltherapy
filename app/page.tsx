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
import { ElbowDataList, SquatData } from "@/utils/types";
import { saveTrainingData } from "@/utils/savetrainingdata";
import HomePage from "./components/HomePage";
import AudioPlayer from "./components/AudioPlayer";


export default function Home() {
  const [currentState, setCurrentState] = useState('home'); // Initial state
  const [exercise, setExercise] = useState(''); // Initial exercise
  const [startRep, setStartRep] = useState('0')
  const [reps, setReps] = useState('0')
  const [executionReps, setExecutionReps] = useState('0')
  const [intervalsExecute, setIntervalsExecute] = useState('0')
  const [intervalBetweenSetsTrain, setIntervalBetweenSetsTrain] = useState('0')
  const [thresholds, setThresholds] = useState<ElbowDataList[]>([]); // Thresholds for the exercise
  const [exercises, setExercises] = useState<string[]>(['Squats', 'Hip Flexion', 'Front Lean']);

  const [intervalPerSetTrain, setIntervalPerSetTrain] = useState('0')
  const[sets, setSets] = useState('0')


  //Saved training data
  const [trainingData, setTrainingData] = useState<any[]>([])


  const fetchThresholdText = async () => {
    console.log("Does fetch run")
    try {
      const response = await fetch('http://127.0.0.1:5002/');
      console.log("respos", response.text)
      if (response.ok) {
        const data = await response.json();
        console.log("Data from file", data.text)
        const parsedData: ElbowDataList[] = JSON.parse(data.text)
        console.log("Data from parsed", parsedData)

        setThresholds(parsedData);
      } else {
        console.error('Failed to fetch threshold text');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    console.log("This is a threshold", thresholds);
  }, [thresholds]);


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
        return <HomePage intervalPerSetTrain={intervalPerSetTrain} sets={sets} setSets={setSets} setIntervalPerSetTrain={setIntervalPerSetTrain} exercises={exercises} setCurrentState={setCurrentState} reps={reps} setReps={setReps} setStartRep={setStartRep} exercise={exercise} thresholds={thresholds}/>
        // return <CreateExercise setCurrentState={setCurrentState} setExercise={setExercise} setReps={setReps} setStartRep={setStartRep} setIntervals={setIntervalsExecute}/>
      case 'train':
        return <TrainExercise exercise={exercise} trainingData={trainingData} setTrainingData={setTrainingData} reps={reps} setReps={setReps} startRep={startRep} intervalPerSetTrain={intervalPerSetTrain} intervalBetweenSetsTrain={intervalBetweenSetsTrain} setCurrentState={setCurrentState}/>;
      case 'newexercise':
        // setExercises([...exercises, "Arm Extension"])
        return <NewExercise exercises={exercises} setExercises={setExercises} exercise={exercise} setExercise={setExercise} setCurrentState={setCurrentState} setReps={setReps} setStartRep={setStartRep} setIntervalPerSetTrain={setIntervalPerSetTrain} setIntervalBetweenSetsTrain={setIntervalBetweenSetsTrain}/>;
      // case 'selectcreatedexercise': 
      //   return <HomePage exercises={exercises}setCurrentState={setCurrentState} reps={reps} setReps={setReps} setStartRep={setStartRep} exercise={exercise} thresholds={thresholds}/>
      case 'fit':
        return <FitInView setCurrentState={setCurrentState}/>;
      case 'execute':
        //Call a function that finds them min max threshold and passes into execureexercises
        fetchThresholdText()
        console.log("These are the thresholds", thresholds)
        return <ExecuteExercise setCurrentState={setCurrentState} thresholds={thresholds} intervalPerSetTrain={intervalPerSetTrain} reps={reps} sets={sets}/>;
      // case 'summary':
      //   return <ExerciseSummary />;
      case 'audio':
        return <AudioPlayer />
      default:
        return
    }
  };

  return (
    <main className="">
      {renderComponent()}
    </main>
  );
}

