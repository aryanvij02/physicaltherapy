/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ImBpFDFfRs1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { JSX, SetStateAction, SVGProps, useState } from "react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type MyComponentProps = {
    setCurrentState: React.Dispatch<React.SetStateAction<string>>;
    setReps: React.Dispatch<React.SetStateAction<string>>;
    setIntervalPerSetTrain: React.Dispatch<React.SetStateAction<string>>;
    setIntervalBetweenSetsTrain: React.Dispatch<React.SetStateAction<string>>;
    setStartRep: React.Dispatch<React.SetStateAction<string>>;
    setExercise: React.Dispatch<React.SetStateAction<string>>;
    exercise: string

  };

export default function NewExercise({setExercise, exercise, setCurrentState, setReps, setIntervalPerSetTrain, setIntervalBetweenSetsTrain, setStartRep}: MyComponentProps) {

    function handleRep(event: { target: { value: SetStateAction<string> } }) {
        setReps(event.target.value)
        setStartRep(event.target.value)
      }
    

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-background px-4 md:px-6 h-14 flex items-center justify-between shadow">
        <Link href="#" className="flex items-center gap-2" prefetch={false} onClick={() => setCurrentState('landing')}>
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="text-primary font-bold">Physio Assist</span>
        </Link>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <SettingsIcon className="h-6 w-6" />
          <span className="sr-only">Settings</span>
        </Button>
      </header>
      <main className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Exercise Creator</h1>
        <p className="mb-5 text-gray-500">Get ready to train your own personalized exercise!</p>
        <p className="mb-5 text-gray-800">You will be recording each ideal rep individually. Please select the time interval and number of reps below.</p>
        <div className="space-y-4">
          {/* <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter exercise name" />
          </div> */}
          <div className="relative">
              <label htmlFor="exercise" className="block text-sm font-medium text-muted-foreground mb-2">
                Exercise
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="justify-between w-full">
                    <span>{exercise}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setExercise("Squats")}>Squats</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setExercise("Arm Extension")}>Arm Extension</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setExercise("Lean Forward")}>Lean forward</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Enter exercise description" className="min-h-[100px]" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="target-muscle">Target Muscle</Label>
            <Input id="target-muscle" placeholder="Enter target muscle" />
          </div>
          <div className="space-y-2">
            <Label >Number of Reps</Label>
            <Input id="reps" placeholder="Enter reps" onChange={handleRep}/>
          </div>
          <div className="space-y-2">
            <Label >Interval For Each Rep</Label>
            <Input id="interval-rep" placeholder="Interval for each rep" onChange={(event) => {setIntervalPerSetTrain(event.target.value)}}/>
          </div>
          <div className="space-y-2">
            <Label >Interval Between Reps</Label>
            <Input id="interval" placeholder="Interval between reps" onChange={(event) => {setIntervalBetweenSetsTrain(event.target.value)}}/>
          </div>
          <Button onClick={() => setCurrentState('train')}>Record new exercise</Button>
        </div>
      </div>
    </main>
    </div>
  )
}

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }

  function SettingsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function ChevronDownIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
        <path d="m6 9 6 6 6-6" />
      </svg>
    )
  }
  