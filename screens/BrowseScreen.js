import React, { useEffect } from 'react';
import { Box, ScrollView } from 'native-base';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import FooterComponent from '../components/footer/FooterComponent';
import HeaderComponent from '../components/header/HeaderComponent';
import CardComponentBrowse from '../components/cards/CardComponentBrowse';
import Heading from '../components/styling/Heading';
import { styles } from '../styles/styles';

const BrowseScreen = (props) => {
   let verbs;
   if (props.language === 1) {
      verbs = props.verbsSwedish;
   } else {
      verbs = props.verbsGerman;
   }

   const navigation = useNavigation();

   useEffect(() => {
      return () => {};
   }, []);

   return (
      <>
         <HeaderComponent
            title="Selaa ja opettele"
            goBack={navigation.goBack}
         />
         <ScrollView style={styles(props).browseContainer}>
            <Heading>Taso 1</Heading>
            {verbs
               .filter((verb) => verb.level === 1)
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
