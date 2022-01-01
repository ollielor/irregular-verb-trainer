export const sortVerbs = (verbs, level, prevCount, verbCount, showLevels) => {
    let verbsToSort = [];
    if (showLevels) {
        verbsToSort = verbs.filter((verb) => verb.level === level);
    } else {
        verbsToSort = verbs;
    }
    let verbsSortedAlphabetically = [];
    verbsSortedAlphabetically = sortArrayAlphabetically(verbsToSort);
    return sliceArray(verbsSortedAlphabetically, prevCount, verbCount);
}

export const sortArrayAlphabetically = (verbs) => {
    return verbs.sort((a, b) => a.infinitive > b.infinitive ? 1 : -1);
}

export const sliceArray = (verbs, prevCount, verbCount) => {
    if (verbCount + 30 >= verbs.length) {
        return verbs.slice(prevCount, verbs.length);
    } else {
        return verbs.slice(prevCount, verbCount);
    }
}