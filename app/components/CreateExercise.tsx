/**
 * v0 by Vercel.
 * @see https://v0.dev/t/2ziZGpOhcRT
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { JSX, SVGProps, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

type MyComponentProps = {
  setCurrentState: React.Dispatch<React.SetStateAction<string>>;
  setExercise: React.Dispatch<React.SetStateAction<string>>;
  setReps: React.Dispatch<React.SetStateAction<string>>;
  setIntervals: React.Dispatch<React.SetStateAction<string>>;
};

export default function CreateExercise({ setCurrentState, setExercise, setReps, setIntervals } : MyComponentProps) {
  const [selectedExercise, setSelectedExercise] = useState("Select Exercise")
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
      {/* Added flex-grow to main */}
      <main className="flex-1 flex flex-col container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20 space-y-8">
        <div className="flex-grow">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary text-blue-700">
              Optimize your physical therapy recovery!
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Select the details below to refine your virtual assistant.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="relative">
              <label htmlFor="exercise" className="block text-sm font-medium text-muted-foreground mb-2">
                Exercise
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="justify-between w-full">
                    <span>{selectedExercise}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onSelect={() => setExercise("Squats")}>Squats</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setExercise("Front Leans")}>Front Leans</DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => setExercise("Lean Forward")}>Lean forward</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex w-full items-center space-x-2">
              <Input type="number" placeholder="Reps per interval" onChange={(event) => setReps(event.target.value)}/>
            </div>
            <div className="flex w-full items-center space-x-2">
              <Input type="number" placeholder="Number of intervals" onChange={(event) => setIntervals(event.target.value)}/>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8 mb-20">
          <Button variant="outline">Back</Button>
          <Button onClick={() => setCurrentState('train')}>Next</Button>
        </div>
      </main>
    </div>
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


function DotIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
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
      <circle cx="12.1" cy="12.1" r="1" />
    </svg>
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