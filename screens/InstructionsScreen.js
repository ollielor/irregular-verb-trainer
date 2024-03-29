import React from 'react';
import { Stack, ScrollView } from 'native-base';
import CardComponentInstructions from '../components/cards/CardComponentInstructions';
import HeaderComponent from '../components/header/HeaderComponent';
import FooterComponent from '../components/footer/FooterComponent';

import instructionTexts from '../instructions/instructions.json';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

const InstructionsScreen = (props) => {

   const navigation = useNavigation();

   return (
      <>
         <HeaderComponent title="Ohjeet" goBack={navigation.goBack} />
         <ScrollView>
            <Stack>
               {instructionTexts[props.language].map((instruction, index) => (
                  <CardComponentInstructions
                     key={index}
                     header={instruction.header}
                     text={instruction.text}
                     buttons={instruction.buttons && instruction.buttons}
                  />
               ))}
            </Stack>
         </ScrollView>
         <FooterComponent />
      </>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
});

export default connect(mapStateToProps)(InstructionsScreen);
