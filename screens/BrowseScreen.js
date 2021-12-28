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

const BrowseScreen = (props) => {

   const [orderAlphabetically, setOrderAlphabetically] = useState(false);
   const [verbs, setVerbs] = useState(false);
   const [verbsLoaded, setVerbsLoaded] = useState(false);
   const [verbsOrdered, setVerbsOrdered] = useState([]);

   useEffect(() => {
      if (props.language === 1) {
         setVerbs(props.verbsSwedish);
      } else {
         setVerbs(props.verbsGerman);
      }
      setVerbsLoaded(true);
   }, [props.language]);

   const navigation = useNavigation();

   useEffect(() => {
      return () => { };
   }, []);

   return (
      <>
         <HeaderComponent
            title="Selaa verbejä"
            goBack={navigation.goBack}
         />
         {!verbsLoaded ? (
            <SpinnerComponent text='Ladataan verbejä...' />
         ) : (
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
         <ScrollView style={styles(props).browseContainer}>
            {orderAlphabetically ?
            (
               <VerbListByAlphabet verbs={verbs} />
            ) : (
               <VerbListByLevel verbs={verbs} />
            )}
         </ScrollView>
         <FooterComponent />
         </>
         )}
      </>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   language: state.settings.language,
});

export default connect(mapStateToProps)(BrowseScreen);
