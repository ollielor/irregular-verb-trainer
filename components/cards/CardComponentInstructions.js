import React from 'react';
import { VStack, Text } from 'native-base';
import ButtonInstructions from '../buttons/ButtonInstructions';

import { styles } from '../../styles/styles';

const CardComponentInstructions = (props) => {
   return (
            <VStack style={styles(props).cardComponentGrey}>
                  <Text style={styles(props).instructionsHeaderStyle}>
                     {props.header}
                  </Text>
                  <Text style={styles(props).instructionsPlainText}>
                     {props.text}
                  </Text>
                  {props.buttons &&
                     props.buttons.map((button, index) => (
                        <ButtonInstructions
                           key={index}
                           title={button.buttonText}
                           buttonAction={button.buttonAction}
                        />
                     ))}
            </VStack>
   );
};

export default CardComponentInstructions;
