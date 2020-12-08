import React from 'react'
import { StyleSheet } from 'react-native';
import { Body, Card, CardItem, Content, Left, List, ListItem, Right, Switch, Text } from 'native-base';

import ButtonComponent from '../components/ButtonComponent';
import ButtonComponentNarrow from '../components/ButtonComponentNarrow'
import Heading from '../components/Heading'
import Subheading from './Subheading';

import { connect } from 'react-redux';

import { updateLanguage, updateLevel } from '../store/actions/settings';

const FormsSelector = (props) => {

   return (
      <Content>
         <Body style={{flexDirection: 'row', justifyContent: "center"}}>
            <Subheading>
               Harjoiteltavat muodot
            </Subheading>
         </Body>
            <List style={{marginBottom: 30}}>
            <ListItem>
               <Body>
               <Text>
                  Perusmuoto
               </Text>
               </Body>
               <Right>
                  <Switch value={false} />
               </Right>
            </ListItem>
            <ListItem>
               <Body>
               <Text>
                  Preesens
               </Text>
               </Body>
               <Right>
                  <Switch value={false} />
               </Right>
            </ListItem>
            <ListItem>
               <Body>
               <Text>
                  Imperfekti
               </Text>
               </Body>
               <Right>
                  <Switch value={false} />
               </Right>
            </ListItem>
            <ListItem>
               <Body>
               <Text>
                  {props.language === 1 ? 'Supiini (4. muoto)' : 'Perfekti'}
               </Text>
               </Body>
               <Right>
                  <Switch value={false} />
               </Right>
            </ListItem>
            </List>
      </Content>
   )
}

const mapStateToProps = state => ({
   language: state.settings.language,
   level: state.settings.level
 })
 
 
 export default connect(
   mapStateToProps,
 )(FormsSelector);

const styles = StyleSheet.create({
   cardStyle: {
      borderColor: '#7E00C5',
   },
   cardItemStyle: {
      backgroundColor: '#ebebeb'
   }
})