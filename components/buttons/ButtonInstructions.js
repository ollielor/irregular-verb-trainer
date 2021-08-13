import React from 'react';
import { Button, Text } from 'native-base';

import { useNavigation } from '@react-navigation/core';

import { styles } from '../../styles/styles';

const ButtonInstructions = (props) => {
   const navigation = useNavigation();

   return (
      <Button
         full
         style={styles(props).buttonInstructionsStyle}
         onPress={() => navigation.navigate(props.buttonAction)}
      >
         <Text uppercase={false} style={styles(props).buttonTextStyle}>
            {props.title}
         </Text>
      </Button>
   );
};

export default ButtonInstructions;
