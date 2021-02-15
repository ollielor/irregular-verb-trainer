import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Container, Spinner, Text } from 'native-base';

import DatabaseVerbs from '../../modules/DatabaseVerbsGerman';
import DatabaseResults from '../../modules/DatabaseResults';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
   getRndVerbsForForms,
   getCurrentDate,
   filterVerbsByLevel,
} from '../../helpers/helpers';

import FooterComponent from '../../components/footer/FooterComponent';
import HeaderComponent from '../../components/header/HeaderComponent';
import GermanResultView from '../../components/results/GermanResultView';
import CardComponentForms from '../../components/cards/CardComponentForms';
import ButtonComponent from '../../components/buttons/ButtonComponent';
import LatestResultsGerman from '../../components/results/LatestResultsGerman';
import SpinnerComponent from '../../components/styling/SpinnerComponent';

const FormsScreenGerman = (props) => {
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

   /*FileSystem.getInfoAsync(
      `${FileSystem.documentDirectory}SQLite/verbs_german.db`
   ).then((result) => {
      if (result.exists) {
         DatabaseVerbsGerman;
      } else {
         FileSystem.downloadAsync(
            Asset.fromModule(require('../../assets/verbs_german.db')).uri,
            `${FileSystem.documentDirectory}SQLite/verbs_german.db`
         );
      }
   });*/
   
   /*useEffect(() => {
      setVerbsFiltered(false);
      let verbsByLanguage;
      if (props.language === 1) {
         verbsByLanguage = props.verbsSwedish.filter(verb => verb.infinitive.length > 1);
         console.log(verbsByLanguage);
      } else {
         verbsByLanguage = props.verbsGerman;
      }
      console.log('Level: ', props.level)
      const filteredVerbs = filterVerbsByLevel(verbsByLanguage, props.level);
      setVerbs(filteredVerbs);
      setVerbsFiltered(true);
   }, [props.level, props.language]);*/

   useEffect(() => {
      if (props.infinitive || props.present || props.past || props.presperf) {
         setFormsSelected(true);
         setFormsSelectedArray([...formsSelectedArray, 10]);
      }
   }, [props.infinitive, props.present, props.past, props.presperf]);

   useEffect(() => {
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

   useEffect(() => {
      DatabaseResults.transaction(
         (tx) => {
            tx.executeSql(
               'create table if not exists results (id integer primary key not null, type integer, language integer, level integer, accuracy integer, q_total integer, points real, maxpoints integer, percentage real, datetime real);'
            );
         },
         null,
         updateList
      ),
         setTableCreated(true);
   }, []);

   const updateList = () => {
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
   };

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
            updateList
         );
         setResultsSaved(true);
         updateList();
      }
   }, [resultsReady, dateTime, tableCreated]);

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
      // The function prepares the given answers for accuracy check using different string operations
      let preparedAnswer = '';
      // Replace German sharp S with the string '1'
      let stringArray = answer
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
         preparedAnswer += ' ' + withoutPronounsArray[i].replace('1', '\u00df');
      }
      return preparedAnswer.trim();
   };

   const prepareAnswerSwedish = (answer) => {
      // The function prepares the given answers for accuracy check using different string operations
      let preparedAnswer = '';
      // Replace German sharp S with the string '1'
      let stringArray = answer
         .trim()
         .toUpperCase()
         .toLowerCase()
         .split(' ');
      // Filter out pronouns if they precede verb form
      let withoutPronounsArray = stringArray.filter(
         (word) =>
            word !== 'han' &&
            word !== 'hon' &&
            word !== 'hen' &&
            word !== 'han/hon' &&
            word !== 'han/hon/hen'
      );
      for (let i = 0; i < withoutPronounsArray.length; i++) {
         preparedAnswer += ' ' + withoutPronounsArray[i];
      }
      return preparedAnswer.trim();
   };

   const checkAnswerStrings = (preparedAnswer, correct) => {
      // The function checks if the prepared answer matches with the correct answer and returns true if they match
      // Check if the correct answer is an array (i.e. if it has synonymous forms)
      if (Array.isArray(correct)) {
         for (let i = 0; i < correct.length; i++) {
            if (preparedAnswer === correct[i].replace('/', '')) {
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
      if (finished && resultsData) {
         scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
   }, [finished, resultsData]);

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
                  resultsSaved &&
                  resultHistory && (
                     <>
                        <GermanResultView
                           results={resultsData}
                           startAgain={startAgain}
                           forms
                        />
                        <LatestResultsGerman
                           resultHistory={resultHistory}
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
                        />
                     )
                  )
               ) : (
                  <Content>
                     <SpinnerComponent text="Ladataan verbejä..." />
                  </Content>
               )}
               {formsSelected && randomizedVerbs && (
                  <ButtonComponent
                     color="#7E00C5"
                     title="Valmis"
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
});

export default connect(mapStateToProps)(FormsScreenGerman);

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
