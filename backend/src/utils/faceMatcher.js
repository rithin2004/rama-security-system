export const calculateFaceDistance = (vectorA, vectorB) => {

  if (vectorA.length !== vectorB.length) {
    throw new Error("Face vectors length mismatch");
  }

  let sum = 0;

  for (let i = 0; i < vectorA.length; i++) {
    const diff = vectorA[i] - vectorB[i];
    sum += diff * diff;
  }

  return Math.sqrt(sum);
};


export const verifyFace = (storedVector, incomingVector, threshold = 0.6) => {

  const distance = calculateFaceDistance(storedVector, incomingVector);

  return {
    verified: distance <= threshold,
    distance
  };
};