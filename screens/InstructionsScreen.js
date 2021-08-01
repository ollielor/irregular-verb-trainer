import React, { useState } from 'react';
import { StyleSheet, } from 'react-native';
import { Container, Content, Text } from 'native-base';
import CardComponentInstructions from '../components/cards/CardComponentInstructions';
import HeaderComponent from '../components/header/HeaderComponent';
import FooterComponent from '../components/footer/FooterComponent';

import instructionTexts from '../instructions/instructions.json';

import { connect } from 'react-redux';

import { useNavigation } from '@react-navigation/native';


const InstructionsScreen = (props) => {

   const navigation = useNavigation();

   return (
      <Container style={styles.container}>
      <HeaderComponent title="Ohjeet" goBack={navigation.goBack} />
      <Content>
        {instructionTexts[props.language].map((instruction, index) =>
            <CardComponentInstructions 
               header={instruction.header}
               text={instruction.text}
            />
        )}
      </Content>
      <FooterComponent />
      </Container>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
});

export default connect(mapStateToProps)(InstructionsScreen);

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#d2d2d2',
   },
   contentContainer: {
      padding: 10,
   },
   label: {
      marginTop: 15,
   },
   formInput: {
      fontSize: 16,
      padding: 10,
      borderColor: '#7E00C5',
      borderWidth: 1,
      width: '100%',
      marginTop: 10,
      marginBottom: 10
   },
   flexOne: {
      flex: 1,
   },
});
