// This function generates a random integer for the randomizing of verbs
// The random integer creation starts from 1
export const rndIntGenerator = (highest) => {
   return Math.floor(Math.random() * highest) + 1;
};

// This function generates a random integer for the randomizing of feedback texts
// The random integer creation starts from 0
export const rndIntGeneratorZero = (highest) => {
   return Math.floor(Math.random() * highest);
};

export const getRandomVerb = (rndInt, verbs) => {
   return verbs[rndInt];
};

/* export const getRandomVerbArray = (rndInt, verbs) => {
   let verbsArray = [];
   let matchingVerbs = verbs.filter((verb) => verb.meaning_id === rndInt);
   for (let i = 0; i < matchingVerbs.length; i++) {
      verbsArray.push(matchingVerbs[i]);
   }
   if (verbsArray.length > 0) {
      return verbsArray;
   }
}; */

// This function creates an array of verbs with same meaning
export const getRandomVerbArray = (rndInt, verbs) => {
   let verbsArray= [];
   let matchingVerbs = [];
   matchingVerbs = verbs.filter((verb) => verb.meaning_id === rndInt);
   verbsArray = matchingVerbs.map((matchingVerbArray) => matchingVerbArray);
   if (verbsArray.length > 0) {
      return verbsArray;
   }
   //verbsArray = matchingVerbs.map((matchingVerbArray) => matchingVerbArray);
/*    console.log('verbsArray: ', verbsArray);
   if (verbsArray.length > 0) {
      return verbsArray;
   } */
}

export const filterVerbsByLevel = (verbs, level) => {
   switch (level) {
      case 1:
         return verbs.filter((verb) => verb.level === 1);
      case 2:
         return verbs.filter((verb) => verb.level === 1 || verb.level === 2);
      case 3:
         return verbs;
      default:
         return verbs;
   }
};

// This function is used for randomizing verbs for Meanings screen
/* export const getRndVerbs = (verbs, numberVerbs) => {
   let rndVerb;
   let rndVerbsCorrect = [];
   let rndVerbsCorrectFinal = [];
   let verbObjectArray = [];
   let rndDistractor;
   let rndVerbsThree = [];
   let rndVerbsThreeFinal = [];
   while (rndVerbsCorrectFinal.length < numberVerbs) {
      const rndInt = rndIntGenerator(verbs.length);
      rndVerb = getRandomVerb(rndInt, verbs);
      if (rndVerb !== undefined) {
         rndVerbsCorrect = [...rndVerbsCorrect, rndVerb];
      }
      if (rndVerbsCorrect.length > 1) {
         rndVerbsCorrectFinal = rndVerbsCorrect.filter(
            (verb, index, self) =>
               index === self.findIndex((v) => v.meaning_id === verb.meaning_id)
         );
      }
   }
   console.log('rndVerbsCorrectFinal: ', rndVerbsCorrectFinal);
   for (let i = 0; i < rndVerbsCorrectFinal.length; i++) {
      rndVerbsThree = [...rndVerbsThree, rndVerbsCorrectFinal[i]];
      while (rndVerbsThreeFinal.length < 3) {
         const rndInt = rndIntGenerator(verbs.length);
         rndDistractor = getRandomVerb(rndInt, verbs);
         rndVerbsThree = [...rndVerbsThree, rndDistractor];
            rndVerbsThreeFinal = rndVerbsThree.filter(
               (verb, index, self) =>
                  index === self.findIndex((v) => v.verb_id === verb.verb_id)
            );
      }
      verbObjectArray = [...verbObjectArray, rndVerbsThreeFinal];
      }  
      console.log('rndVerbsThree: ', rndVerbsThree); */
/*       while (rndVerbsThreeFinal.length < 3) {
         const rndInt = rndIntGenerator(verbs.length);
         rndDistractor = getRandomVerb(rndInt, verbs);
         rndVerbsThree = [...rndVerbsThree, rndDistractor];
         if (rndVerbsThree.length > 1) {
            rndVerbsThreeFinal = rndVerbsThree.filter(
               (verb, index, self) =>
                  index === self.findIndex((v) => v.verb_id === verb.verb_id)
            );
         }
         verbObjectArray = [...verbObjectArray, rndVerbsThreeFinal];
         rndVerbsThree = [];
         rndVerbsThreeFinal = [];         
      } */
/*       console.log('verbObjectArray: ', verbObjectArray)
   return verbObjectArray;
}
 */

export const getArrayOfRandomInts = (count, lowest, highest, excludedInt) => {
   let arrayOfRandomInts = [];
   while (arrayOfRandomInts.length < count) {
      let rndInt = getRndInt(lowest, highest);
      if (!arrayOfRandomInts.includes(rndInt) && !arrayOfRandomInts.includes(excludedInt)) {
         arrayOfRandomInts = [...arrayOfRandomInts, rndInt]
      }
   }
   return arrayOfRandomInts;
}

export const getRndIntsForMeanings = (count, lowest, highest) => {
   let arrayOfRandomInts = getArrayOfRandomInts(count, lowest, highest);
   let rndIntsThree = [];
   let arrayOfRandomThree = [];
   while (arrayOfRandomThree.length < 3) {
      for (rndInt of arrayOfRandomInts) {
         rndIntsThree = [];
         rndIntsThree = [...rndIntsThree, rndInt];
         console.log('randomIntsThree: ', rndIntsThree); 
         rndIntsThree = [...rndIntsThree, ...getArrayOfRandomInts(2, lowest, highest, rndInt)];
         arrayOfRandomThree = [...arrayOfRandomThree, rndIntsThree];
      }
   }
   return arrayOfRandomThree;
}

