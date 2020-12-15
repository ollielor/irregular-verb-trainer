export const rndIntGenerator = (highest) => {
   return Math.floor(Math.random() * highest);
}

export const getRandomVerb = (rndInt, verbs) => {
   return verbs.filter(verb => verb.verb_id === rndInt)[0];
}

export const getCurrentDate = () => {
   return new Date().toISOString();
}

export const getRandomVerbArray = (rndInt, verbs) => {
   return verbs.filter(verb => verb.meaning_id === rndInt);
}

export const filterVerbsByLevel = (verbs, level) => {
      switch (level) {
        case 1:
          return verbs.filter(verb => verb.level === 1);
          break;
        case 2:
          return verbs.filter(verb => verb.level === 1 || verb.level === 2);
          break;
        case 3:
          return verbs;
          break;
        default:
          return verbs;
      } 
}

export const getRndVerbs = (verbs, amount) => {
  let rndVerb;
  let rndVerbs = [];
  let rndVerbsFinal = [];
  while (rndVerbsFinal.length <= amount) {
    const rndInt = rndIntGenerator(verbs.length);
    rndVerb = getRandomVerb(rndInt, verbs);
    if (rndVerb !== undefined) {
      rndVerbs.push(rndVerb);
    }
    if (rndVerb !== undefined && rndVerbs.length > 1) {
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
  return verbObjectArray;
}
