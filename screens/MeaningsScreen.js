import React, { useState, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import {
   getRndVerbs,
   getCurrentDate,
   filterVerbsByLevel,
} from '../helpers/helpers';

import {
   calcTotalPercentage,
   calcNumberCorrectAnswersMeanings,
   calcAccuracyPercentage,
   calcTotalPointsMeanings,
   calcTime
} from '../helpers/points';

import { updateResults } from '../store/actions/results';

import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import CardComponentMeanings from '../components/cards/CardComponentMeanings';
import ResultView from '../components/results/ResultView';
import LatestResults from '../components/results/LatestResults';
import SpinnerComponent from '../components/styling/SpinnerComponent';

import { connect } from 'react-redux';
import CardComponentMastery from '../components/cards/CardComponentMastery';
import { createResultsDb, getResults, saveResults } from '../helpers/results';

import { styles } from '../styles/styles';
import InfoContent from '../components/styling/InfoContent';

const MeaningsScreen = (props) => {
   const [verbs, setVerbs] = useState([]);
   const [verbsFiltered, setVerbsFiltered] = useState(false);
   const [randomizedVerbs, setRandomizedVerbs] = useState([]);
   const [points, setPoints] = useState(0);
   const [maxPoints, setMaxPoints] = useState(0);
   const [answered, setAnswered] = useState([]);
   const [finished, setFinished] = useState(false);
   const [results, setResults] = useState({});
   const [started, setStarted] = useState(true);
   const [resultsReady, setResultsReady] = useState(false);
   const [resultsSaved, setResultsSaved] = useState(false);
   const [tableCreated, setTableCreated] = useState(false);
   const [mastered, setMastered] = useState([]);
   const [notMastered, setNotMastered] = useState([]);
   const [numberQuestions, setNumberQuestions] = useState(5);
   const [startTime, setStartTime] = useState(null);
   const [endTime, setEndTime] = useState(null);

   const scrollViewRef = useRef();

   const navigation = useNavigation();

   useEffect(() => {
      if (finished) {
         scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
      }
   }, [finished]);

   // useEffect cleanup
   useEffect(() => {
      return () => { };
   }, []);

   useEffect(() => {
      createResultsDb();
      setTableCreated(true);
   }, [])

   useEffect(() => {
      if (started) {
         setVerbsFiltered(false);
         let verbsByLanguage;
         if (props.language === 1) {
            // Exclude verbs without infinitive forms (Swedish)
            verbsByLanguage = props.verbsSwedish.filter(
               (verb) => verb.infinitive.length > 1
            );
         } else {
            verbsByLanguage = props.verbsGerman;
         }
         const filteredVerbs = filterVerbsByLevel(verbsByLanguage, props.level);
         setVerbs(filteredVerbs);
         setVerbsFiltered(true);
         setStartTime(getCurrentDate());
      }
   }, [props.level, props.language, started]);

   const updateResultsAsync = async () => {
      props.dispatch(updateResults(await getResults()));
   }

   useEffect(() => {
      updateResultsAsync();
   }, [resultsSaved]);

   useEffect(() => {
      // Number of verbs shown in Meanings Screen
      if (started) {
         switch (props.level) {
            case 1:
               setNumberQuestions(5);
               break;
            case 2:
               setNumberQuestions(8);
               break;
            case 3:
               setNumberQuestions(10);
               break;
         }
         if (verbsFiltered) {
            const verbObjectArray = getRndVerbs(verbs, numberQuestions);
            setRandomizedVerbs(verbObjectArray);
         }
      }
   }, [verbsFiltered]);

   // This function is responsible for evaluating the answers and setting the number of points
   const evaluate = (accuracy, meaning, correctInfinitive, answeredInfinitive) => {
      if (accuracy) {
         setPoints(points + 20);
         setAnswered([...answered, { accuracy: 'correct' }]);
         setMastered([...mastered, { infinitive: correctInfinitive, meaning: meaning }])
      }
      if (!accuracy) {
         setAnswered([...answered, { accuracy: 'incorrect' }]);
         setNotMastered([...notMastered, { infinitive: correctInfinitive, meaning: meaning, wrongAnswer: answeredInfinitive }])
      }
      setMaxPoints(maxPoints + 20);
   };

   useEffect(() => {
      if (tableCreated && resultsReady && endTime && !resultsSaved) {
         saveResultsAsync();
         setResultsSaved(true);
      }
   }, [resultsReady, endTime, tableCreated]);

   const saveResultsAsync = async () => {
      try {
         await saveResults(
            1,
            props.language,
            props.level,
            results.numberCorrectAnswers,
            results.totalAnswered,
            results.totalPoints,
            results.maxPoints,
            results.totalPercentage,
            endTime.toISOString(),
         )
         setResultsSaved(true);
      } catch (error) {
         console.log(error);
      }
   }


   useEffect(() => {
      updateResultsAsync();
   }, [resultsSaved]);

   // This function clears all values when the exercise is started again
   const startAgain = () => {
      setStarted(true);
      setFinished(false);
      setPoints(0);
      setMaxPoints(0);
      setAnswered([]);
      setResults({});
      setResultsReady(false);
      setResultsSaved(false);
      setMastered([]);
      setNotMastered([]);
      setStartTime(getCurrentDate());
   };

   useEffect(() => {
      if (answered.length === numberQuestions) {
         setFinished(true);
         setEndTime(getCurrentDate());
      }
   }, [answered]);

   useEffect(() => {
      if (finished) {
         let accuracyPercentage = calcAccuracyPercentage(points, maxPoints);
         let totalPoints = calcTotalPointsMeanings(startTime, endTime, accuracyPercentage, points, numberQuestions);
         setResults({
            points: points,
            totalPoints: totalPoints,
            maxPoints: maxPoints,
            totalPercentage: calcTotalPercentage(totalPoints, maxPoints),
            numberCorrectAnswers: calcNumberCorrectAnswersMeanings(answered),
            totalAnswered: answered.length,
         });
         setResultsReady(true);
      }
   }, [finished]);

   return (
      <>
         <HeaderComponent
            title="Verbien merkitykset"
            goBack={navigation.goBack}
         />
         <ScrollView
            keyboardShouldPersistTaps="always"
            style={styles(props).flexOne, { backgroundColor: '#eee' }}
            ref={scrollViewRef}
         >
            <>
               {!randomizedVerbs && <Text>Arvotaan verbejä...</Text>}
               {finished && results && (
                  <>
                     <ResultView resultsData={results} startAgain={startAgain} />
                     {mastered.length > 0 &&
                        <CardComponentMastery mastered={mastered} />
                     }
                     {notMastered.length > 0 &&
                        <CardComponentMastery notMastered={notMastered} />
                     }
                     <LatestResults
                        count={3}
                        showTypes
                     />
                  </>
               )}
               {!props.results && (
                  <SpinnerComponent text="Tuloksia ladataan..." />
               )}
               {started && randomizedVerbs && !finished &&
                  <InfoContent centered>
                     <Text>
                        Valitse oikea {props.language === 1 ? 'ruotsinkielinen' : 'saksankielinen'} vaihtoehto.
                        Näet tuloksesi, kun olet vastannut kaikkiin kohtiin. Nopeudesta palkitaan!
                     </Text>
                  </InfoContent>
               }
               {started && randomizedVerbs && !finished && randomizedVerbs.map((verbGroup, index) => (
                  <CardComponentMeanings
                     key={index}
                     alternatives={verbGroup}
                     evaluate={evaluate}
                  />
               ))}
            </>
         </ScrollView>
         <FooterComponent />
      </>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   language: state.settings.language,
   level: state.settings.level,
   results: state.results.results,
});

export default connect(mapStateToProps)(MeaningsScreen);
