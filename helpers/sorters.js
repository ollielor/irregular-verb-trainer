export const sortAndSliceVerbs = (verbs, prevCount, verbCount) => {
    let verbsSortedAlphabetically = [];
    verbsSortedAlphabetically = sortArrayAlphabetically(verbs);
    return sliceArray(verbsSortedAlphabetically, prevCount, verbCount);
}

export const sortVerbsByLevel = (verbs, level) => {
    let verbsByLevel = [];
    verbsByLevel = verbs.filter((verb) => verb.level === level);
    return sortArrayAlphabetically(verbsByLevel);
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