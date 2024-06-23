import { bodyPartNames, SquatData } from '@/utils/types';
import { NormalizedLandmark } from "@mediapipe/tasks-vision";


function checkJointVisibility(landmark: NormalizedLandmark, partName: string) {
    if (landmark.visibility < 0.5) {
      console.warn(`${partName} is not visible. Please adjust your position to make sure it is visible.`);
      return false;
    }
    return true;
  };
  const logCoordinates = (landmark: NormalizedLandmark, partName: string) => {
    // console.log(`${partName} coordinates - x: ${landmark.x}, y: ${landmark.y}, z: ${landmark.z}`);
};


function calculateThreePointAngle(shoulder: NormalizedLandmark, elbow: NormalizedLandmark, wrist: NormalizedLandmark): number {
  // Vector from elbow to shoulder
  const upperArm = {
    x: shoulder.x - elbow.x,
    y: shoulder.y - elbow.y,
    z: shoulder.z - elbow.z
  };
  // Vector from elbow to wrist
  const forearm = {
    x: wrist.x - elbow.x,
    y: wrist.y - elbow.y,
    z: wrist.z - elbow.z
  };
  // Calculate dot product
  const dotProduct = upperArm.x * forearm.x + upperArm.y * forearm.y + upperArm.z * forearm.z;
  // Calculate magnitudes
  const upperArmMagnitude = Math.sqrt(upperArm.x ** 2 + upperArm.y ** 2 + upperArm.z ** 2);
  const forearmMagnitude = Math.sqrt(forearm.x ** 2 + forearm.y ** 2 + forearm.z ** 2);
  // Calculate angle
  const cosAngle = dotProduct / (upperArmMagnitude * forearmMagnitude);
  const angle = Math.acos(Math.max(-1, Math.min(1, cosAngle))) * (180 / Math.PI);
  return angle;
}

export function calculateSquatAngle(landmarksList: NormalizedLandmark[], setIncludedLandmarks: any, displayText: any, setDisplayText: any, reps: string) {
    // Vector from elbow to shoulder
    const squatJoint = [11, 12, 23, 24, 25, 26, 27, 28]
    const jointsRight = [12, 24, 26, 28]
    const jointsLeft = [11, 23, 25, 27]
    // const [currentJointFocus, setCurrentJointFocus] = useState("right")

    let sumLeft = 0;
    let sumRight = 0;
    if (landmarksList){
        for (let joint of squatJoint) {
            const landmark = landmarksList[joint]
            const visibleValue = landmark.visibility
            if (visibleValue === undefined) {
                console.log("Joint not visible", bodyPartNames[joint]);
            } else {
                if (jointsLeft.includes(joint)) {
                    sumLeft += visibleValue;
                } else if (jointsRight.includes(joint)) {
                    sumRight += visibleValue;
                }
            }
        }
    
    

    if (sumLeft > sumRight) {
        setIncludedLandmarks(jointsLeft);
        const dispText: string = "Focus is on your left side"
        if (dispText != displayText) {
            // console.log("Only sets when the there is a change Left")
            setDisplayText(dispText)
        }
            const angleHip = calculateThreePointAngle(
                landmarksList[12], // left shoulder
                landmarksList[24], // left hip
                landmarksList[26]  // left kneee
              );
            
            const angleKnee = calculateThreePointAngle(
                landmarksList[24], // left hip
                landmarksList[26], // left knee
                landmarksList[28]  // left ankle
              );
    
            const oneSquatMetric = {
                'rep': reps,
                'angleHip': angleHip,
                'angleKnee': angleKnee,
            }
            return oneSquatMetric
        
        
    } else {
        setIncludedLandmarks(jointsRight);
        const dispText = "Focus is on your right side"
        if (dispText != displayText) {
            // console.log("Only sets when the there is a change Right")
            setDisplayText(dispText)
        }
            const angleHip = calculateThreePointAngle(
                landmarksList[12], // left shoulder
                landmarksList[23], // left hip
                landmarksList[25]  // left kneee
            );
            
            const angleKnee = calculateThreePointAngle(
                landmarksList[23], // left hip
                landmarksList[25], // left knee
                landmarksList[27]  // left ankle
            );

            const oneSquatMetric = {
                'rep': reps,
                'angleHip': angleHip,
                'angleKnee': angleKnee,
            }
            return oneSquatMetric
        
    }

    }
}

export function calculateArmExtension(landmarksList: NormalizedLandmark[], setIncludedLandmarks: any, displayText: any, setDisplayText: any, reps: string) {
    // Vector from elbow to shoulder
    const armJoints = [15, 13, 11, 12, 14, 16, 23, 24]
    // const [currentJointFocus, setCurrentJointFocus] = useState("right")
    
    
    setIncludedLandmarks(armJoints)
    const rightElbow = calculateThreePointAngle(
        landmarksList[16],
        landmarksList[14],
        landmarksList[12],
    )

    const leftElbow = calculateThreePointAngle(
        landmarksList[15],
        landmarksList[13],
        landmarksList[11],
    )

    const oneRepMetric = {
        'rep': reps,
        'rightElbow': rightElbow,
        'leftElbow': leftElbow,
    }
    return oneRepMetric
}




// export function calculateAngle(landmarksList: NormalizedLandmark[]) {
// //   console.log("Landmarks List");
// //   console.log(landmarksList);
//   const checkVisibility = (landmark: NormalizedLandmark, partName: string) => {
//     if (landmark.visibility < 0.5) {
//       console.warn(`${partName} is not visible. Please adjust your position to make sure it is visible.`);
//       return false;
//     }
//     return true;
//   };
//   const logCoordinates = (landmark: NormalizedLandmark, partName: string) => {
//     // console.log(`${partName} coordinates - x: ${landmark.x}, y: ${landmark.y}, z: ${landmark.z}`);
//   };
//   const leftShoulderVisible = checkVisibility(landmarksList[11], bodyPartNames[11]);
//   const leftElbowVisible = checkVisibility(landmarksList[13], bodyPartNames[13]);
//   const leftWristVisible = checkVisibility(landmarksList[15], bodyPartNames[15]);
//   const rightShoulderVisible = checkVisibility(landmarksList[12], bodyPartNames[12]);
//   const rightElbowVisible = checkVisibility(landmarksList[14], bodyPartNames[14]);
//   const rightWristVisible = checkVisibility(landmarksList[16], bodyPartNames[16]);
//   if (leftShoulderVisible && leftElbowVisible && leftWristVisible) {
//     logCoordinates(landmarksList[11], bodyPartNames[11]);
//     logCoordinates(landmarksList[13], bodyPartNames[13]);
//     logCoordinates(landmarksList[15], bodyPartNames[15]);
//     const leftElbowAngle = calculateElbowAngle(
//       landmarksList[11], // left shoulder
//       landmarksList[13], // left elbow
//       landmarksList[15]  // left wrist
//     );
//     // console.log("Left Elbow Angle: ", leftElbowAngle);
//   }
//   if (rightShoulderVisible && rightElbowVisible && rightWristVisible) {
//     logCoordinates(landmarksList[12], bodyPartNames[12]);
//     logCoordinates(landmarksList[14], bodyPartNames[14]);
//     logCoordinates(landmarksList[16], bodyPartNames[16]);
//     const rightElbowAngle = calculateElbowAngle(
//       landmarksList[12], // right shoulder
//       landmarksList[14], // right elbow
//       landmarksList[16]  // right wrist
//     );
//     // console.log("Right Elbow Angle: ", rightElbowAngle);
//   }
// }
