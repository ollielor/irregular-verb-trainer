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
   console.log('Verbs from getRandomVerb: ', verbs);
   console.log(
      'From getRandomVerb: ',
      verbs.filter((verb) => verb.meaning_id === rndInt)[0]
   );
   return verbs[rndInt];
};

export const getCurrentDate = () => {
   return new Date().toISOString();
};

/* export const getRandomVerbArray = (rndInt, verbs) => {
   console.log('From getRandomVerbArray: ', verbs.filter((verb) => verb.meaning_id === rndInt));
   return verbs.filter((verb) => verb.meaning_id === rndInt);
};
 */

// This function creates an array of verbs with same meaning
export const getRandomVerbArray = (rndInt, verbs) => {
   let verbsArray = [];
   let matchingVerbs = verbs.filter((verb) => verb.meaning_id === rndInt);
   for (let i = 0; i < matchingVerbs.length; i++) {
      console.log('Matching: ', matchingVerbs[i]);
      verbsArray.push(matchingVerbs[i]);
   }
   if (verbsArray.length > 0) {
      return verbsArray;
   }
};

export const filterVerbsByLevel = (verbs, level) => {
   switch (level) {
      case 1:
         console.log(
            'level: 1',
            verbs.filter((verb) => verb.level === 1)
         );
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
export const getRndVerbs = (verbs, amount) => {
   console.log('Verbs: ', verbs);
   let rndVerb;
   let rndVerbs = [];
   let rndVerbsFinal = [];
   while (rndVerbsFinal.length < amount * 3) {
      // The range of random numbers (0-300) is excessive
      // in order to involve all verbs of
      // a certain level in randomizing.
      const rndInt = rndIntGenerator(300);
      rndVerb = getRandomVerb(rndInt, verbs);
      if (rndVerb !== undefined) {
         rndVerbs.push(rndVerb);
      }
      if (rndVerbs.length > 1) {
         rndVerbsFinal = rndVerbs.filter(
            (verb, index, self) =>
               index === self.findIndex((v) => v.meaning_id === verb.meaning_id)
         );
      }
   }
   let rndVerbsThree = [];
   let verbObjectArray = [];
   for (let i = 0; i < rndVerbsFinal.length; i++) {
      rndVerbsThree.push(rndVerbsFinal[i]);
      if ((i + 1) % 3 === 0) {
         verbObjectArray.push(rndVerbsThree);
         rndVerbsThree = [];
      }
   }
   console.log(verbObjectArray);
   return verbObjectArray;
};

// This function is used for randomizing verbs for Forms screen
export const getRndVerbsForForms = (verbs, amount) => {
   let rndVerbArray = [];
   let rndVerbs = [];
   let rndVerbsFinal = [];
   while (rndVerbsFinal.length < amount) {
      console.log('verbs.length: ', verbs.length);
      // The range of random numbers (0-300) is excessive
      // in order to involve all verbs of
      // a certain level in randomizing.
      // The random number shall match a meaning_id
      // If no match, the randomizing will be repeated
      const rndInt = rndIntGenerator(300);
      console.log('rndInt: ', rndInt);
      rndVerbArray = getRandomVerbArray(rndInt, verbs);
      console.log('rndVerbArray from getRndVerbsForForms: ', rndVerbArray);
      if (rndVerbArray) {
         rndVerbs.push(rndVerbArray);
      }
      if (rndVerbs.length > 1) {
         console.log('rndVerbs: ', rndVerbs);
         // Check for duplicates with same meaning
         rndVerbsFinal = rndVerbs.filter(
            (verbArray, index, self) =>
               index ===
               self.findIndex(
                  (v) => v[0].meaning_id === verbArray[0].meaning_id
               )
         );
      }
      console.log('rndVerbsFinal: ', rndVerbsFinal);
   }
   return rndVerbsFinal;
};
