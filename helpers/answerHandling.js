export const prepareAnswerGerman = (answer) => {
   // The function prepares the given answers for accuracy check using several string operations
   let preparedAnswer = '';
   let stringArray = answer
      .trim()
      .replace('/', '')
      // Replace German sharp S with the string '1'
      .replace(/\u00df/g, '1')
      .toUpperCase()
      .toLowerCase()
      .split(' ');
   console.log('stringArray: ', stringArray);
   let withoutPronounsArray = stringArray.filter(
      (word) =>
         word !== 'er' &&
         word !== 'sie' &&
         word !== 'es' &&
         word !== 'er/sie' &&
         word !== 'er/sie/es'
   );
   console.log('WithoutPronounsArray: ', withoutPronounsArray)
   // Replace string '1' with German sharp S
   for (let i = 0; i < withoutPronounsArray.length; i++) {
      preparedAnswer += ' ' + withoutPronounsArray[i].replace('1', '\u00df');
   }
   console.log('PreparedAnswer: ', preparedAnswer)
   return preparedAnswer.trim();
};

export const prepareAnswerSwedish = (answer) => {
   // The function prepares the given answers for accuracy check using several string operations
   let preparedAnswer = '';
   let stringArray = answer
      .trim()
      .toUpperCase()
      .toLowerCase()
      .split(' ');
   for (let i = 0; i < stringArray.length; i++) {
      preparedAnswer += ' ' + stringArray[i];
      console.log('preparedAnswer from prepareAnswerSwedish: ', preparedAnswer);
   }
   return preparedAnswer.trim();
};

export const checkAnswerStrings = (preparedAnswer, correct, correctAlt) => {
   // The function checks if the prepared answer matches with the correct answer and returns true if they match
   // Check if the correct answer is an array (i.e. if it has synonymous forms)
   if (Array.isArray(correct)) {
      for (let i = 0; i < correct.length; i++) {
         if (preparedAnswer && preparedAnswer === correct[i].replace('/', '')) {
            return true;
         }
      }
/*             if (preparedAnswer && preparedAnswer === correctAlt[i].replace('/', '')) {
            return true;
         } */
   }
   if (!Array.isArray(correct) && preparedAnswer === correct) {
      return true;
   }
   if (correctAlt && correctAlt.length > 0 && preparedAnswer === correctAlt) {
      return true;
   }
};
