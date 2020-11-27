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