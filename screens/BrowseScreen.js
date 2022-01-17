import React, { useState, useEffect, Fragment } from 'react';
import { HStack, ScrollView, Text, VStack } from 'native-base';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import CardComponentBrowse from '../components/cards/CardComponentBrowse';
import Heading from '../components/styling/Heading';
import ButtonComponentNarrow from '../components/buttons/ButtonComponentNarrow';
import { styles } from '../styles/styles';
import VerbListByLevel from '../components/verblists/VerbListByLevel';
import SpinnerComponent from '../components/styling/SpinnerComponent';
import VerbListByAlphabet from '../components/verblists/VerbListByAlphabet';
import {
   fetchOwnVerbsSwedish,
   fetchOwnVerbsGerman,
   clearOwnVerbsGerman,
   clearOwnVerbsSwedish
} from '../store/actions/verbs';

import DatabaseOwnVerbs from '../modules/DatabaseOwnVerbs';
import {
   createOwnVerbsDbSwedish,
   createOwnVerbsDbGerman,
   convertStringsToNumbers,
   deleteMeaningId,
   fetchMeaningIds,
   deleteAllMeaningIds,
   fetchOwnVerbs,
   insertMeaningId,
   insertMeaningIds,
   getMeaningIdsArray,
   verbArrayOperations,
} from '../helpers/ownVerbs';
import SelectionBar from '../components/settings/SelectionBar';

