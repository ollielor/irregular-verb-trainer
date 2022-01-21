import React, { useState, useEffect, useRef } from 'react';
import {
   Platform,
} from 'react-native';
import { KeyboardAvoidingView, ScrollView, Text, Box } from 'native-base';

import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { updateResults } from '../store/actions/results';

import {
   getRndVerbsForForms,
   filterVerbsByLevel,
   getEnoughVerbsState,
   getStartedState,
} from '../helpers/helpers';

import {
   calcEstimatedAccomplishTime,
   calcTotalPointsForms,
   calcTotalPercentage,
   calcNumberCorrectAnswersForms,
   calcPoints,
} from '../helpers/points';

import { getResults, createResultsDb, saveResults } from '../helpers/results';

import { filterOutWithoutInfinitive } from '../helpers/helpers';

import { fetchOwnVerbs } from '../helpers/ownVerbs';

import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import ResultView from '../components/results/ResultView';
import CardComponentForms from '../components/cards/CardComponentForms';
import ButtonComponent from '../components/buttons/ButtonComponent';
import LatestResults from '../components/results/LatestResults';
import SpinnerComponent from '../components/styling/SpinnerComponent';
import ProgressBar from '../components/progress/ProgressBar';
import InfoContent from '../components/styling/InfoContent';

import { styles } from '../styles/styles';
import InfoEnoughVerbs from '../components/styling/InfoEnoughVerbs';

