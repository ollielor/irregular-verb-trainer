import React, { useState, useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';
import { Text } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import {
   getRndInt,
   filterVerbsByLevel,
   getStartedState,
   getEnoughVerbsState,
   getRndVerbsForMeanings,
   testMeanings
} from '../helpers/helpers';

import {
   calcTotalPercentage,
   calcNumberCorrectAnswersMeanings,
   calcAccuracyPercentage,
   calcTotalPointsMeanings,
} from '../helpers/points';

import { updateResults } from '../store/actions/results';

import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import CardComponentMeanings from '../components/cards/CardComponentMeanings';
import ResultView from '../components/results/ResultView';
import LatestResults from '../components/results/LatestResults';
import SpinnerComponent from '../components/styling/SpinnerComponent';
import InfoEnoughVerbs from '../components/styling/InfoEnoughVerbs';

import { connect } from 'react-redux';
import CardComponentMastery from '../components/cards/CardComponentMastery';
import { createResultsDb, getResults, saveResults } from '../helpers/results';

import { filterOutWithoutInfinitive } from '../helpers/helpers';

import { styles } from '../styles/styles';
import InfoContent from '../components/styling/InfoContent';
import ButtonComponentNarrow from '../components/buttons/ButtonComponentNarrow';

const MeaningsScreen = (props) => {
   const [verbs, setVerbs] = useState([]);
   const [verbsFiltered, setVerbsFiltered] = useState(false);
   const [randomizedVerbs, setRandomizedVerbs] = useState([]);
   const [points, setPoints] = useState(0);
   const [maxPoints, setMaxPoints] = useState(0);
   const [answered, setAnswered] = useState([]);
   const [finished, setFinished] = useState(false);
   const [results, setResults] = useState({});
   const [started, setStarted] = useState(false);
   const [resultsReady, setResultsReady] = useState(false);
   const [resultsSaved, setResultsSaved] = useState(false);
   const [tableCreated, setTableCreated] = useState(false);
   const [mastered, setMastered] = useState([]);
   const [notMastered, setNotMastered] = useState([]);
   const [numberQuestions, setNumberQuestions] = useState(5);
   const [startTime, setStartTime] = useState(0);
   const [endTime, setEndTime] = useState(0);
   const [enoughVerbs, setEnoughVerbs] = useState(false);

   const scrollViewRef = useRef();
 
   const navigation = useNavigation();

   useEffect(() => {
      if (finished) {
         scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
      }
   }, [finished]);

   useEffect(() => {
      setStarted(getStartedState(40, props.level, props.language, props.language === 1 ? props.verbsSwedishOwn : props.verbsGermanOwn));
      setEnoughVerbs(getEnoughVerbsState(40, props.level, props.language, props.language === 1 ? props.verbsSwedishOwn : props.verbsGermanOwn));
   }, [props.level])

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
            verbsByLanguage = filterOutWithoutInfinitive(props.level === 4 ? props.verbsSwedishOwn : props.verbsSwedish);
         } else if (props.language === 2 ) {
            verbsByLanguage = props.level === 4 ? props.verbsGermanOwn : props.verbsGerman;
         }
         let filteredVerbs = [];
         if (props.level !== 4) {
            filteredVerbs = filterVerbsByLevel(verbsByLanguage, props.level);       
            setVerbs(filteredVerbs);
         } else {
            setVerbs(verbsByLanguage);
         }
         setVerbsFiltered(true);
      }
   }, [props.level, props.language, started]);

   const updateResultsAsync = async () => {
      props.dispatch(updateResults(await getResults()));
   }

   useEffect(() => {
      updateResultsAsync();
   }, [resultsSaved]);

   useEffect(() => {
      if (started && verbsFiltered) {
         if (randomizedVerbs.length === 0) {
            setRandomizedVerbs(getRndVerbsForMeanings(numberQuestions, verbs)); 
         }
      }
   }, [started, verbsFiltered, randomizedVerbs]);

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
      if (tableCreated && resultsReady && endTime > 0 && !resultsSaved) {
         saveResultsAsync();
      }
   }, [resultsReady, endTime]);

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
            endTime
         )
         setResultsSaved(true);
      } catch (error) {
         console.log(error);
      }
   }

   // This function clears all values when the exercise is started again
   const startAgain = () => {
      setRandomizedVerbs([]);
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
      setStartTime(Date.now());
      setEndTime(0);
    };

   useEffect(() => {
      if (answered.length === numberQuestions) {
         setFinished(true);
      }
   }, [answered]);

   useEffect(() => {
      if (finished) {
         setEndTime(Date.now());
         let accuracyPercentage = calcAccuracyPercentage(points, maxPoints);
         let totalPoints = calcTotalPointsMeanings(startTime, endTime, accuracyPercentage, points, numberQuestions);
         setResults({
            points: points,
            totalPoints: totalPoints,
            maxPoints: maxPoints,
            totalPercentage: calcTotalPercentage(totalPoints, maxPoints),
            numberCorrectAnswers: calcNumberCorrectAnswersMeanings(answered),
            totalAnswered: answered.length,
         })
         setResultsReady(true);
      }
   }, [finished])

   return (
      <>
         <HeaderComponent
            title="Verbien merkitykset"
            goBack={navigation.goBack}
         />
         {!enoughVerbs &&
                  <InfoEnoughVerbs 
                  count={40} 
                  language={props.language} 
                  verbsSwedishOwnLength={props.verbsSwedishOwn.length} 
                  verbsGermanOwnLength={props.verbsGermanOwn.length} 
                  centered
               />
         }
         <ScrollView
            keyboardShouldPersistTaps="always"
            style={styles(props).flexOne, { backgroundColor: '#eee' }}
            ref={scrollViewRef}
         >
            <>
               {!randomizedVerbs && <Text>Arvotaan verbejä...</Text>}
               {finished && results && (
                  <>
                     <ResultView resultsData={results} startAgain={() => startAgain()} />
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
               )) 
               }
               {started && !randomizedVerbs &&
               (
                  <SpinnerComponent text='Verbejä ladataan...' />
               )}
               {!finished && (
                  <ButtonComponentNarrow title='Arvo uudet verbit' function={() => startAgain()} withMargin />
               )}
            </>
         </ScrollView>
         <FooterComponent />
      </>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   verbsGermanOwn: state.verbs.verbsGermanOwn,
   verbsSwedishOwn: state.verbs.verbsSwedishOwn,
   language: state.settings.language,
   level: state.settings.level,
   results: state.results.results,
});

export default connect(mapStateToProps)(MeaningsScreen);
