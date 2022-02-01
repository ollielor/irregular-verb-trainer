import React, { useState, useEffect } from 'react';
import { HStack, ScrollView, Box, useToast } from 'native-base';

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
   deleteVerbId,
   fetchVerbIds,
   deleteAllVerbIds,
   fetchOwnVerbs,
   insertVerbId,
   insertVerbIds,
   getVerbIdsArray,
   verbArrayOperations,
} from '../helpers/ownVerbs';
import SelectionBar from '../components/settings/SelectionBar';
import AlertComponent from '../components/alerts/AlertComponent';
import SaveVerbsComponent from '../components/settings/SaveVerbsComponent';

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
   const [ownVerbsLoaded, setOwnVerbsLoaded] = useState(false);
   const [settingsChanged, setSettingsChanged] = useState(false);
   const [settingsSaved, setSettingsSaved] = useState(false);
   const [destination, setDestination] = useState('');
   const [alertOpen, setAlertOpen] = useState(false);
   const [confirmed, setConfirmed] = useState(false);
   const [mounted, setMounted] = useState(false);

   const levels = [1, 2, 3];

   const navigation = useNavigation();

   useEffect(() => {
      setMounted(true);
      if (confirmed) {
         setAlertOpen(false);
         navigation.navigate(destination);
         setConfirmed(false);
         return () => { setMounted(false) };
      }
   }, [confirmed]);

   const confirm = () => {
      setSettingsChanged(false);
      setConfirmed(true);
   }

   const toast = useToast();

   useEffect(() => {
      // Create own verbs database for Swedish verbs
      createOwnVerbsDbSwedish();
      // Create own verbs database for German verbs
      createOwnVerbsDbGerman();
      updateOwnVerbs(props.language);
      getVerbIds();
    }, []);

   useEffect(() => {
      return () => {};
   }, []);

   const getVerbIds = async () => {
      let ownVerbs = [];
      ownVerbs = await fetchVerbIds(props.language); 
      let ownVerbsMapped = ownVerbs.map((ownVerb) => ownVerb.verb_id);
      if (props.language === 1) {
         setOwnVerbsSwedish(ownVerbsMapped);
      } else if (props.language === 2) {
         setOwnVerbsGerman(ownVerbsMapped);
      }
      setOwnVerbsLoaded(true);
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

   const addToOwnVerbs = (verbId) => {
      setSettingsChanged(true);
      if (props.language === 1 && !ownVerbsSwedish.includes(verbId)) {
         setOwnVerbsSwedish([...ownVerbsSwedish, verbId]);
      } else if (props.language === 2 && !ownVerbsGerman.includes(verbId)) {
         setOwnVerbsGerman([...ownVerbsGerman, verbId]);
      } 
   };

   const removeFromOwnVerbs = (verbId) => {
      setSettingsChanged(true);
      let ownVerbList = [];
      if (props.language === 1) {
         ownVerbList = ownVerbsSwedish.filter(
            (ownVerb) => ownVerb !== verbId
         );
         setOwnVerbsSwedish(ownVerbList);
      } else if (props.language === 2) {
         ownVerbList = ownVerbsGerman.filter(
            (ownVerb) => ownVerb !== verbId
         );
         setOwnVerbsGerman(ownVerbList);
      }
   };

   const selectAll = (language) => {
      setSettingsChanged(true);
      let ownVerbList = [];
      if (language === 1) {
         ownVerbList = props.verbsSwedish.map((verb) => verb.verb_id);
         setOwnVerbsSwedish(ownVerbList);
      } else if (language === 2) {
         ownVerbList = props.verbsGerman.map((verb) => verb.verb_id);
         setOwnVerbsGerman(ownVerbList);
      }
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
      setSettingsChanged(true);
      if (language === 1) {
         setOwnVerbsSwedish([]);
      } else if (language === 2) {
         setOwnVerbsGerman([]);
      }
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

   const saveVerbs = () => {
      deleteAllVerbIds(props.language);  
      insertVerbIds(props.language === 1 ? ownVerbsSwedish : ownVerbsGerman, props.language);
      updateOwnVerbs(props.language);
      toast.show({
         render: () => {
            return (
               <Box backgroundColor='#66dd33' p='3'>
                  Omat verbit tallennettu!
               </Box>
            )
         },
         placement: 'bottom',
         status: 'success',
         duration: 3000,
         isClosable: false
      });
      setSettingsChanged(false);
   }

   return (
      <>
         <AlertComponent
            alertOpen={alertOpen}
            setAlertOpen={setAlertOpen}
            confirmed={confirmed}
            setConfirmed={setConfirmed}
            confirm={confirm}
            text='Et ole tallentanut omia verbejäsi. Oletko varma, että haluat jatkaa?'
         />
         <HeaderComponent title="Selaa verbejä" goBack={navigation.goBack} 
            settingsChanged={settingsChanged} 
            setDestination={setDestination}
            setAlertOpen={setAlertOpen}
         />
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
               selectAll={() => selectAll(props.language)}
               deselectAll={() => deselectAll(props.language)}
               ownVerbsLoaded={ownVerbsLoaded}
               verbsLoaded={verbsLoaded}
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
                     verbsLoaded={verbsLoaded}
                     setVerbsLoaded={setVerbsLoaded}
                  />
               )}
            </ScrollView>
            <SaveVerbsComponent p='2' saveVerbs={saveVerbs} settingsChanged={settingsChanged} />
            <FooterComponent             
               settingsChanged={settingsChanged}
               setSettingsChanged={setSettingsChanged}
               settingsSaved={settingsSaved}
               setDestination={setDestination}
               setAlertOpen={setAlertOpen}
            />
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