export const getRndVerbsForMeanings = (count, verbs) => {
   let rndArraysThree = [];
   let rndVerbsArray = [];
   rndArraysThree = getRndIntsForMeanings(count, 0, verbs.length - 1);
   rndVerbsArray = rndArraysThree.map((rndThree) => rndThree.map((rndInt) => verbs[rndInt]));
   //rndVerbsArray = rndArraysThree.map((rndThree) => [...rndVerbsArray, rndThree.map((rndInt) => verbs[rndInt])]);
   console.log('rndVerbsArray: ', rndVerbsArray);
   return rndVerbsArray;
}

export const getRandomizedAlternatives = () => {
   let randomOrderFinal = [];
   // Randomize alternatives
   while (randomOrderFinal.length < 3) {
      let rndInt = getRndInt(0, 3);
      // Check that same number doesn't occur twice or more
      if (!randomOrderFinal.includes(rndInt)) {
         randomOrderFinal = [...randomOrderFinal, rndInt];
      }
   }
   return randomOrderFinal;
}

/* export const getRandomIntArray = (count, lowest, highest) => {
   let rndIntArray = [];
   let len = 0;
   let nums = {};
   let randomInt;
   if (highest - lowest < count) {
      count = highest - lowest;
   }
   while (len < count) {
      if (len === 0) {
         randomInt = getRndInt(lowest, highest);
      } else {
         while (checkRndInt(randomInt, nums)) {
            nums[randomInt] = 1;
            rndIntArray = [...rndIntArray, randomInt];
            len++;
         }
      }
   }
   return rndIntArray; 
}*/

export const getRndInt = (lowest, highest) => {
   return Math.floor(Math.random() * (highest - lowest) + lowest);
}
/*
const checkRndInt = (a, nums) => {
   return nums[a];
} */


// This function is used for randomizing verbs for Meanings screen
export const getRndVerbs = (verbs, numberVerbs) => {
   let rndVerb;
   let rndVerbs = [];
   let rndVerbsFinal = [];
   let verbObjectArray = [];
   let rndVerbsThree = [];
   while (rndVerbsFinal.length < numberVerbs * 3) {
      const rndInt = rndIntGenerator(verbs.length);
      rndVerb = getRandomVerb(rndInt, verbs);
      console.log('rndVerb: ', rndVerb)
      if (rndVerb !== undefined) {
         rndVerbs = [...rndVerbs, rndVerb];
      }
      if (rndVerbs.length > 1) {
         rndVerbsFinal = rndVerbs.filter(
            (verb, index, self) =>
               index === self.findIndex((v) => v.meaning_id === verb.meaning_id)
         );
      }
   }
   for (let i = 0; i < rndVerbsFinal.length; i++) {
      rndVerbsThree.push(rndVerbsFinal[i]);
      if ((i + 1) % 3 === 0) {
         verbObjectArray.push(rndVerbsThree);
         rndVerbsThree = [];
      }
   }
   return verbObjectArray;
}

// This function is used for randomizing verbs for Forms screen
export const getRndVerbsForForms = (verbs, numberVerbs, level) => {
   let rndVerbArray = [];
   let rndVerbs = [];
   let rndVerbsFinal = [];
   while (rndVerbsFinal.length < numberVerbs) {
      // The range of random numbers (0-300) is excessive
      // in order to involve all verbs of
      // a certain level in randomizing.
      // The random number shall match a meaning_id
      // If no match, the randomizing will be repeated
      const rndInt = rndIntGenerator(300);
      rndVerbArray = getRandomVerbArray(rndInt, verbs);
      if (rndVerbArray) {
         rndVerbs.push(rndVerbArray);
      }
      console.log('rndVerbs: ', rndVerbs)
/*       if (level !== 4) {
         rndVerbArray = getRandomVerbArray(rndInt, verbs);
      }
      if (level !== 4 && rndVerbArray) {
         rndVerbs = [...rndVerbs, rndVerbArray];
      } */
      if (rndVerbs.length > 1) {
         // Check for duplicates with same meaning
         rndVerbsFinal = rndVerbs.filter(
            (verbArray, index, self) =>
               index ===
               self.findIndex(
                  (v) => v[0].meaning_id === verbArray[0].meaning_id
               )
         );
      }
   }
   return rndVerbsFinal;
};

export const filterOutWithoutInfinitive = (verbsInSwedish) => {
   return verbsInSwedish.filter((verb) => verb.infinitive.length > 1);
}

export const getStartedState = (count, level, language, ownVerbArray) => {
   if (level === 4 && language === 1 && ownVerbArray.length >= count) {
      return true;
   } else if (level === 4 && language === 2 && ownVerbArray.length >= count) {
      return true;
   } else if (level !== 4) {
      return true;
   } else {
      return false;
   }
}

export const getEnoughVerbsState = (count, level, language, ownVerbArray) => {
   if (level === 4 && language === 1 && ownVerbArray.length < count) {
      return false;
   } else if (level === 4 && language === 2 && ownVerbArray.length < count) {
      return false;
   } else {
      return true;
   }  
}
