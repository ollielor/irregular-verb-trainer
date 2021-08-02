import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

import { useNavigation } from '@react-navigation/core';

const ButtonComponent = (props) => {

   const navigation = useNavigation();
  
   return (
      <Button
         full
         style={[styles.defaultStyle, {backgroundColor: "#7E00C5"}, props.withMargin ? styles.withMargin : props.withMarginBottomAndTop ? styles.withMarginBottomAndTop : styles.defaultStyle]}
         //style={props.withMargin ? styles.withMargin : props.withMarginBottomAndTop ? styles.withMarginBottomAndTop : styles.defaultStyle}
         onPress={() => navigation.navigate(props.buttonAction)}
      >
         <Text uppercase={false} style={{ color: '#D2D2D2' }}>
            {props.title}
         </Text>
      </Button>
   );
};

export default ButtonComponent;

const styles = StyleSheet.create({
   defaultStyle: {
      margin: 3
   },
   withMargin: {
      marginBottom: Platform.OS === 'android' ? 25 : 7
   },
   withMarginBottomAndTop: {
      marginBottom: 20,
      marginTop: 20
   }
})
