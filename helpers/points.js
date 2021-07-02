// This function calculates the estimated time of accomplishment
export const calcEstimatedAccomplishTime = (maxPoints) => {
   return 1.2 * maxPoints;
}

// This function calculates the total points, the potential bonus points included
export const calcTotalPoints = (counterState, estimatedAccomplishTime, points, maxPoints) => {
   if (counterState <= estimatedAccomplishTime && points === maxPoints) {
      return points + counterState * 0.05;
   } else if (points === 0) {
      return points * 1.0;
   } else {
      return (points - counterState * 0.1) * 1.0;
   }
}

// This function calculates the total percentage of mastery
export const calcTotalPercentage = (totalPoints, maxPoints) => {
   return (totalPoints / maxPoints) * 100.0;
}

// This function calculates the amount of correct answers from the amount of points (without bonus points) 
export const calcAmountCorrectAnswers = (points) => {
   return points / 10;
}
