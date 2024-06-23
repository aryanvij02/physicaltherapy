export const bodyPartNames = {
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
