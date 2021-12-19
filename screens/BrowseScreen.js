import React, { useState, useEffect, Fragment } from 'react';
import { ScrollView, HStack, VStack } from 'native-base';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import CardComponentBrowse from '../components/cards/CardComponentBrowse';
import Heading from '../components/styling/Heading';
import ButtonComponentNarrowWhite from '../components/buttons/ButtonComponentNarrowWhite';
import { styles } from '../styles/styles';

const BrowseScreen = (props) => {

   const [orderAlphabetically, setOrderAlphabetically] = useState(false);
   
   const levels = [1, 2, 3];

   const verbList = [];

   let verbs;
   if (props.language === 1) {
      verbs = props.verbsSwedish;
   } else {
      verbs = props.verbsGerman;
   }

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
         <VStack flexDirection='row' justifyContent='center'>
            <ButtonComponentNarrowWhite
               withMargin
               title='Tasoittain' 
               function={() => setOrderAlphabetically(false)}
               borderColor='#4E00C5'
               disabled={!orderAlphabetically} 
            />
            <ButtonComponentNarrowWhite
               withMargin
               title='Aakkosittain' 
               function={() => setOrderAlphabetically(true)}
               borderColor='#4E00C5'
               disabled={orderAlphabetically} 
            />
         </VStack>
         <ScrollView style={styles(props).browseContainer}>
            {!orderAlphabetically && levels
               .map((level, index) => 
                  verbs.filter((verb, idx) => verb.level === level)
                     .sort((a, b) => 
                     a.infinitive === '-' || b.infinitive === '-' ?
                     (a.present > b.present
                        ? 1 
                        : -1)
                     : (a.infinitive > b.infinitive ? 1 : -1)
                     ).map((verbForm, idx) => (
                        <Fragment key={idx}>
                           {idx === 0 && <Heading>Taso {level}</Heading>}
                           <CardComponentBrowse key={level} verb={verbForm} />
                        </Fragment>
                     )))
            }
            {orderAlphabetically && verbs
                   .sort((a, b) => 
                     a.infinitive === '-' || b.infinitive === '-' ?
                     (a.present > b.present
                        ? 1 
                        : -1)
                     : (a.infinitive > b.infinitive ? 1 : -1)
                  ).map((verbForm, idx) => (
                     <Fragment key={idx}>
                        <CardComponentBrowse verb={verbForm} />
                     </Fragment>
                  ))}
         </ScrollView>
         <FooterComponent />
      </>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   language: state.settings.language,
});

export default connect(mapStateToProps)(BrowseScreen);
