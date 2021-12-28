export const sortVerbsByLevel = (verbs, level) => {
    let verbsByLevel = verbs.filter((verb) => verb.level === level);
    let verbsSortedAlphabetically = sortVerbsAlphabetically(verbsByLevel);
    return verbsSortedAlphabetically;
}

export const sortVerbsAlphabetically = (verbs) => {
    return verbs.sort((a, b) => a.infinitive > b.infinitive ? 1 : -1);
}