// import { useEffect, useRef } from 'react';
// import @mediapipe/drawing_utils;
// const Webcam = () => {
//     const videoRef = useRef<HTMLVideoElement>(null);

//     useEffect(() => {
//         const loadMediaPipe = async () => {
//             // Load MediaPipe dependencies
//             await Promise.all([
//                 import('@mediapipe/drawing_utils'),
//                 import('@mediapipe/pose'),
//             ]);

//             // Access the webcam stream
//             const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//             if (videoRef.current) {
//                 videoRef.current.srcObject = stream;
//             }
//         };

//         loadMediaPipe();
//     }, []);

//     return <video ref={videoRef} autoPlay playsInline />;
// };

// export default Webcam;