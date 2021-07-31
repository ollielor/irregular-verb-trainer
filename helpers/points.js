// This function calculates the estimated time of accomplishment
export const calcEstimatedAccomplishTime = (maxPoints) => {
   return 1.2 * maxPoints;
}

// This function calculates the total points (Forms mode), the potential bonus points included
export const calcTotalPointsForms = (counterState, estimatedAccomplishTime, points, maxPoints) => {
   if (counterState <= estimatedAccomplishTime && points === maxPoints) {
      return points + counterState * 0.05;
   } else if (points === 0) {
      return points * 1.0;
   } else {
      return (points - counterState * 0.05) * 1.0;
   }
};

// This function calculates the total percentage of mastery
export const calcTotalPercentage = (totalPoints, maxPoints) => {
   return (totalPoints / maxPoints) * 100.0;
};

// This function calculates the amount of correct answers from the amount of points (without bonus points) 
export const calcAmountCorrectAnswersForms = (points) => {
   return points / 10;
};


// This function is used for getting the amount of correct answers
export const calcAmountCorrectAnswersMeanings = (answered) => {
   return answered.filter((answer) => answer.accuracy === 'correct').length;
};

// Accuracy percentage, i.e. points amount divided by max points
export const calcAccuracyPercentage = (points, maxPoints) => {
   return (points / maxPoints) * 100.0;
};
         
export const calcTotalPointsMeanings = (counterState, accuracyPercentage, points) => {
   // If time elapsed is less than 15 seconds and accuracy is at least 80 %, extra points are given
   if (counterState < 15 && accuracyPercentage >= 80) {
      return (points + counterState * 0.1) * 1.0;
   // If time elapsed is greater than 30, minus points are given
   } else if (counterState >= 30) {
      return (points - counterState * 0.1) * 1.0;
   // If time elapsed is average (not under 10 seconds or over 30 seconds), no bonus or minus points are given
   } else {
      return points * 1.0;
   }
};

// This function is responsible for calculating the points in Forms mode
export const calcPoints = (points, amount) => {
   return points + amount;
}

