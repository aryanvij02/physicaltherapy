import { useState, useEffect } from "react";

export default function AudioPlayer() {
  const [audioPlaying, setAudioPlaying] = useState(true);  // Autoplay set to true
  const [audioDuration, setAudioDuration] = useState(0);

  useEffect(() => {
    const audio = new Audio("/response.mp3");
    audio.loop = true;

    const playAudio = () => {
      audio.play().then(() => {
        setAudioDuration(audio.duration);
      }).catch(error => console.log("Error playing the audio", error));
    };

    const pauseAudio = () => {
      audio.pause();
    };

    // Play audio automatically on mount
    playAudio();

    // Function to toggle audio play/pause
    const togglePlayPause = () => {
      if (audioPlaying) {
        pauseAudio();
        setAudioPlaying(false);
      } else {
        playAudio();
        setAudioPlaying(true);
      }
    };

    // Set event listeners for play/pause actions
    return () => {
      pauseAudio();
      audio.currentTime = 0; // Reset audio to start
    };
  }, [audioPlaying]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="space-y-4 text-center">
        <h2 className="text-2xl font-bold text-black">Hear your feedback here!</h2>
        <div className="bg-primary text-primary-foreground rounded-full w-32 h-32 flex items-center justify-center text-6xl font-bold mx-auto">
          {Math.floor(audioDuration)}
        </div>
        <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setAudioPlaying(!audioPlaying)}>
          {audioPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}