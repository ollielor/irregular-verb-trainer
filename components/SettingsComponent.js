import React from 'react'
import { StyleSheet } from 'react-native';
import { Body, Card, CardItem, Content } from 'native-base';

import ButtonComponentNarrow from '../components/ButtonComponentNarrow'
import Heading from '../components/Heading'
import Subheading from './Subheading';

const SettingsComponent = (props) => {
   return (
      <Content>
         <Card style={styles.cardStyle}>
      <CardItem style={styles.cardItemStyle}>
         <Body style={{flexDirection: 'row', justifyContent: "center"}}>
            <Subheading noMargin>
               Oletuskieli
            </Subheading>
            </Body>
      </CardItem>
      <CardItem style={styles.cardItemStyle}>
         <Body style={{flexDirection: 'row', justifyContent: "center"}}>
            <ButtonComponentNarrow title='Ruotsi' function={() => props.setLanguage(1)} />
            <ButtonComponentNarrow title='Saksa' function={() => props.setLanguage(2)} />
            </Body>
      </CardItem>
      </Card>
      <Card style={styles.cardStyle}>
      <CardItem style={styles.cardItemStyle}>
         <Body style={{flexDirection: 'row', justifyContent: "center"}}>
            <Subheading noMargin>
               Oletustaso
            </Subheading>
            </Body>
      </CardItem>
      <CardItem style={styles.cardItemStyle}>
         <Body style={{flexDirection: 'row', justifyContent: "center"}}>
            <ButtonComponentNarrow title='Taso 1' function={() => props.setLevel(1)} />
            <ButtonComponentNarrow title='Taso 2' function={() => props.setLevel(2)} />
            <ButtonComponentNarrow title='Taso 3' function={() => props.setLevel(3)} />
            </Body>
      </CardItem>
      </Card>
      </Content>
   )
}

export default SettingsComponent

const styles = StyleSheet.create({
   cardStyle: {
      borderColor: '#7E00C5',
   },
   cardItemStyle: {
      backgroundColor: '#ebebeb'
   }
})