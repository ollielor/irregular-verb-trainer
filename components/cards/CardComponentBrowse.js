import React, { useState, useEffect } from 'react';
import { Body, Card, CardItem, Content, Text } from 'native-base';

const CardComponentBrowse = (props) => {

   const [infAndPresLength, setInfAndPresLength] = useState(0);

   useEffect(() => {
      setInfAndPresLength(props.verb.infinitive.length + props.verb.present.length + props.verb.present_alt.length);
   }, [])

   return (
      <Content>
         <Card>
            <CardItem style={{ backgroundColor: '#e8e8e8' }}>
               <Body>
                  <Text style={{ color: '#7E00C5', fontWeight: 'bold' }}>
                     {props.verb.infinitive},&nbsp;
                     {props.verb.present},&nbsp;
                     {infAndPresLength > 15 && `\n`}
                     {props.verb.present_alt && ` / ${props.verb.present_alt}`}
                     {props.verb.past_alt && props.verb.past_alt.length > 7 && "\n"}
                     {!props.verb.past_alt && `${props.verb.past}, `}
                     {props.verb.past_alt.length > 1 && `${props.verb.past} / ${props.verb.past_alt}`}
                     {props.verb.presperf}
                     {props.verb.presperf_alt &&
                        ` / ${props.verb.presperf_alt}`}
                  </Text>
                  <Text>{props.verb.meaning}</Text>
               </Body>
            </CardItem>
         </Card>
      </Content>
   );
};

export default CardComponentBrowse;
