import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Card, CardItem, Content, Text } from 'native-base';
import ButtonInstructions from '../buttons/ButtonInstructions';

import { styles } from '../../styles/styles';

const CardComponentInstructions = (props) => {
   return (
      <Content>
         <Card>
            <CardItem style={styles(props).cardComponentGrey}>
               <Body>
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
               </Body>
            </CardItem>
         </Card>
      </Content>
   );
};

export default CardComponentInstructions;
