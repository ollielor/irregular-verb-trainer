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
import { fetchOwnVerbsSwedish, fetchOwnVerbsGerman } from '../store/actions/verbs';

import DatabaseOwnVerbs from '../modules/DatabaseOwnVerbs';
import { getOwnVerbsFromDb } from '../helpers/ownVerbs';
import { createOwnVerbsDb } from '../helpers/ownVerbs';

const BrowseScreen = (props) => {

   const [orderAlphabetically, setOrderAlphabetically] = useState(false);
   const [verbs, setVerbs] = useState([]);
   const [verbsLoaded, setVerbsLoaded] = useState(false);
   const [ownVerbsSwedish, setOwnVerbsSwedish] = useState([]);
   const [ownVerbsGerman, setOwnVerbsGerman] = useState([]);
   const [levelToShow, setLevelToShow] = useState(1);
   const [meaningIds, setMeaningIds] = useState([]);
   const [verbAdded, setVerbAdded] = useState(null);
   const [verbRemoved, setVerbRemoved] = useState(null);
   const [ownVerbsDbCreated, setOwnVerbsDbCreated] = useState(false);
   const [meaningIdsSelectedSwe, setMeaningIdsSelectedSwe] = useState([]);
   const [meaningIdsSelectedGer, setMeaningIdsSelectedGer] = useState([]);

   const levels = [1, 2, 3];

   const navigation = useNavigation();

   console.log('Props from BrowseScreen: ', props)

   useEffect(() => {
      // Create own verbs database for Swedish verbs
      createOwnVerbsDb(1);
      // Create own verbs database for Swedish verbs
      createOwnVerbsDb(2);
      fetchMeaningIds();
   }, []);

   useEffect(() => {
      return () => { };
   }, []);

   const showByLevel = (level) => {
      setLevelToShow(level);
      setVerbsLoaded(false);
   }

   const addToOwnVerbs = (meaningId) => {
      let verbsFiltered = [];
      if (props.language === 1) {
         verbsFiltered = ownVerbsSwedish.filter((ownVerb) => ownVerb !== meaningId);
      } else {
         verbsFiltered = ownVerbsGerman.filter((ownVerb) => ownVerb !== meaningId);
      }
      if (props.language === 1) {
         setOwnVerbsSwedish([...verbsFiltered, meaningId]);
      } else {
         setOwnVerbsGerman([...verbsFiltered, meaningId]);   
      }
      insertMeaningId(meaningId);
   }

   const removeFromOwnVerbs = (meaningId) => {
      let ownVerbList = [];
      if (props.language === 1) {
         ownVerbList = ownVerbsSwedish.filter((ownVerb) => ownVerb !== meaningId);
         setOwnVerbsSwedish(ownVerbList);
      } else {
         ownVerbList = ownVerbsGerman.filter((ownVerb) => ownVerb !== meaningId);
         setOwnVerbsGerman(ownVerbList);
      }
      deleteMeaningId(meaningId);
   }

   const insertMeaningId = (meaningId) => {
      deleteMeaningId(meaningId);
      let query = props.language === 1 ? 'insert into own_verbs_sv (meaning_id) values (?);' : 'insert into own_verbs_de (meaning_id) values (?);';
      DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(query, [
               meaningId
            ]);
         },
         (error) => {
            console.log('Transaction error: ', error);
         },
         null,
         null
      );
      mapVerbsToMeaningIds();
   };

   const deleteMeaningId = (meaningId) => {
      let query = props.language === 1 ? 'delete from own_verbs_sv where meaning_id = (?);' : 'delete from own_verbs_de where meaning_id = (?);'
      DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(query, [
               meaningId
            ]);
         },
         (error) => {
            console.log('Transaction error: ', error);
         },
         null,
         null
      );
   }

   const fetchMeaningIds = () => {
      let query = props.language === 1 ? 'select * from own_verbs_sv;' : 'select * from own_verbs_de;'
      return DatabaseOwnVerbs.transaction(
         (tx) => {
            tx.executeSql(
               query,
               [],
               (tx, results) => {
                  console.log('From fetchMeaningIds: ', results.rows._array)
                  if (props.language === 1) {
                     setMeaningIdsSelectedSwe(results.rows._array);
                  } else {
                     setMeaningIdsSelectedGer(results.rows._array);
                  }
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
   }

   const mapVerbsToMeaningIds = () => {
      let verbsByLanguage = props.language === 1 ? props.verbsSwedish : props.verbsGerman;
      let verbsFetched = [];
      if (props.language === 1) {
         verbsFetched = meaningIdsSelectedSwe.map((meaningItem) => meaningItem.meaning_id)
         .map((meaningId) => verbsByLanguage.filter((verb) => verb.meaning_id === meaningId));
      } else {
         verbsFetched = meaningIdsSelectedGer.map((meaningItem) => meaningItem.meaning_id)
         .map((meaningId) => verbsByLanguage.filter((verb) => verb.meaning_id === meaningId));
      }
      let verbsOrdered = [];
      verbsOrdered = verbsFetched.map((verbArray) => verbArray.length < 2 ? verbArray[0] : verbArray);
      if (props.language === 1) {
         props.dispatch(fetchOwnVerbsSwedish(verbsOrdered));
      } else {
         props.dispatch(fetchOwnVerbsGerman(verbsOrdered));      
      }
   }

   return (
      <>
         <HeaderComponent
            title="Selaa verbejä"
            goBack={navigation.goBack}
         />
         <>
            <HStack alignSelf='center'>
            <ButtonComponentNarrow
               withMargin
               title='Tasoittain' 
               function={() => setOrderAlphabetically(false)}
               borderColor='#4E00C5'
               disabled={!orderAlphabetically} 
            />
            <ButtonComponentNarrow
               withMargin
               title='Aakkosittain'
               function={() => setOrderAlphabetically(true)}
               borderColor='#4E00C5'
               disabled={orderAlphabetically} 
            />
            </HStack>
         {!orderAlphabetically && 
                  <HStack alignSelf='center'>
                  {levels.map((level, index) => (
                     <ButtonComponentNarrow
                     withMargin
                     title={'Taso ' + level}
                     function={() => showByLevel(level)}
                     borderColor='#4E00C5'
                     disabled={levelToShow === level} 
                     key={index}
                  />))}
                  </HStack>
         }
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
                  verbAdded={verbAdded}
               />
               ) : (
               <VerbListByAlphabet
                  verbs={verbs}
                  addToOwnVerbs={addToOwnVerbs}
                  removeFromOwnVerbs={removeFromOwnVerbs}
                  ownVerbsSwedish={ownVerbsSwedish}
                  ownVerbsGerman={ownVerbsGerman} 
                  setOwnVerbs={setOwnVerbs}
                  verbAdded={verbAdded}
               />)}
         </ScrollView>
         <FooterComponent />
         </>
      </>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   language: state.settings.language,
});

export default connect(mapStateToProps)(BrowseScreen);
