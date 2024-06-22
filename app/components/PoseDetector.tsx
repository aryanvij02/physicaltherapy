'use client'
import React, { useEffect, useRef, useState } from 'react';
import { PoseLandmarker, FilesetResolver, PoseLandmarkerResult } from '@mediapipe/tasks-vision';

const PoseDetector = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [poseLandmarker, setPoseLandmarker] = useState<PoseLandmarker | null>(null);
  const [videoObtained, setVideoObtained] = useState(false);

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
          console.log('Video obtained')
        }
      } catch (error) {
        console.error('Error accessing the media devices.', error);
      }
    };

    getVideo();
  }, []);

  useEffect(() => {
    if (poseLandmarker && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      let lastVideoTime = -1;

      const renderLoop = async function () {
        if (video.currentTime !== lastVideoTime) {
          const poseLandmarkerResult = await poseLandmarker.detectForVideo(video, performance.now());
          processResults(poseLandmarkerResult, ctx!, video);
          lastVideoTime = video.currentTime;
        }
        requestAnimationFrame(renderLoop);
      };

      video.play().then(renderLoop).catch(err => console.error('Error playing video:', err));
      console.log('Video playing')
    }
  }, [poseLandmarker, videoRef.current]);

  const processResults = function (results: PoseLandmarkerResult, ctx: CanvasRenderingContext2D, video: HTMLVideoElement) {
    if (!results || !ctx || !video) return;
    if (canvasRef.current){
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear previous drawings
        ctx.strokeStyle = 'aqua';
        ctx.lineWidth = 2;

        results.landmarks.forEach(landmarkList => {
            landmarkList.forEach(landmark => {
            // Calculate the actual x and y coordinates based on the canvas size
            const x = landmark.x * canvasRef.current!.width;
            const y = landmark.y * canvasRef.current!.height;
        
            // Draw a circle at the landmark position
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
            ctx.fill();
            });
      });
    }
    
  };

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} width="640" height="480" autoPlay playsInline style={{ position: 'absolute', top: 0, left: 0 }} />
      {/* <canvas ref={canvasRef} width="640" height="480" style={{ position: 'absolute', top: 0, left: 0 }} /> */}
    </div>
  );
};


export default PoseDetector;


