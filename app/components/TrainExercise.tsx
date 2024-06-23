'use client'
import React, { useEffect, useRef, useState } from 'react';
import { PoseLandmarker, FilesetResolver, PoseLandmarkerResult } from '@mediapipe/tasks-vision';
import { drawConnectors, drawLandmarks, NormalizedLandmark } from '@mediapipe/drawing_utils';
import { bodyPartNames } from '@/utils/types';
import { calculateAngle } from '@/utils/calculateangle';

interface PoseDetectorProps {
    exercise: string;
  }

interface LandmarkStuff {
    name: string;
    x: number;
    y: number;
    z: number;
    visibility: number;
}

export default function PoseDetector(props: PoseDetectorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [poseLandmarker, setPoseLandmarker] = useState<PoseLandmarker | null>(null);
  const [videoObtained, setVideoObtained] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 700, height: 1000 }); // Default dimensions
  const [includedLandmarks, setIncludedLandmarks] = useState<number[]>([])
  const [allLandmarks, setAllLandmarks] = useState<LandmarkStuff[]>();
//   bodyParts
    // console.log("Did we reach executes")
  useEffect(() => {
    if (props.exercise === "Squat") {
        setIncludedLandmarks([11, 12, 23, 24, 26, 25, 28, 27])
    }
    ///Include more examples for different exercises

    const getVideo = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          setVideoObtained(true);
        }
      } catch (error) {
        console.error('Error accessing the media devices.', error);
      }
    };
    getVideo();

  }, []);

  useEffect(() => {
    if (videoObtained) {
      const initializePoseLandmarker = async () => {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );

        const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "/models/pose_landmarker_full.task",
          },
          runningMode: "VIDEO",
          numPoses: 1,
        });

        setPoseLandmarker(poseLandmarker);
      };
      initializePoseLandmarker();
    }
  }, [videoObtained]);


  //Here is where the poseLandmarsk are available
  useEffect(() => {
    if (poseLandmarker && videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas!.getContext('2d');
      let lastVideoTime = -1;

      const renderLoop = async function () {
        if (video.currentTime !== lastVideoTime) {
            //This is where the landmarks are retrieved
          const poseLandmarkerResult = await poseLandmarker.detectForVideo(video, performance.now());
          const anglesAtJoints = calculateAngle(poseLandmarkerResult.landmarks[0])
         
          //Calling function to draw on the screen
          drawOnVideoFeed(poseLandmarkerResult, ctx!, video);
          lastVideoTime = video.currentTime;
        }
        requestAnimationFrame(renderLoop);
      };

      video.play().then(renderLoop).catch(err => console.error('Error playing video:', err));
    }
  }, [poseLandmarker, videoRef.current]);



function drawOnVideoFeed (results: PoseLandmarkerResult, ctx: CanvasRenderingContext2D, video: HTMLVideoElement,  ) {
    //This is selecting only specific landamrks
    const temporaryLandmarks: LandmarkStuff[] = [];

    for (let i = 0; i < results.landmarks[0].length; i++) {
        const current = {
            name: bodyPartNames[i],
            x: results.landmarks[0][i].x,
            y: results.landmarks[0][i].y,
            z: results.landmarks[0][i].z,
            visibility: results.landmarks[0][i].visibility
        }
        temporaryLandmarks.push(current)
    }
    setAllLandmarks(temporaryLandmarks)

    results.landmarks[0]
    if (!results || !ctx || !canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
    drawConnectors(ctx, results.landmarks[0], [
    [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], // Arms
    [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], // Torso and legs
    ], {color: 'aqua', lineWidth: 2});

    if (results.landmarks[0]) {
        const filteredLandmarks = results.landmarks[0].filter((_, index) => includedLandmarks.includes(index))
        
        drawLandmarks(ctx, filteredLandmarks, { color: 'green', radius: 1 });
        // console.log("These are the results", filteredLandmarks)

    }
};

    const handleMetadataLoaded = () => {
        if (videoRef.current) {
            setDimensions({
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight
            });
        }
    };  
  

    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className={`relative w-[${dimensions.width}px] h-[${dimensions.height}px] overflow-hidden`}>
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full z-10"
              autoPlay
              playsInline
              onLoadedMetadata={handleMetadataLoaded}
            >
              <p className="flex justify-center items-center text-white text-2xl h-full">
                Your browser does not support the video tag.
              </p>
            </video>
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full z-20"
            />
          </div>
          <div>
          <h1>Now we are here!</h1>
        </div>
      </div>
        
      );
      
      
};




