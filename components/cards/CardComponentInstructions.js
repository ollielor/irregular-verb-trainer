import React from 'react';
import { Body, Card, CardItem, Content, Text } from 'native-base';

const CardComponentInstructions = (props) => {

   return (
      <Content>
         <Card>
            <CardItem style={{ backgroundColor: '#e8e8e8' }}>
               <Body>
                  <Text style={{ color: '#7E00C5', fontWeight: 'bold' }}>
                     {props.header}
                  </Text>
                  <Text>{props.text}</Text>
               </Body>
            </CardItem>
         </Card>
      </Content>
   );
};

export default CardComponentInstructions;
