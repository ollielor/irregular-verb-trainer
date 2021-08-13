import React from 'react';
import { StyleSheet } from 'react-native';
import {
   Body,
   Content,
   List,
   ListItem,
   Right,
   Switch,
   Text,
} from 'native-base';

import { styles } from '../../styles/styles';

import Subheading from '../styling/Subheading';

const FormsSelector = (props) => {
   return (
      <Content>
         <Body style={styles(props).settingsBodyStyle}>
            <Subheading>Harjoiteltavat muodot</Subheading>
         </Body>
         <List style={styles(props).settingsListStyle}>
            <ListItem>
               <Body>
                  <Text>Perusmuoto</Text>
               </Body>
               <Right>
                  <Switch
                     value={props.infinitive}
                     onValueChange={(value) => props.setInfinitive(value)}
                  />
               </Right>
            </ListItem>
            <ListItem>
               <Body>
                  <Text>Preesens</Text>
               </Body>
               <Right>
                  <Switch
                     value={props.present}
                     onValueChange={(value) => props.setPresent(value)}
                  />
               </Right>
            </ListItem>
            <ListItem>
               <Body>
                  <Text>Imperfekti</Text>
               </Body>
               <Right>
                  <Switch
                     value={props.past}
                     onValueChange={(value) => props.setPast(value)}
                  />
               </Right>
            </ListItem>
            <ListItem>
               <Body>
                  <Text>
                     {props.language === 1 ? 'Supiini (4. muoto)' : 'Perfekti'}
                  </Text>
               </Body>
               <Right>
                  <Switch
                     value={props.presPerf}
                     onValueChange={(value) => props.setPresPerf(value)}
                  />
               </Right>
            </ListItem>
         </List>
      </Content>
   );
};

export default FormsSelector;
