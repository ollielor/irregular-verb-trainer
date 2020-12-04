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