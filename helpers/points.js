// This function calculates the estimated time of accomplishment
export const calcEstimatedAccomplishTime = (maxPoints) => {
   return 1.2 * maxPoints;
};

// This function calculates the total points (Forms mode), the potential bonus points included
export const calcTotalPointsForms = (
   counterState,
   estimatedAccomplishTime,
   points,
   maxPoints
) => {
   if (counterState <= estimatedAccomplishTime && points === maxPoints) {
      return points + counterState * 0.05;
   } else if (counterState > estimatedAccomplishTime && points === maxPoints) {
      return (points - counterState * 0.05);
   } else if (counterState <= estimatedAccomplishTime && points > 0 && points < maxPoints) {
      return points + counterState * 0.02;
   } else if (counterState > estimatedAccomplishTime && points > 0 && points < maxPoints) {
      return (points - counterState * 0.05)
   } else if (points === 0) {
      return 0;
   } else {
      return points * 1.0;
   }
};

// This function calculates the total percentage of mastery
export const calcTotalPercentage = (totalPoints, maxPoints) => {
   return (totalPoints / maxPoints) * 100.0;
};

// This function calculates the number of correct answers from the number of points (without bonus points)
export const calcNumberCorrectAnswersForms = (points) => {
   return points / 10;
};

// This function is used for getting the number of correct answers
export const calcNumberCorrectAnswersMeanings = (answered) => {
   return answered.filter((answer) => answer.accuracy === 'correct').length;
};

// Accuracy percentage, i.e. number of points divided by max points
export const calcAccuracyPercentage = (points, maxPoints) => {
   return (points / maxPoints) * 100.0;
};

export const calcTotalPointsMeanings = (
   startTime,
   endTime,
   accuracyPercentage,
   points,
   numberQuestions
) => {
   let timeElapsed = endTime - startTime;
   // If the user has spent less than 3 seconds * number of questions, and accuracy is at least 80 %, extra points are given
   if (timeElapsed < (numberQuestions * 2000) && accuracyPercentage >= 80) {
      let extraPoints = ((timeElapsed * -1) + (numberQuestions * 2000)) / 100.00;
      console.log('extraPoints ', extraPoints);
      return points + extraPoints;
   } else {
      return points * 1.0;
   }
};

// This function is responsible for calculating the points in Forms mode
export const calcPoints = (points, amount) => {
   return points + amount;
};

// This function is responsible for calculating the difference between start and end date
export const calcTime = (startTime, endTime) => {
   console.log('difference ', endTime - startTime);
   return endTime - startTime;
};
