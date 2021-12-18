import React, { useState, useEffect, Fragment } from 'react';
import { ScrollView } from 'native-base';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import CardComponentBrowse from '../components/cards/CardComponentBrowse';
import Heading from '../components/styling/Heading';
import { styles } from '../styles/styles';

const BrowseScreen = (props) => {

   const [ownVerbList, setOwnVerbList] = useState([]);
   
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
         <ScrollView style={styles(props).browseContainer}>
            {levels.map((level, index) => 
               verbs.filter((verb, idx) => verb.level === level)
                  .sort((a, b) =>
                     props.language === 1
                        ? a.present > b.present
                           ? 1
                           : -1
                        : a.infinitive > b.infinitive
                           ? 1
                           : -1
                  ).map((verbs, idx) => verbs
                  ).map((verbForm, idx) => (
                     <Fragment key={index}>
                        {idx === 0 && <Heading>Taso {level}</Heading>}
                        <CardComponentBrowse key={level} verb={verbForm} />
                     </Fragment>
                  )))}
{/*             {verbs.map((verb, index) => index < 3)
               .filter((verb) => verb.level === index)
               .sort((a, b) =>
                  props.language === 1
                     ? a.present > b.present
                        ? 1
                        : -1
                     : a.infinitive > b.infinitive
                        ? 1
                        : -1
               )
               .map((verb, index) => (
               <CardComponentBrowse key={index} verb={verb} />
            ))} */}
            <Heading>Taso 2</Heading>
            {verbs
               .filter((verb) => verb.level === 2)
               .sort((a, b) =>
                  props.language === 1
                     ? a.present > b.present
                        ? 1
                        : -1
                     : a.infinitive > b.infinitive
                        ? 1
                        : -1
               )
               .map((verb, index) => (
                  <CardComponentBrowse key={index} verb={verb} />
               ))}
            <Heading>Taso 3</Heading>
            {verbs
               .filter((verb) => verb.level === 3)
               .sort((a, b) =>
                  props.language === 1
                     ? a.present > b.present
                        ? 1
                        : -1
                     : a.infinitive > b.infinitive
                        ? 1
                        : -1
               )
               .map((verb, index) => (
                  <CardComponentBrowse key={index} verb={verb} />
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
