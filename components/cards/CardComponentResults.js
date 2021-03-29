import React from 'react';
import { Body, Card, CardItem, Text } from 'native-base';

import moment from 'moment';

const CardComponentResults = (props) => {

   console.log('Props from CardComponentResults: ', props)

   return (
         <Card key={props.historyItem.id}>
            <CardItem header>
               <Body>
                  <Text
                     style={{ color: '#7E00C5', fontWeight: 'bold' }}
                  >
                     {moment(props.historyItem.datetime).format(
                        'DD.MM.YYYY HH:mm:ss'
                     )}
                  </Text>
                  {props.showTypes && props.historyItem.type === 1 &&
                     <Text>
                        Verbien merkitykset
                     </Text>                  
                  }
                  {props.showTypes && props.historyItem.type === 2 &&
                     <Text>
                        Verbien muodot
                     </Text>                  
                  }
                  <Text>
                     {props.historyItem.language === 1
                        ? 'Kieli: ruotsi'
                        : 'Kieli: saksa'
                     }
                  </Text>
                  <Text>
                     Taso: {props.historyItem.level}
                  </Text>
                  <Text>
                     Pisteet:{' '}
                     {props.historyItem.points && props.historyItem.points.toFixed(2).replace('.', ',')}{' '}
                     / {props.historyItem.maxpoints} (
                     {props.historyItem.percentage && props.historyItem.percentage
                        .toFixed(2)
                        .replace('.', ',')}{' '}
                     %)
                  </Text>
                  <Text>
                     Oikeita vastauksia: {props.historyItem.accuracy} /{' '}
                     {props.historyItem.q_total}
                  </Text>
               </Body>
            </CardItem>
         </Card>
      );
   };

export default CardComponentResults;