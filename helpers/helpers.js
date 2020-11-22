export const rndIntGenerator = (verbs) => {
   return Math.floor(Math.random() * verbs.length);
}

export const getRandomVerb = (rndInt, verbs) => {
   return verbs.filter(verb => verb.verb_id === rndInt)[0];
}

export const getCurrentDate = () => {
   return new Date().toISOString();
}

export const getRndInteger = (highest) => {
   return Math.floor(Math.random() * highest);
}