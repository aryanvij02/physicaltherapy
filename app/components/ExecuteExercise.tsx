'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PoseLandmarker, FilesetResolver, PoseLandmarkerResult } from '@mediapipe/tasks-vision';
import { drawConnectors, drawLandmarks, NormalizedLandmark } from '@mediapipe/drawing_utils';
import { bodyPartNames, ElbowDataList, SquatData } from '@/utils/types';
import { calculateArmExtension, calculateSquatAngle } from '@/utils/calculateangle';
import { Button } from '@/components/ui/button';
interface PoseDetectorProps {
    intervalPerSetTrain: string
    reps: string
    sets: string
    setCurrentState: React.Dispatch<React.SetStateAction<string>>;
    thresholds: ElbowDataList[]  
  }
interface LandmarkStuff {
    name: string;
    x: number;
    y: number;
    z: number;
    visibility: number;
}

export default function PoseDetector({thresholds, intervalPerSetTrain, reps, sets, setCurrentState}: PoseDetectorProps) {
    const initialReps = reps
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [poseLandmarker, setPoseLandmarker] = useState<PoseLandmarker | null>(null);
  const [videoObtained, setVideoObtained] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 700, height: 1000 }); // Default dimensions
  //includedLandmarks decides which landmarks to use
  const [includedLandmarks, setIncludedLandmarks] = useState<number[]>([])
  const [allLandmarks, setAllLandmarks] = useState<LandmarkStuff[]>();
  //DisplayText can help determine which ones to use
  const [displayText, setDisplayText] = useState<string>("")
  const [countdown, setCountdown] = useState(Number(intervalPerSetTrain))
  const [startCountdown, setStartCountdown] = useState(false);

  const [informationText, setInformationText] = useState<string>("")

  const [leftElbowAngle, setLeftElbowAngle] = useState(0);
    const [rightElbowAngle, setRightElbowAngle] = useState(0);
    const [isAtMax, setIsAtMax] = useState({ left: false, right: false });
    const [isAtMin, setIsAtMin] = useState({ left: false, right: false });
    const [repCount, setRepCount] = useState(0);

  // Effect to start the countdown trigger after 3 seconds
  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setStartCountdown(true);
    }, 3000); // 3-second delay

    return () => clearTimeout(delayTimer);
  }, []);

  useEffect(() => {
    //Brute forcing it to always be for arm extension!
    setIncludedLandmarks([15, 13, 11, 12, 14, 16, 23, 24])

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

  useEffect(() => {
    if (poseLandmarker && videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas!.getContext('2d');
      let lastVideoTime = -1;
      const renderLoop = async function () {
        if (video.currentTime !== lastVideoTime) {
          const poseLandmarkerResult = await poseLandmarker.detectForVideo(video, performance.now());

          drawOnVideoFeed(poseLandmarkerResult, ctx!, video);
          lastVideoTime = video.currentTime;
        }
        requestAnimationFrame(renderLoop);
      };
      video.play().then(renderLoop).catch(err => console.error('Error playing video:', err));
    }
  }, [poseLandmarker, videoRef.current]);


  const [timer, setTimer] = useState(0);

  useEffect(() => {
    // This interval will run once and set up a timer that ticks every 100ms
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 100);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  ////
  useEffect(() => {
    // async function angle() {
    //       if (poseLandmarker && videoRef.current) {
    //         const poseLandmarkerResult = await poseLandmarker.detectForVideo(videoRef.current, performance.now());
            
    //         //Once again only used for arm extension
    //         const currPose = calculateArmExtension(poseLandmarkerResult.landmarks[0], setIncludedLandmarks, displayText, setDisplayText, reps)
    //           if (currPose) {
    //             console.log("Current Pose", currPose)
    //             console.log('left', currPose.leftElbow)
    //         }
    //       }
    //     }

    async function angle() {
        if (poseLandmarker && videoRef.current) {
          const poseLandmarkerResult = await poseLandmarker.detectForVideo(videoRef.current, performance.now());
          
          const currPose = await calculateArmExtension(poseLandmarkerResult.landmarks[0], setIncludedLandmarks, displayText, setDisplayText, reps)
          if (currPose) {
            console.log("Current Pose", currPose)
            console.log('left', currPose.leftElbow)
            console.log("threshold", thresholds)
            
            setLeftElbowAngle(currPose.leftElbow);
            setRightElbowAngle(currPose.rightElbow);


      
            // Check if both elbows are at max
            // console.log("Thres", thresholds[0]['leftElbow'].max)
                // if (currPose.leftElbow >= thresholds[0][0]['leftElbow'].max && currPose.rightElbow >= thresholds[0][0].rightElbow.max) {
                //     setIsAtMax({ left: true, right: true });
                //     setIsAtMin({ left: false, right: false });
                //   }
            
                //   // Check if both elbows are at min after being at max
                //   if (isAtMax.left && isAtMax.right &&
                //       currPose.leftElbow <= thresholds[0][0].leftElbow.min && currPose.rightElbow <= thresholds[0][0].rightElbow.min) {
                //     setIsAtMin({ left: true, right: true });
                //     setRepCount(prevCount => prevCount + 1);
                //     setIsAtMax({ left: false, right: false });
                //   }

            
          }
        }
      }
      
    // if (Number(reps) >= 0 && Number(reps) < Number(initialReps)) {
      angle()
    // }
    
  }, [videoRef.current?.currentTime])


  useEffect(() => {
    if (reps ==  "0") {
    //   setCurrentState('savetrainingdata')
    }
  }, [reps])


function drawOnVideoFeed (results: PoseLandmarkerResult, ctx: CanvasRenderingContext2D, video: HTMLVideoElement,  ) {
    if (results.landmarks[0]) {
      if (!results || !ctx || !canvasRef.current) return;
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      drawConnectors(ctx, results.landmarks[0], [
      [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], // Arms
      [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], // Torso and legs
      ], {color: 'aqua', lineWidth: 2});
      if (results.landmarks[0]) {
          const filteredLandmarks = results.landmarks[0].filter((_, index) => includedLandmarks.includes(index))
          drawLandmarks(ctx, filteredLandmarks, { color: 'green', radius: 1 });
      }
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
            className="top-0 left-0 w-full h-full z-10"
            style={{ transform: 'scaleX(-1)' }}
            autoPlay
            playsInline
            onLoadedMetadata={handleMetadataLoaded}
          >
            <p className="flex justify-center items-center text-white text-2xl h-full">
              Your browser does not support the video tag.
            </p>
        </video>

            <canvas
              style={{ transform: 'scaleX(-1)' }}
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full z-20"
            />
          </div>
          <div>
            <h1>{Number(reps) == Number(initialReps) ? "Align yourself, this is a trial" : `This is start rep ${Number(initialReps) - Number(reps)} rep`}</h1>
        </div>
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
  Reps: {repCount}
</div>
<Button className="mt-24" onClick={() => setCurrentState('audio')}>Next</Button>

      </div>
      );
};

