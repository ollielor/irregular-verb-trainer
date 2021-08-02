import React from 'react';
import { StyleSheet } from 'react-native';
import { Body, Card, CardItem, Content, Text } from 'native-base';
import ButtonInstructions from '../buttons/ButtonInstructions';

const CardComponentInstructions = (props) => {

   return (
      <Content>
         <Card>
            <CardItem style={styles.cardItemStyle}>
               <Body>
                  <Text style={styles.headerStyle}>
                     {props.header}
                  </Text>
                  <Text style={styles.plainText}>
                     {props.text}
                  </Text>
                  {props.buttons && props.buttons.map((button, index) => 
                     <ButtonInstructions
                        key={index}
                        title={button.buttonText}
                        buttonAction={button.buttonAction}
                     />
                  )}
               </Body>
            </CardItem>
         </Card>
      </Content>
   );
};

export default CardComponentInstructions;

const styles = StyleSheet.create({
   cardItemStyle: {
      backgroundColor: '#e8e8e8'
   },
   headerStyle: {
      color: '#7E00C5', 
      fontWeight: 'bold',
      marginBottom: 15
   },
   plainText: {
      marginBottom: 15
   }
})
