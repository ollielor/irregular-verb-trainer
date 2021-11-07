import React from 'react';
import { Platform } from 'react-native';
import { Text } from 'native-base';
import { styles } from '../../styles/styles';

const CorrectAnswerComponent = (props) => {
   return (
      <Text
         style={
            Platform.OS === 'ios'
               ? styles(props).correctAnswerIOS
               : styles(props).correctAnswerAndroid
         }
      >
         {Array.isArray(props.form)
            ? props.form.map((alternative, index) =>
               index < props.form.length - 1
                  ? alternative + ' / '
                  : alternative
            )
            : props.form}
      </Text>
   );
};

export default CorrectAnswerComponent;
