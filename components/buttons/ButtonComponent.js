import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

const ButtonComponent = (props) => {
   return (
      <Button
         full
         style={[styles.defaultStyle, {backgroundColor: props.color}, props.withMargin ? styles.withMargin : props.withMarginBottomAndTop ? styles.withMarginBottomAndTop : styles.defaultStyle]}
         //style={props.withMargin ? styles.withMargin : props.withMarginBottomAndTop ? styles.withMarginBottomAndTop : styles.defaultStyle}
         onPress={props.function}
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
      margin: 0
   },
   withMargin: {
      marginBottom: Platform.OS === 'android' ? 25 : 7
   },
   withMarginBottomAndTop: {
      marginBottom: 20,
      marginTop: 20
   }
})
