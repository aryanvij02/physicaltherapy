'use client'
import React, { useEffect, useRef, useState } from 'react';
import { PoseLandmarker, FilesetResolver, PoseLandmarkerResult } from '@mediapipe/tasks-vision';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

export default function PoseDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [poseLandmarker, setPoseLandmarker] = useState<PoseLandmarker | null>(null);
  const [videoObtained, setVideoObtained] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 700, height: 1000 }); // Default dimensions


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

    function drawOnVideoFeed (results: PoseLandmarkerResult, ctx: CanvasRenderingContext2D, video: HTMLVideoElement,  ) {
        const excludedLandmarks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 18, 20, 22, 21, 15, 19]; // Example indices for unwanted landmarks
        if (!results || !ctx || !canvasRef.current) return;
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        drawConnectors(ctx, results.landmarks[0], [
        [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], // Arms
        [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], // Torso and legs
        ], {color: 'aqua', lineWidth: 2});
        drawLandmarks(ctx, results.landmarks[0].filter((_, index) => !excludedLandmarks.includes(index)), { color: 'green', radius: 1 });


        console.log("These are the results", results.landmarks[0])
    };


    function processSquatResults(results: PoseLandmarkerResult, ctx: CanvasRenderingContext2D, video: HTMLVideoElement) {
        const excludedLandmarks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 18, 20, 22, 21, 15, 19]; // Example indices for unwanted landmarks
        if (!results || !ctx || !canvasRef.current) return;
        ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
        drawConnectors(ctx, results.landmarks[0], [
        [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], // Arms
        [11, 23], [12, 24], [23, 24], [23, 25], [24, 26], [25, 27], [26, 28], // Torso and legs
        ], {color: 'aqua', lineWidth: 2});
        drawLandmarks(ctx, results.landmarks[0].filter((_, index) => !excludedLandmarks.includes(index)), { color: 'green', radius: 1 });


        console.log("These are the results", results.landmarks[0])
    }
    
    const handleMetadataLoaded = () => {
        if (videoRef.current) {
          setDimensions({
            width: videoRef.current.videoWidth,
            height: videoRef.current.videoHeight
          });
        }
    };  
  

    return (
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
      );
      
      
};




