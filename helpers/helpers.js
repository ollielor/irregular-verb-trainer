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

// This function creates an array of verbs with same meaning
export const getRandomVerbArray = (rndInt, verbs) => {
   let verbsArray = [];
   let matchingVerbs = verbs.filter((verb) => verb.meaning_id === rndInt);
   for (let i = 0; i < matchingVerbs.length; i++) {
      verbsArray.push(matchingVerbs[i]);
   }
   if (verbsArray.length > 0) {
      return verbsArray;
   }
};

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
export const getRndVerbs = (verbs, numberVerbs) => {
   let rndVerb;
   let rndVerbs = [];
   let rndVerbsFinal = [];
   while (rndVerbsFinal.length < numberVerbs * 3) {
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
   return verbObjectArray;
};

// This function is used for randomizing verbs for Forms screen
export const getRndVerbsForForms = (verbs, numberVerbs) => {
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
