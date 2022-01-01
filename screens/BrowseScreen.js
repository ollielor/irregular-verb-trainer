import React, { useState, useEffect, Fragment } from 'react';
import { HStack, ScrollView, Text, VStack } from 'native-base';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { sortVerbsAlphabetically, sortVerbsByLevel } from '../helpers/sorters';

import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import CardComponentBrowse from '../components/cards/CardComponentBrowse';
import Heading from '../components/styling/Heading';
import ButtonComponentNarrow from '../components/buttons/ButtonComponentNarrow';
import { styles } from '../styles/styles';
import VerbListByLevel from '../components/verblists/VerbListByLevel';
import SpinnerComponent from '../components/styling/SpinnerComponent';
import VerbListByAlphabet from '../components/verblists/VerbListByAlphabet';

const BrowseScreen = (props) => {

   const [orderAlphabetically, setOrderAlphabetically] = useState(false);
   const [verbs, setVerbs] = useState([]);
   const [verbsLoaded, setVerbsLoaded] = useState(false);
   const [ownVerbs, setOwnVerbs] = useState([]);
   const [levelToShow, setLevelToShow] = useState(1);

   const levels = [1, 2, 3];

   const navigation = useNavigation();


   useEffect(() => {
      return () => { };
   }, []);

   const showByLevel = (level) => {
      setLevelToShow(level);
      setVerbsLoaded(false);
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
                  ownVerbs={ownVerbs} 
                  setOwnVerbs={setOwnVerbs}
                  levelToShow={levelToShow}
                  verbsLoaded={verbsLoaded}
                  setVerbsLoaded={setVerbsLoaded}
               />
               ) : (
               <VerbListByAlphabet
                  verbs={verbs}
                  ownVerbs={ownVerbs} 
                  setOwnVerbs={setOwnVerbs}
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
