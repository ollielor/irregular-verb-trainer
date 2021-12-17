// This function calculates the estimated time of accomplishment, i.e. on average 4 seconds per question
export const calcEstimatedAccomplishTime = (maxPoints) => {
   return 4000 * (maxPoints / 10);
};

// This function calculates the total points (Forms mode), the potential bonus points included
export const calcTotalPointsForms = (
   startTime,
   endTime,
   estimatedAccomplishTime,
   points,
   maxPoints
) => {
   let timeElapsed = new Date(endTime) - new Date(startTime);
   if (timeElapsed > 0 && timeElapsed <= estimatedAccomplishTime && points === maxPoints) {
      return points + ((timeElapsed * -1 + estimatedAccomplishTime) / 1000.00);
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
   let timeElapsed = new Date(endTime) - new Date(startTime);
   let timePerQuestion = 3000;
   // If the user has spent less than 3 seconds on average on given number of questions, and accuracy is at least 80 %, extra points are given
   if (timeElapsed < (numberQuestions * timePerQuestion) && timeElapsed > 0 && accuracyPercentage >= 80) {
      let extraPoints = ((timeElapsed * -1) + (numberQuestions * timePerQuestion)) / 1000.00;
      let extraPointsAccuracy = extraPoints * accuracyPercentage / 100.00;
      return points + extraPointsAccuracy;
   } else {
      return points * 1.0;
   }
};

// This function is responsible for calculating the points in Forms mode
export const calcPoints = (points, amount) => {
   return points + amount;
};