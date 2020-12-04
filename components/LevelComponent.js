import React from 'react'
import { Body, Card, CardItem, Text } from 'native-base'
import ButtonComponentNarrowWhite from './ButtonComponentNarrowWhite'

const LevelComponent = (props) => {
   return (
      <Card>
         <CardItem style={{backgroundColor: '#7E00C5'}}>
            <Body style={{flexDirection: 'row', justifyContent: 'center'}}>
               <ButtonComponentNarrowWhite title='Taso 1' color='#eee' function={props.setLevel(1)} />
               <ButtonComponentNarrowWhite title='Taso 2' color='#eee' function={props.setLevel(2)} />
               <ButtonComponentNarrowWhite title='Taso 3' color='#eee' function={props.setLevel(3)} />
            </Body>
         </CardItem>
      </Card>
   )
}

export default LevelComponent
