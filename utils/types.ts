export interface BodyPartNames {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  13: string;
  14: string;
  15: string;
  16: string;
  17: string;
  18: string;
  19: string;
  20: string;
  21: string;
  22: string;
  23: string;
  24: string;
  25: string;
  26: string;
  27: string;
  28: string;
  29: string;
  30: string;
  31: string;
  32: string;
}

export const bodyPartNames : BodyPartNames = {
  0: 'nose',
  1: 'right eye inner',
  2: 'right eye',
  3: 'right eye outer',
  4: 'left eye inner',
  5: 'left eye',
  6: 'left eye outer',
  7: 'right ear',
  8: 'left ear',
  9: 'mouth right',
  10: 'mouth left',
  11: 'right shoulder',
  12: 'left shoulder',
  13: 'right elbow',
  14: 'left elbow',
  15: 'right wrist',
  16: 'left wrist',
  17: 'right pinky knuckle #1',
  18: 'left pinky knuckle #1',
  19: 'right index knuckle #1',
  20: 'left index knuckle #1',
  21: 'right thumb knuckle #2',
  22: 'left thumb knuckle #2',
  23: 'right hip',
  24: 'left hip',
  25: 'right knee',
  26: 'left knee',
  27: 'right ankle',
  28: 'left ankle',
  29: 'right heel',
  30: 'left heel',
  31: 'right foot index',
  32: 'left foot index'
};

export type Exercise = {
  name: string;
  significantBodyParts: number[];
};
export const exercises: Record<string, Exercise> = {
  "elbowFlexion": {
    name: "Elbow Flexion",
    significantBodyParts: [11, 13, 15, 12, 14, 16] // left shoulder, left elbow, left wrist, right shoulder, right elbow, right wrist
  },
};
