import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { bodyPartNames } from '@/utils/types';
function calculateElbowAngle(shoulder: NormalizedLandmark, elbow: NormalizedLandmark, wrist: NormalizedLandmark): number {
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
export function calculateAngle(landmarksList: NormalizedLandmark[]) {
  console.log("Landmarks List");
  console.log(landmarksList);
  const checkVisibility = (landmark: NormalizedLandmark, partName: string) => {
    if (landmark.visibility < 0.5) {
      console.warn(`${partName} is not visible. Please adjust your position to make sure it is visible.`);
      return false;
    }
    return true;
  };
  const logCoordinates = (landmark: NormalizedLandmark, partName: string) => {
    console.log(`${partName} coordinates - x: ${landmark.x}, y: ${landmark.y}, z: ${landmark.z}`);
  };
  const leftShoulderVisible = checkVisibility(landmarksList[11], bodyPartNames[11]);
  const leftElbowVisible = checkVisibility(landmarksList[13], bodyPartNames[13]);
  const leftWristVisible = checkVisibility(landmarksList[15], bodyPartNames[15]);
  const rightShoulderVisible = checkVisibility(landmarksList[12], bodyPartNames[12]);
  const rightElbowVisible = checkVisibility(landmarksList[14], bodyPartNames[14]);
  const rightWristVisible = checkVisibility(landmarksList[16], bodyPartNames[16]);
  if (leftShoulderVisible && leftElbowVisible && leftWristVisible) {
    logCoordinates(landmarksList[11], bodyPartNames[11]);
    logCoordinates(landmarksList[13], bodyPartNames[13]);
    logCoordinates(landmarksList[15], bodyPartNames[15]);
    const leftElbowAngle = calculateElbowAngle(
      landmarksList[11], // left shoulder
      landmarksList[13], // left elbow
      landmarksList[15]  // left wrist
    );
    console.log("Left Elbow Angle: ", leftElbowAngle);
  }
  if (rightShoulderVisible && rightElbowVisible && rightWristVisible) {
    logCoordinates(landmarksList[12], bodyPartNames[12]);
    logCoordinates(landmarksList[14], bodyPartNames[14]);
    logCoordinates(landmarksList[16], bodyPartNames[16]);
    const rightElbowAngle = calculateElbowAngle(
      landmarksList[12], // right shoulder
      landmarksList[14], // right elbow
      landmarksList[16]  // right wrist
    );
    console.log("Right Elbow Angle: ", rightElbowAngle);
  }
}










