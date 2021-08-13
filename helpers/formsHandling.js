export const getSynonymousForms = (synonyms, verbForm) => {
   // Create arrays of synonymous forms for each tense
   if (synonyms) {
      const infinitiveSynonyms = verbForm.map(
         (verbForm) => verbForm.infinitive
      );
      const presentSynonyms = verbForm.map((verbForm) => verbForm.present);
      const pastSynonyms = verbForm.map((verbForm) => verbForm.past);
      const presPerfSynonyms = verbForm.map((verbForm) => verbForm.presperf);
      return {
         infinitive: infinitiveSynonyms,
         present: presentSynonyms,
         past: pastSynonyms,
         presPerf: presPerfSynonyms,
      };
   }
};
