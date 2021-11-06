import React from 'react';
import { Box, Stack, ScrollView } from 'native-base';
import CardComponentInstructions from '../components/cards/CardComponentInstructions';
import HeaderComponent from '../components/header/HeaderComponent';
import FooterComponent from '../components/footer/FooterComponent';

import instructionTexts from '../instructions/instructions.json';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import { styles } from '../styles/styles';

const InstructionsScreen = (props) => {

   const navigation = useNavigation();

   return (
      <Box style={styles(props).container} pb='20'>
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
      </Box>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
});

export default connect(mapStateToProps)(InstructionsScreen);
