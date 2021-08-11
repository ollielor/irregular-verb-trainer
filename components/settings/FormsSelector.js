import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
   Body,
   Card,
   CardItem,
   Content,
   Left,
   List,
   ListItem,
   Right,
   Switch,
   Text,
} from 'native-base';

import ButtonComponent from '../buttons/ButtonComponent';
import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';
import Heading from '../styling/Heading';
import Subheading from '../styling/Subheading';

const FormsSelector = (props) => {
   const [infinitive, setInfinitive] = useState(false);
   const [present, setPresent] = useState(false);
   const [past, setPast] = useState(false);
   const [presperf, setPresperf] = useState(false);

   return (
      <Content>
         <Body style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Subheading>Harjoiteltavat muodot</Subheading>
         </Body>
         <List style={{ marginBottom: 30 }}>
            <ListItem>
               <Body>
                  <Text>Perusmuoto</Text>
               </Body>
               <Right>
                  <Switch
                     value={props.infinitive}
                     onValueChange={(value) =>
                        props.setInfinitive(value)
                     }
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
                     onValueChange={(value) =>
                        props.setPresent(value)
                     }
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
                     onValueChange={(value) =>
                        props.setPast(value)
                     }
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
                     onValueChange={(value) =>
                        props.setPresPerf(value)
                     }
                  />
               </Right>
            </ListItem>
         </List>
      </Content>
   );
};

export default FormsSelector;

const styles = StyleSheet.create({
   cardStyle: {
      borderColor: '#7E00C5',
   },
   cardItemStyle: {
      backgroundColor: '#ebebeb',
   },
});
