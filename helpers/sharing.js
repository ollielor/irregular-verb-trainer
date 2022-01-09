export const getResultsForSharing = (type, level, language, results) => {
    let history;
    if (type === 1) {
       history = results.filter((result) => result.type === 1);
    } else {
       history = results.filter((result) => result.type === 2);
    }
    const historyFiltered = history.filter(
       (historyItem) =>
          historyItem.level === level && historyItem.language === language
    );
    if (historyFiltered.length === 0) {
       return;
    } else {
       const correctAnswers = historyFiltered.map(
          (result) => result.accuracy
       );
       const totalCorrectAnswers = correctAnswers.reduce((a, b) => a + b);
       const questions = historyFiltered.map((result) => result.q_total);
       const totalQuestions = questions.reduce((a, b) => a + b);
       const percentages = historyFiltered.map((result) => result.percentage);
       const percentagesAverage =
          percentages.reduce((a, b) => a + b) / percentages.length;
       return {
          totalAttempts: historyFiltered.length,
          totalCorrectAnswers: totalCorrectAnswers,
          totalQuestions: totalQuestions,
          percentagesAverage: percentagesAverage,
       };
    }
 };

 export const getResultText = (type, language, results) => {
    let resultText = '';
    for (let i = 1; i <= 4; i++) {
       if (getResultsForSharing(type, i, language, results)) {
          resultText += `|<br>${i === 4 ? 'Omat verbit' : `Taso ${i}`} |<br>- Suorituskertoja yhteensä: ${getResultsForSharing(type, i, language, results).totalAttempts
             }`;
          resultText += `|<br>- Oikeita vastauksia: ${getResultsForSharing(type, i, language, results).totalCorrectAnswers
             }`;
          resultText += ` / ${getResultsForSharing(type, i, language, results).totalQuestions
             }`;
          resultText += `|<br>- Keskimääräinen osaaminen ${getResultsForSharing(
             type,
             i,
             language
          )
             .percentagesAverage.toFixed(2)
             .replace('.', ',')} prosenttia (sisältää aikabonukset ja -vähennykset)`;
       } else {
          resultText += `|<br>|${i === 4 ? 'Omat verbit' : `Taso ${i}`}|<br>|- Ei suorituskertoja`;
       }
    }
    return resultText;
 };