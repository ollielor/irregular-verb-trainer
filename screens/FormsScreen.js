import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Container, Text } from 'native-base';

import DatabaseResults from '../modules/DatabaseResults';

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
   updateResults
} from '../store/actions/results';

import {
   getRndVerbsForForms,
   getCurrentDate,
   filterVerbsByLevel,
} from '../helpers/helpers';

import { getResults, createResultsDb } from '../helpers/results';

import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import ResultView from '../components/results/ResultView';
import CardComponentForms from '../components/cards/CardComponentForms';
import ButtonComponent from '../components/buttons/ButtonComponent';
import LatestResults from '../components/results/LatestResults';
import SpinnerComponent from '../components/styling/SpinnerComponent';

const FormsScreen = (props) => {
   const [verbs, setVerbs] = useState([]);
   const [verbsFiltered, setVerbsFiltered] = useState(false);
   const [randomizedVerbs, setRandomizedVerbs] = useState([]);
   const [points, setPoints] = useState(0);
   const [maxPoints, setMaxPoints] = useState(200);
   const [maxQuestions, setMaxQuestions] = useState(0);
   const [finished, setFinished] = useState(false);
   const [resultsData, setResultsData] = useState({});
   const [counterState, setCounterState] = useState(null);
   const [started, setStarted] = useState(true);
   const [tenseNames, setTenseNames] = useState([]);
   const [resultHistory, setResultHistory] = useState([]);
   const [resultsLoaded, setResultsLoaded] = useState(false);
   const [dateTime, setDateTime] = useState(null);
   const [answeredIndex, setAnsweredIndex] = useState(0);
   const [resultsReady, setResultsReady] = useState(false);
   const [formsSelected, setFormsSelected] = useState(false);
   const [formsSelectedArray, setFormsSelectedArray] = useState([]);
   const [tableCreated, setTableCreated] = useState(false);
   const [resultsSaved, setResultsSaved] = useState(false);

   const navigation = useNavigation();

   console.log(props);

   useEffect(() => {
      createResultsDb();
      setTableCreated(true);
   }, [])

   useEffect(() => {
      return () => {};
   }, []);

   useEffect(() => {
      if (props.infinitive || props.present || props.past || props.presperf) {
         setFormsSelected(true);
         setFormsSelectedArray([...formsSelectedArray, 10]);
      }
   }, [props.infinitive, props.present, props.past, props.presperf]);

   useEffect(() => {
      // Set forms to be exercised in Forms mode
      if (props.tenses) {
         const amountSelectedForms = Object.values(props.tenses).filter(
            (tense) => tense === true
         );
         setMaxPoints(amountSelectedForms.length * 5 * 10);
         setMaxQuestions(amountSelectedForms.length * 5);
      }
      let tensesArray = [];
      if (props.infinitive) {
         tensesArray = [...tensesArray, 1];
      }
      if (props.present) {
         tensesArray = [...tensesArray, 2];
      }
      if (props.past) {
         tensesArray = [...tensesArray, 3];
      }
      if (props.presperf) {
         tensesArray = [...tensesArray, 4];
      }
      setTenseNames(
         tensesArray
            .sort((a, b) => a > b, 1)
            .map((tense) => {
               return tense === 1
                  ? 'infinitive'
                  : tense === 2
                  ? 'present'
                  : tense === 3
                  ? 'past'
                  : tense === 4 && 'presperf';
            })
      );
   }, [
      props.tenses,
      props.infinitive,
      props.present,
      props.past,
      props.presperf,
   ]);

   useEffect(() => {
      setVerbsFiltered(false);
      let verbsByLanguage;
      if (props.language === 1) {
         verbsByLanguage = props.verbsSwedish.filter(verb => verb.infinitive.length > 1);
      } else {
         verbsByLanguage = props.verbsGerman;
      }
      const filteredVerbs = filterVerbsByLevel(verbsByLanguage, props.level);
      setVerbs(filteredVerbs);
      setVerbsFiltered(true);
   }, [props.level, props.verbsGerman]);



/*    const updateList = () => {
      DatabaseResults.transaction(
         (tx) => {
            tx.executeSql(
               'select * from results;',
               [],
               (tx, results) => {
                  setResultHistory(results.rows._array);
                  setResultsLoaded(true);
               },
               (tx, error) => {
                  console.log('Could not execute query: ', error);
               }
            );
         },
         (error) => {
            console.log('Transaction error: ', error);
         }
      );
   }; */



   useEffect(() => {
      if (points >= maxPoints) {
         setFinished(true);
      }
   }, [points, maxPoints]);

   useEffect(() => {
      if (verbsFiltered && started) {
         // Get the forms of 5 different verbs
         const rndVerbsFinal = getRndVerbsForForms(verbs, 5);
         setRandomizedVerbs(rndVerbsFinal);
      }
   }, [verbsFiltered, verbs, started]);

/*    useEffect(() => {
      if (tableCreated && resultsReady && dateTime && !resultsSaved) {
         DatabaseResults.transaction(
            (tx) => {
               tx.executeSql(
                  'insert into results (type, language, level, accuracy, q_total, points, maxpoints, percentage, datetime) values (?, ?, ?, ?, ?, ?, ?, ?, ?);',
                  [
                     2,
                     props.language,
                     props.level,
                     resultsData.amountCorrectAnswers,
                     resultsData.maxQuestions,
                     resultsData.totalPoints,
                     resultsData.maxPoints,
                     resultsData.totalPercentage,
                     dateTime,
                  ]
               );
            },
            (error) => {
               console.log('Transaction error: ', error);
            },
            null,
            updateList
         );
         setResultsSaved(true);
         updateList();
      }
   }, [resultsReady, dateTime, tableCreated]); */

   useEffect(() => {
      if (tableCreated && resultsReady && dateTime && !resultsSaved) {
         DatabaseResults.transaction(
            (tx) => {
               tx.executeSql(
                  'insert into results (type, language, level, accuracy, q_total, points, maxpoints, percentage, datetime) values (?, ?, ?, ?, ?, ?, ?, ?, ?);',
                  [
                     2,
                     props.language,
                     props.level,
                     resultsData.amountCorrectAnswers,
                     resultsData.maxQuestions,
                     resultsData.totalPoints,
                     resultsData.maxPoints,
                     resultsData.totalPercentage,
                     dateTime,
                  ]
               );
            },
            (error) => {
               console.log('Transaction error: ', error);
            },
            null,
            null
         );
         setResultsSaved(true);
/*        const results = getResults();
         console.log('Results: ', results);
         props.dispatch(updateResults(results)); */
      }
   }, [resultsReady, dateTime, tableCreated]);

   const updateResultsAsync = async () => {
      props.dispatch(updateResults(await getResults()));
   }
 
   useEffect(() => {
      updateResultsAsync();
   }, [resultsSaved]);

   const startAgain = () => {
      setStarted(true);
      setFinished(false);
      setPoints(0);
      setResultsData({});
      setResultsReady(false);
      setResultsSaved(false);
   };

   useEffect(() => {
      if (started) {
         let counter = 0;
         let intervalId = setInterval(() => {
            if (finished) {
               clearInterval(intervalId);
               setStarted(false);
            } else {
               setCounterState(counter++);
            }
         }, 1000);
         return () => {
            clearInterval(intervalId);
         };
      }
   }, [started, finished]);

   useEffect(() => {
      if (finished) {
         const estimatedAccomplishTime = 1.2 * maxPoints;
         let totalPoints;
         if (counterState <= estimatedAccomplishTime && points === maxPoints) {
            totalPoints = points + counterState * 0.05;
         } else if (points === 0) {
            totalPoints = points * 1.0;
         } else {
            totalPoints = (points - counterState * 0.1) * 1.0;
         }
         const totalPercentage = (totalPoints / maxPoints) * 100.0;
         const amountCorrectAnswers = points / 10;
         setResultsData({
            totalPoints: totalPoints,
            maxPoints: maxPoints,
            maxQuestions: maxQuestions,
            totalPercentage: totalPercentage,
            amountCorrectAnswers: amountCorrectAnswers,
         });
         setDateTime(getCurrentDate());
         setResultsReady(true);
      }
   }, [finished]);

   const prepareAnswerGerman = (answer) => {
      // The function prepares the given answers for accuracy check using several string operations
      let preparedAnswer = '';
      // Replace German sharp S with the string '1'
      let stringArray = answer && answer
         .trim()
         .replace('/', '')
         .replace(/\u00df/g, '1')
         .toUpperCase()
         .toLowerCase()
         .split(' ');
      // Filter out pronouns if they precede verb form
      let withoutPronounsArray = stringArray.filter(
         (word) =>
            word !== 'er' &&
            word !== 'sie' &&
            word !== 'es' &&
            word !== 'er/sie' &&
            word !== 'er/sie/es'
      );
      // Replace string '1' with German sharp S
      for (let i = 0; i < withoutPronounsArray.length; i++) {
         preparedAnswer += preparedAnswer && ' ' + withoutPronounsArray[i].replace('1', '\u00df');
      }
      return preparedAnswer.trim();
   };

   const prepareAnswerSwedish = (answer) => {
      // The function prepares the given answers for accuracy check using different string operations
      let preparedAnswer = '';
      let stringArray = answer
         .trim()
         .toUpperCase()
         .toLowerCase()
         .split(' ');
      for (let i = 0; i < stringArray.length; i++) {
         preparedAnswer += ' ' + stringArray[i];
      }
      return preparedAnswer.trim();
   };

   const checkAnswerStrings = (preparedAnswer, correct) => {
      // The function checks if the prepared answer matches with the correct answer and returns true if they match
      // Check if the correct answer is an array (i.e. if it has synonymous forms)
      if (Array.isArray(correct)) {
         for (let i = 0; i < correct.length; i++) {
            if (preparedAnswer && preparedAnswer === correct[i].replace('/', '')) {
               return true;
            }
         }
      } else if (!Array.isArray(correct) && preparedAnswer === correct) {
         return true;
      }
   };

   const evaluate = (answer, correct, tense, index) => {
      // This function is responsible for setting the points state and setting the state for focusing in CardComponentForms.js
      let preparedAnswer;
      if (props.language === 1) {
         preparedAnswer = prepareAnswerSwedish(answer);
      } else {
         preparedAnswer = prepareAnswerGerman(answer);
      }
      let correctModified;
      if (!Array.isArray(correct)) {
         correctModified = correct.replace('/', '');
      } else {
         correctModified = correct;
      }
      // CheckAnswerStrings function is called and points are given if it returns true
      if (checkAnswerStrings(preparedAnswer, correctModified)) {
         setPoints(points + 10);
         // Focus to next component if the user has given a correct answer to the last field of the component
         const lastForm = tenseNames[tenseNames.length - 1];
         if (lastForm === tense && index <= 4) {
            setAnsweredIndex(index + 1);
         }
         return true;
      } else {
         setTimeout(() => {
            return false;
         }, 2000);
      }
   };

   useEffect(() => {
      if (finished && resultsData || started) {
         scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
   }, [finished, resultsData, started]);

   const finish = () => {
      setStarted(false);
      setFinished(true);
   };

   const scrollViewRef = useRef();

   return (
      <Container style={styles.container}>
         <HeaderComponent title="Verbien muotoja" goBack={navigation.goBack} />
         <KeyboardAvoidingView
            style={styles.flexOne}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
         >
            <ScrollView
               keyboardShouldPersistTaps="always"
               style={styles.flexOne}
               ref={scrollViewRef}
            >
               {finished &&
                  resultsReady &&
                  resultsData &&
                  resultsSaved && (
                  //resultHistory && (
                     <>
                        <ResultView
                           resultsData={resultsData}
                           startAgain={startAgain}
                           forms
                        />
                        <LatestResults
                           //resultHistory={props.results}
                           type={2}
                           count={3}
                        />
                     </>
                  )}
               {!formsSelected && (
                  <>
                     <Text
                        style={{
                           color: '#7E00C5',
                           fontWeight: 'bold',
                           fontSize: 16,
                           marginTop: 22,
                           marginBottom: 22,
                           textAlign: 'center',
                        }}
                     >
                        Valitse vähintään yksi harjoiteltava verbimuoto!
                     </Text>
                     <ButtonComponent
                        color="#7E00C5"
                        title="Muuta asetuksia"
                        function={() => navigation.navigate('Koti')}
                     />
                  </>
               )}
               {randomizedVerbs ? (
                  randomizedVerbs.map((verbFormArray, index) =>
                     verbFormArray.length === 1 ? (
                        verbFormArray.map((v, i) => (
                           <CardComponentForms
                              key={v.verb_id}
                              verbForm={v}
                              synonyms={false}
                              evaluate={evaluate}
                              finished={finished}
                              index={index}
                              tenseNames={tenseNames}
                              answeredIndex={answeredIndex}
                              started={started}
                           />
                        ))
                     ) : (
                        <CardComponentForms
                           key={verbFormArray[0].verb_id}
                           verbForm={verbFormArray}
                           synonyms={true}
                           evaluate={evaluate}
                           finished={finished}
                           index={index}
                           tenseNames={tenseNames}
                           answeredIndex={answeredIndex}
                           started={started}
                        />
                     )
                  )
               ) : (
                  <Content>
                     <SpinnerComponent text="Ladataan verbejä..." />
                  </Content>
               )}
               {formsSelected && randomizedVerbs && !finished && (
                  <ButtonComponent
                     color="#7E00C5"
                     title="Valmis"
                     withMargin
                     function={finish}
                  />
               )}
            </ScrollView>
         </KeyboardAvoidingView>
         <FooterComponent />
      </Container>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   level: state.settings.level,
   language: state.settings.language,
   infinitive: state.settings.tenses.infinitive,
   present: state.settings.tenses.present,
   past: state.settings.tenses.past,
   presperf: state.settings.tenses.presperf,
   tenses: state.settings.tenses,
   results: state.results.results
});

export default connect(mapStateToProps)(FormsScreen);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#d2d2d2',
   },
   contentContainer: {
      padding: 10,
   },
   formStyle: {
      paddingRight: 20,
   },
   flexOne: {
      flex: 1,
   },
});
