// This function calculates the estimated time of accomplishment on each level (average of 5s / 6s / 7s on each question)
export const calcEstimatedAccomplishTime = (maxPoints, level) => {
   switch (level) {
      case 1: 
         return 5000 * (maxPoints / 10);
         break;
      case 2:
         return 6000 * (maxPoints / 10);
         break;
      case 3:
         return 7000 * (maxPoints / 10);
         break;
      case 4:
         return 6000 * (maxPoints / 10);
         break;
   }
};

// This function calculates the total points (Forms mode), the potential bonus points included
export const calcTotalPointsForms = (
   startTime,
   endTime,
   estimatedAccomplishTime,
   points,
   maxPoints
) => {
   let timeElapsed = endTime - startTime;
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
   let timeElapsed = endTime - startTime;
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