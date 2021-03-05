import React, { useEffect, useState } from 'react';
import { Body, Button, Card, CardItem, Content, Text } from 'native-base';
import { StyleSheet } from 'react-native';

import moment from 'moment';

const CardComponentCorrectAnswers = (props) => {

   console.log('notMastered: ', props.notMastered);
   console.log('mastered: ', props.mastered);

   return (
         <Card>
            <CardItem header>
               <Body>
                  <Text
                     style={{ color: '#7E00C5', fontWeight: 'bold' }}
                  >
                     Testi
                  </Text>
               </Body>
            </CardItem>
         </Card>
      );
   };

export default CardComponentCorrectAnswers;