const BrowseScreen = (props) => {
   const [orderAlphabetically, setOrderAlphabetically] = useState(false);
   const [verbs, setVerbs] = useState([]);
   const [verbsLoaded, setVerbsLoaded] = useState(false);
   const [ownVerbsSwedish, setOwnVerbsSwedish] = useState([]);
   const [ownVerbsGerman, setOwnVerbsGerman] = useState([]);
   const [levelToShow, setLevelToShow] = useState(1);
   const [ownVerbsAdded, setOwnVerbsAdded] = useState(true);
   const [ownVerbCount, setOwnVerbCount] = useState(0);
   const [verbAdded, setVerbAdded] = useState(null);
   const [verbRemoved, setVerbRemoved] = useState(null);
   const [ownVerbsDbCreated, setOwnVerbsDbCreated] = useState(false);
   const [meaningIdsSelectedSwe, setMeaningIdsSelectedSwe] = useState([]);
   const [meaningIdsSelectedGer, setMeaningIdsSelectedGer] = useState([]);
   const [loadingOwnVerbs, setLoadingOwnVerbs] = useState(false);

   const levels = [1, 2, 3];

   const navigation = useNavigation();

   console.log('ownVerbsGerman: ', ownVerbsGerman);

   useEffect(() => {
      // Create own verbs database for Swedish verbs
      createOwnVerbsDbSwedish();
      // Create own verbs database for German verbs
      createOwnVerbsDbGerman();
      updateOwnVerbs(props.language);
      fetchVerbIds();
    }, []);

   useEffect(() => {
      return () => {};
   }, []);

   const fetchVerbIds = async () => {
      let ownVerbs = [];
      ownVerbs = await fetchMeaningIds(props.language); 
      let ownVerbsMapped = ownVerbs.map((ownVerb) => ownVerb.meaning_id);
      if (props.language === 1) {
         setOwnVerbsSwedish(ownVerbsMapped);
      } else if (props.language === 2) {
         setOwnVerbsGerman(ownVerbsMapped);
      }
   }
/*    useEffect(() => {
      updateOwnVerbs(props.language);
   }); */

/*    useEffect(() => {
      let arrayFlatten = [];
      if (props.language === 1) {
         arrayFlatten = ownVerbsSwedish.flatMap((item) => item);
      } else if (props.language === 2) {
         arrayFlatten = ownVerbsGerman.flatMap((item) => item);
      }
      setOwnVerbCount(arrayFlatten.length);
   }, [ownVerbsGerman, ownVerbsGerman, props.language]); */

   const showByLevel = (level) => {
      setLevelToShow(level);
      setVerbsLoaded(false);
   };

   const addToOwnVerbs = (meaningId) => {
      deleteMeaningId(meaningId, props.language);
      let verbsFiltered = [];
      if (props.language === 1) {
         setOwnVerbsSwedish([...verbsFiltered, meaningId]);
      } else if (props.language === 2) {
         setOwnVerbsGerman([...ownVerbsGerman, meaningId]);
      } 
      insertMeaningId(meaningId, props.language);
      updateOwnVerbs(props.language);
   };

   const removeFromOwnVerbs = (meaningId) => {
      let ownVerbList = [];
      if (props.language === 1) {
         ownVerbList = ownVerbsSwedish.filter(
            (ownVerb) => ownVerb !== meaningId
         );
         setOwnVerbsSwedish(ownVerbList);
      } else if (props.language === 2) {
         ownVerbList = ownVerbsGerman.filter(
            (ownVerb) => ownVerb !== meaningId
         );
         setOwnVerbsGerman(ownVerbList);
      }
      deleteMeaningId(meaningId, props.language);
      updateOwnVerbs(props.language);
   };

   const selectAll = (language) => {
      let ownVerbList = [];
      deleteAllMeaningIds(language);
      if (language === 1) {
         ownVerbList = props.verbsSwedish.map((verb) => verb.meaning_id);
         setOwnVerbsSwedish(ownVerbList);
         insertMeaningIds(ownVerbList, language);
      } else if (language === 2) {
         ownVerbList = props.verbsGerman.map((verb) => verb.meaning_id);
         setOwnVerbsGerman(ownVerbList);
         insertMeaningIds(ownVerbList, language);
      }
      updateOwnVerbs(language);
   };

/*    const selectAll = (language) => {
      let ownVerbList = [];
      deleteAllMeaningIds(language);
      if (language === 1) {
         ownVerbList = props.verbsSwedish.map((verb) => verb.meaning_id);
         console.log('ownVerbList: ', ownVerbList);
         setOwnVerbsSwedish(ownVerbList);
         insertMeaningIds(ownVerbList, props.language);
         updateOwnVerbs(language);
      } else if (language === 2) {
         ownVerbList = props.verbsGerman.map((verb) => verb.meaning_id);
         setOwnVerbsGerman(ownVerbList);
         insertMeaningIds(ownVerbList, props.language);
         updateOwnVerbs(language);
      }
   }; */

   const deselectAll = (language) => {
      deleteAllMeaningIds(language);
      if (language === 1) {
         setOwnVerbsSwedish([]);
      } else if (language === 2) {
         setOwnVerbsGerman([]);
      }
     updateOwnVerbs(language);
   };

   const updateOwnVerbs = async (language) => {
      try {
         if (language === 1) {
            props.dispatch(await fetchOwnVerbs(props.verbsSwedish, language));
         } else if (language === 2) {
            props.dispatch(await fetchOwnVerbs(props.verbsGerman, language));
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <HeaderComponent title="Selaa verbejä" goBack={navigation.goBack} />
         <>
            <HStack alignSelf="center">
               <ButtonComponentNarrow
                  withMargin
                  title="Tasoittain"
                  function={() => setOrderAlphabetically(false)}
                  borderColor="#4E00C5"
                  disabled={!orderAlphabetically}
               />
               <ButtonComponentNarrow
                  withMargin
                  title="Aakkosittain"
                  function={() => setOrderAlphabetically(true)}
                  borderColor="#4E00C5"
                  disabled={orderAlphabetically}
               />
            </HStack>
            {!orderAlphabetically && (
               <HStack alignSelf="center">
                  {levels.map((level, index) => (
                     <ButtonComponentNarrow
                        withMargin
                        title={'Taso ' + level}
                        function={() => showByLevel(level)}
                        borderColor="#4E00C5"
                        disabled={levelToShow === level}
                        key={index}
                     />
                  ))}
               </HStack>
            )}
            <SelectionBar
               ownVerbsSwedish={ownVerbsSwedish}
               ownVerbsGerman={ownVerbsGerman}
               ownVerbCount={ownVerbCount}
               selectAll={() => selectAll(props.language)}
               deselectAll={() => deselectAll(props.language)}
               loadingOwnVerbs={loadingOwnVerbs}
            />
            <ScrollView style={styles(props).browseContainer}>
               {!orderAlphabetically ? (
                  <VerbListByLevel
                     verbs={verbs}
                     ownVerbsSwedish={ownVerbsSwedish}
                     ownVerbsGerman={ownVerbsGerman}
                     addToOwnVerbs={addToOwnVerbs}
                     removeFromOwnVerbs={removeFromOwnVerbs}
                     levelToShow={levelToShow}
                     verbsLoaded={verbsLoaded}
                     setVerbsLoaded={setVerbsLoaded}
                  />
               ) : (
                  <VerbListByAlphabet
                     verbs={verbs}
                     addToOwnVerbs={addToOwnVerbs}
                     removeFromOwnVerbs={removeFromOwnVerbs}
                     ownVerbsSwedish={ownVerbsSwedish}
                     ownVerbsGerman={ownVerbsGerman}
                  />
               )}
            </ScrollView>
            <FooterComponent />
         </>
      </>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   verbsGermanOwn: state.verbs.verbsGermanOwn,
   verbsSwedishOwn: state.verbs.verbsSwedishOwn,
   language: state.settings.language,
});

export default connect(mapStateToProps)(BrowseScreen);
