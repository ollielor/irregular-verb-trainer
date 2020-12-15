import React from 'react'
import { Body, Card, CardItem, Content, Text } from 'native-base'

const CardComponentBrowse = (props) => {
   return (
      <Content>
         <Card>
            <CardItem style={{backgroundColor: '#e8e8e8'}}>
               <Body>
                  <Text style={{ color: '#7E00C5', fontWeight: 'bold' }}>
                     {props.verb.infinitive},&nbsp;
                     {props.verb.present}
                     {props.verb.present_alt && ` / ${props.verb.present_alt}`}
                     ,&nbsp;
                     {props.verb.past}
                     {props.verb.past_alt && ` / ${props.verb.past_alt}`},&nbsp;
                     {props.verb.presperf}
                     {props.verb.presperf_alt &&
                        ` / ${props.verb.presperf_alt}`}
                  </Text>
                  <Text>{props.verb.meaning}</Text>
               </Body>
            </CardItem>
         </Card>
      </Content>
   )
}

export default CardComponentBrowse
