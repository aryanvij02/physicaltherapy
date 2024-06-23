import { ElbowDataList } from "@/utils/types";

type MyComponentProps = {
    setReps: React.Dispatch<React.SetStateAction<string>>;
    setStartRep: React.Dispatch<React.SetStateAction<string>>;
    exercise: string;
    thresholds: ElbowDataList[];
    reps: string;
    setCurrentState: React.Dispatch<React.SetStateAction<string>>;
    exercises: string[]
    setIntervalPerSetTrain: React.Dispatch<React.SetStateAction<string>>;
    setSets: React.Dispatch<React.SetStateAction<string>>;
    sets: string
    intervalPerSetTrain: string
    
};

"use client";
import { JSX, SVGProps, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HomePage({ intervalPerSetTrain, setIntervalPerSetTrain, setSets, sets, exercises, setCurrentState, reps, thresholds, setReps, setStartRep, exercise }: MyComponentProps) {
  const [selectedCard, setSelectedCard] = useState("");
  const [repsPerSet, setRepsPerSet] = useState(0);
  const [numSets, setNumSets] = useState(0);
  const [setInterval, setSetInterval] = useState(0);

  return (
    <main className="container mx-auto py-12 px-4 md:px-6 relative">
      <h1 className="mb-8 text-3xl font-bold">Exercises</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {exercises && exercises.map(exercise => {
            if (exercise) {
                const exerciseId = exercise.toLowerCase().replace(' ', '-');
          return (
            <div
              key={exerciseId}
              className={`rounded-lg border transition-colors ${
                selectedCard === exerciseId
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
              onClick={() => setSelectedCard(exerciseId)}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold">{exercise}</h3>
              </div>
            </div>
          );

            }
          
        })}
      </div>
      {selectedCard && (
        <div className="mt-8 bg-card rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">{selectedCard.replace(/-/g, " ")}</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reps">Reps per set</Label>
              <Input
                id="reps"
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sets">Number of sets</Label>
              <Input id="sets" type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interval">Interval (seconds)</Label>
              <Input
                id="interval"
                type="number"
                value={intervalPerSetTrain}
                onChange={(e) => setIntervalPerSetTrain(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
      <div className="mt-8 absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-blue-500 shadow-[0_0_15px_0_rgba(59,130,246,0.5)]"
          onClick={() => setCurrentState("newexercise")}
        >
          <PlusIcon className="w-5 h-5 text-white" />
        </Button>
      </div>
      <Button className="mt-24" onClick={() => setCurrentState('execute')}>Next</Button>
    </main>
  );
}

function PlusIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