const FormsScreen = (props) => {
   const [verbs, setVerbs] = useState([]);
   const [verbsFiltered, setVerbsFiltered] = useState(false);
   const [randomizedVerbs, setRandomizedVerbs] = useState([]);
   const [points, setPoints] = useState(0);
   const [maxPoints, setMaxPoints] = useState(0);
   const [maxQuestions, setMaxQuestions] = useState(0);
   const [finished, setFinished] = useState(false);
   const [resultsData, setResultsData] = useState({});
   const [started, setStarted] = useState(false);
   const [tenseNames, setTenseNames] = useState([]);
   const [answeredIndex, setAnsweredIndex] = useState(0);
   const [resultsReady, setResultsReady] = useState(false);
   const [formsSelected, setFormsSelected] = useState(false);
   const [tableCreated, setTableCreated] = useState(false);
   const [resultsSaved, setResultsSaved] = useState(false);
   const [currentComponentIndex, setCurrentComponentIndex] = useState(0);
   const [startTime, setStartTime] = useState(0);
   const [endTime, setEndTime] = useState(0);
   const [enoughVerbs, setEnoughVerbs] = useState(false);
   const [ownVerbsLoaded, setOwnVerbsLoaded] = useState(false);

   const navigation = useNavigation();

   // This useEffect creates the result database
   useEffect(() => {
      setResultsReady(false);
      createResultsDb();
      setTableCreated(true);
   }, []);

   // useEffect cleanup
   useEffect(() => {
      return () => { };
   }, []);

   useEffect(() => {
      setStarted(getStartedState(10, props.level, props.language, props.language === 1 ? props.verbsSwedishOwn : props.verbsGermanOwn));
      setEnoughVerbs(getEnoughVerbsState(10, props.level, props.language, props.language === 1 ? props.verbsSwedishOwn : props.verbsGermanOwn));
   }, [props.level])

   useEffect(() => {
      if (props.infinitive || props.present || props.past || props.presperf) {
         setFormsSelected(true);
      }
   }, [props.infinitive, props.present, props.past, props.presperf]);

   useEffect(() => {
      // Set forms to be practised in Forms mode
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
      if (started) {
         setVerbsFiltered(false);
         let verbsByLanguage;
         let filteredVerbs;
         if (props.level !== 4) {
            verbsByLanguage = props.language === 1 ? filterOutWithoutInfinitive(props.verbsSwedish) : props.verbsGerman;
            filteredVerbs = filterVerbsByLevel(verbsByLanguage, props.level);
         } else if (props.level === 4) {
            verbsByLanguage = props.language === 1 ? filterOutWithoutInfinitive(props.verbsSwedishOwn) : props.verbsGermanOwn;
            filteredVerbs = verbsByLanguage;
         }
         setVerbs(filteredVerbs);
         setVerbsFiltered(true);
      }
   }, [started]);

    useEffect(() => {
      if (points > 0 && points >= maxPoints) {
         finish();
      }
   }, [points]);

   useEffect(() => {
      if (verbsFiltered && started) {
         // Get the forms of 5 different verbs
         if (randomizedVerbs.length === 0) {
            setRandomizedVerbs(getRndVerbsForForms(verbs, 5, props.level));
         }
      }
   }, [verbsFiltered, verbs, started]);

   useEffect(() => {
      if (tableCreated && resultsReady) {
         saveResultsAsync();
       }
   }, [resultsReady]);

   const saveResultsAsync = async () => {
      try {
         await saveResults(
            2,
            props.language,
            props.level,
            resultsData.numberCorrectAnswers,
            resultsData.maxQuestions,
            resultsData.totalPoints,
            resultsData.maxPoints,
            resultsData.totalPercentage,
            endTime
         );
         setResultsSaved(true);
      } catch (error) {
         console.log(error);
      }
   };

   const updateResultsAsync = async () => {
      props.dispatch(updateResults(await getResults()));
   };

   useEffect(() => {
      updateResultsAsync();
   }, [resultsSaved]);

   const startAgain = () => {
      setRandomizedVerbs([]);
      setStarted(true);
      setFinished(false);
      setPoints(0);
      setResultsData({});
      setResultsReady(false);
      setResultsSaved(false);
      setCurrentComponentIndex(0);
      setStartTime(Date.now());
      setEndTime(0);
   };

   useEffect(() => {
      if (finished) {
         // The points calculation functions are located in /helpers/points.js
         const estimatedAccomplishTime = calcEstimatedAccomplishTime(maxPoints, props.level);
         const totalPoints = calcTotalPointsForms(
            startTime,
            Date.now(),
            estimatedAccomplishTime,
            points,
            maxPoints
         );
         setResultsData({
            points: points,
            totalPoints: totalPoints,
            maxPoints: maxPoints,
            maxQuestions: maxQuestions,
            totalPercentage: calcTotalPercentage(totalPoints, maxPoints),
            numberCorrectAnswers: calcNumberCorrectAnswersForms(points),
         });
         setResultsReady(true);
      }
   }, [finished]);

   useEffect(() => {
      if ((finished && resultsData) || started) {
         scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
         setAnsweredIndex(0);
      }
   }, [finished, resultsData, started]);

   const finish = () => {
      setStarted(false);
      setFinished(true);
      setEndTime(Date.now());
   };

   const scrollViewRef = useRef();

   return (
      <>
         <HeaderComponent title="Verbien muodot" goBack={navigation.goBack} />
         {started && points > 0 && (
            <ProgressBar
               currentComponentIndex={currentComponentIndex}
               points={points}
               maxPoints={maxPoints}
            />
         )}
         <KeyboardAvoidingView
            style={styles(props).flexOne}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
         >
            <ScrollView
               keyboardShouldPersistTaps="always"
               style={styles(props).scrollViewForms}
               ref={scrollViewRef}
               pb='30'
            >
               {finished && resultsReady && resultsData && resultsSaved && (
                  <>
                     <ResultView
                        resultsData={resultsData}
                        startAgain={startAgain}
                        forms
                     />
                     <LatestResults count={3} showTypes />
                  </>
               )}
               {!formsSelected &&
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
                        function={() => navigation.navigate('Asetukset')}
                     />
                  </>
               }
               <Text>
                  randomizedVerbs.length: {randomizedVerbs.length}{'\n'}
                  props.verbsSwedishOwn.length: {props.verbsSwedishOwn.length}{'\n'}
                  props.verbsGermanOwn.length: {props.verbsGermanOwn.length}{'\n'}
                  verbs.length: {verbs.length}
               </Text>
               {!enoughVerbs &&
                  <InfoEnoughVerbs 
                     count={10} 
                     language={props.language} 
                     verbsSwedishOwnLength={props.verbsSwedishOwn.length} 
                     verbsGermanOwnLength={props.verbsGermanOwn.length} 
                     centered
                  />
               }              
               {randomizedVerbs && started && enoughVerbs &&
                  <InfoContent centered>
                     <Text>
                        <Text>
                           Kirjoita epäsäännöllisten verbien muodot.{'\n'}
                        </Text>
                        <Text>
                           Voit valita harjoiteltavat verbimuodot
                        </Text>
                        <Text style={{ fontWeight: 'bold', color: '#7E00C5' }} onPress={() => navigation.navigate('Omat asetukseni')}>
                           {' '}Asetuksista
                        </Text>
                        <Text>
                           . Nopeudesta palkitaan!
                        </Text>
                     </Text>
                  </InfoContent>
               }
               {randomizedVerbs ? (
                  randomizedVerbs.map((verbFormArray, index) =>
                     verbFormArray.length === 1 ? (
                        verbFormArray.map((v, i) => (
                           <CardComponentForms
                              key={v.verb_id}
                              verbForm={v}
                              synonyms={false}
                              finished={finished}
                              componentIndex={index}
                              tenseNames={tenseNames}
                              answeredIndex={answeredIndex}
                              started={started}
                              points={points}
                              setPoints={setPoints}
                              calcPoints={calcPoints}
                              currentComponentIndex={currentComponentIndex}
                              setCurrentComponentIndex={
                                 setCurrentComponentIndex
                              }
                           />
                        ))
                     ) : (
                        <CardComponentForms
                           key={verbFormArray[0].verb_id}
                           verbForm={verbFormArray}
                           synonyms={true}
                           finished={finished}
                           componentIndex={index}
                           tenseNames={tenseNames}
                           answeredIndex={answeredIndex}
                           started={started}
                           points={points}
                           setPoints={setPoints}
                           calcPoints={calcPoints}
                           currentComponentIndex={currentComponentIndex}
                           setCurrentComponentIndex={setCurrentComponentIndex}
                        />
                     )
                  )
               ) : (
                  <Box>
                     <SpinnerComponent text="Ladataan verbejä..." />
                  </Box>
               )}
               {formsSelected && randomizedVerbs && !finished && enoughVerbs && (
                 <>
                 <ButtonComponent
                     color="#7E00C5"
                     title="Valmis"
                     function={finish}
                     withMarginBottomAndTop
                  />
                  <ButtonComponent
                  color="#7E00C5"
                  title="Arvo uudet verbit"
                  function={startAgain}
                  withMarginBottom
                  />
               </>
               )}
            </ScrollView>
         </KeyboardAvoidingView>
         {finished &&
            <FooterComponent />
         }
      </>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   verbsSwedishOwn: state.verbs.verbsSwedishOwn,
   verbsGermanOwn: state.verbs.verbsGermanOwn,
   level: state.settings.level,
   language: state.settings.language,
   infinitive: state.settings.tenses.infinitive,
   present: state.settings.tenses.present,
   past: state.settings.tenses.past,
   presperf: state.settings.tenses.presperf,
   tenses: state.settings.tenses,
   results: state.results.results,
});

export default connect(mapStateToProps)(FormsScreen);
