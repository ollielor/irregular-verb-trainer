export const rndIntGenerator = (highest) => {
   return Math.floor(Math.random() * highest);
};

export const getRandomVerb = (rndInt, verbs) => {
   console.log('Verbs from getRandomVerb: ', verbs)
   console.log('From getRandomVerb: ', verbs.filter((verb) => verb.meaning_id === rndInt)[0]);
   return verbs[rndInt];
}

export const getCurrentDate = () => {
   return new Date().toISOString();
};

/* export const getRandomVerbArray = (rndInt, verbs) => {
   console.log('From getRandomVerbArray: ', verbs.filter((verb) => verb.meaning_id === rndInt));
   return verbs.filter((verb) => verb.meaning_id === rndInt);
};
 */
export const getRandomVerbArray = (rndInt, verbs) => {
   console.log('From getRandomVerbArray: ', verbs.filter((verb) => verb.meaning_id === rndInt));
   return verbs.filter((verb) => verb.meaning_id === rndInt);
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
export const getRndVerbs = (verbs, amount) => {
   console.log('Verbs: ', verbs)
   let rndVerb;
   let rndVerbs = [];
   let rndVerbsFinal = [];
   while (rndVerbsFinal.length < amount) {
      const rndInt = rndIntGenerator(verbs.length);
      rndVerb = getRandomVerb(rndInt, verbs);
      if (rndVerb !== undefined) {
         rndVerbs.push(rndVerb);
      }
      if (rndVerbs.length > 1) {
         rndVerbsFinal = rndVerbs.filter(
            (verb, index, self) =>
               index === self.findIndex((v) => v.verb_id === verb.verb_id)
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
   console.log(verbObjectArray)
   return verbObjectArray;
};

// This function is used for randomizing verbs for Forms screen
export const getRndVerbsForForms = (verbs, amount) => {
   let rndVerbArray = [];
   let rndVerbs = [];
   let rndVerbsFinal = [];
   while (rndVerbsFinal.length <= amount - 1) {
      const rndInt = rndIntGenerator(verbs.length);
      rndVerbArray = getRandomVerbArray(rndInt, verbs);
      if (rndVerbArray.length > 0) {
         rndVerbs.push(rndVerbArray);
      }
      if (rndVerbs.length > 1) {
         // Check for duplicates
         rndVerbsFinal = rndVerbs.filter(
            (verbArray, index, self) =>
               index ===
               //self.findIndex((v) => v[0].verb_id === verbArray[0].verb_id)
               self.findIndex((v) => v[0].meaning_id === verbArray[0].meaning_id)
         );
         console.log('rndVerbsFinal: ', rndVerbsFinal)
      }
   }
   return rndVerbsFinal;
};
