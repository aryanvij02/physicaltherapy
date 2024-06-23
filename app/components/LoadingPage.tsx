import { useEffect, useState } from "react";

interface MyProps {
    loadingText: string;
    setCurrentState: (state: string) => void;
    reps: string
    intervalBetweenSetsTrain: string
    setReps: (reps: string) => void;
  }

export default function LoadingPage({loadingText, setCurrentState, reps, setReps, intervalBetweenSetsTrain}: MyProps) {

    const [countdown, setCountdown] = useState(Number(intervalBetweenSetsTrain));

  //Controls the timer
  if (reps < '0') {
    setCurrentState('home')
  }

  useEffect(() => {
    setReps((Number(reps) - 1).toString())
  }, [])

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
        setCurrentState('train')
    }
  }, [countdown]);

    return (
        <div className="flex min-h-screen items-center justify-center">
        <h1>{countdown}</h1>
        <h2>{loadingText}</h2>
        <h2>{reps}</h2>
        </div>
    );
}