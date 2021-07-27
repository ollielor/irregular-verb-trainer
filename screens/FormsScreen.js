import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { Container, Text } from 'native-base';

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
   prepareAnswerGerman,
   prepareAnswerSwedish,
   checkAnswerStrings
} from '../helpers/answerHandling';

import {
   updateResults
} from '../store/actions/results';

import {
   getRndVerbsForForms,
   getCurrentDate,
   filterVerbsByLevel,
} from '../helpers/helpers';

import {
   calcEstimatedAccomplishTime,
   calcTotalPointsForms,
   calcTotalPercentage,
   calcAmountCorrectAnswersForms,
   calcPoints 
} from '../helpers/points';

import { 
   getResults, 
   createResultsDb, 
   saveResults 
} from '../helpers/results';

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
   const [dateTime, setDateTime] = useState(null);
   const [answeredIndex, setAnsweredIndex] = useState(0);
   const [resultsReady, setResultsReady] = useState(false);
   const [formsSelected, setFormsSelected] = useState(false);
   const [tableCreated, setTableCreated] = useState(false);
   const [resultsSaved, setResultsSaved] = useState(false);
   const [correctAns, setCorrectAns] = useState({});
   const [attempts, setAttempts] = useState(0);

   const navigation = useNavigation();

   console.log(props);

   // This useEffect creates the result database
   useEffect(() => {
      createResultsDb();
      setTableCreated(true);
   }, [])

   // useEffect cleanup
   useEffect(() => {
      return () => {};
   }, []);

   useEffect(() => {
      if (props.infinitive || props.present || props.past || props.presperf) {
         setFormsSelected(true);
         //setFormsSelectedArray([...formsSelectedArray, 10]);
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
         console.log('verbsByLanguage: ', verbsByLanguage)
      } else {
         verbsByLanguage = props.verbsGerman;
      }
      const filteredVerbs = filterVerbsByLevel(verbsByLanguage, props.level);
      setVerbs(filteredVerbs);
      console.log('filteredVerbs length: ', filteredVerbs.length)
      setVerbsFiltered(true);
   }, [props.level, props.verbsSwedish, props.verbsGerman]);

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
         saveResultsAsync()
         setResultsSaved(true);
      }
   }, [resultsReady, dateTime, tableCreated]);

   const saveResultsAsync = async () => {
      try {
         await saveResults(
            2,
            props.language,
            props.level,
            resultsData.amountCorrectAnswers,
            resultsData.maxQuestions,
            resultsData.totalPoints,
            resultsData.maxPoints,
            resultsData.totalPercentage,
            dateTime,
         ) 
         setResultsSaved(true);
      } catch (error) {
         console.log(error);
      }
   }

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
         // The points calculation functions are located in /helpers/points.js
         const estimatedAccomplishTime = calcEstimatedAccomplishTime(maxPoints);
         const totalPoints = calcTotalPointsForms(counterState, estimatedAccomplishTime, points, maxPoints);
         setResultsData({
            totalPoints: totalPoints,
            maxPoints: maxPoints,
            maxQuestions: maxQuestions,
            totalPercentage: calcTotalPercentage(totalPoints, maxPoints),
            amountCorrectAnswers: calcAmountCorrectAnswersForms(points),
         });
         setDateTime(getCurrentDate());
         setResultsReady(true);
      }
   }, [finished]);

   const evaluate = (answer, correct, correctAlt, tense, index) => {
      // This function is responsible for setting the points state and setting the state for focusing in CardComponentForms.js
      let preparedAnswer;
      if (props.language === 1) {
         preparedAnswer = prepareAnswerSwedish(answer);
      } else {
         preparedAnswer = prepareAnswerGerman(answer);
      }
      let correctModified;
      let correctAltModified;
      if (!Array.isArray(correct)) {
         correctModified = correct.replace('/', '');
         correctAltModified = correctAlt && correctAlt.replace('/', '');
      } else {
         correctModified = correct;
         correctAltModified = correctAlt && correctAlt;
      }
      console.log('CorrectModified: ', correctModified)
      // CheckAnswerStrings function is called and points are given if it returns true
      console.log('checkAnswerStrings: ', checkAnswerStrings(preparedAnswer, correctModified, correctAltModified))
      if (checkAnswerStrings(preparedAnswer, correctModified, correctAltModified)) {
         // Focus to next component if the user has given a correct answer to the last field of the component
         const lastForm = tenseNames[tenseNames.length - 1];
         if (lastForm === tense && index <= 4) {
            setAnsweredIndex(index + 1);
         }
         return true;
      } else {
         return false;
      }
   };

   useEffect(() => {
      if (finished && resultsData || started) {
         scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
         setAnsweredIndex(0);
      }
   }, [finished, resultsData, started]);

   const finish = () => {
      setStarted(false);
      setFinished(true);
   };

   const scrollViewRef = useRef();

   return (
      <Container style={styles.container}>
         <HeaderComponent title="Verbien muodot" goBack={navigation.goBack} />
         <KeyboardAvoidingView
            style={styles.flexOne}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
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
                     <>
                        <ResultView
                           resultsData={resultsData}
                           startAgain={startAgain}
                           forms
                        />
                        <LatestResults
                           count={3}
                           showTypes
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
                              componentIndex={index}
                              tenseNames={tenseNames}
                              answeredIndex={answeredIndex}
                              started={started}
                              correctAns={correctAns}
                              points={points}
                              setPoints={setPoints}
                              calcPoints={calcPoints}
                           />
                        ))
                     ) : (
                        <CardComponentForms
                           key={verbFormArray[0].verb_id}
                           verbForm={verbFormArray}
                           synonyms={true}
                           evaluate={evaluate}
                           finished={finished}
                           componentIndex={index}
                           tenseNames={tenseNames}
                           answeredIndex={answeredIndex}
                           started={started}
                           correctAns={correctAns}
                           setPoints={setPoints}
                           points={points}
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
