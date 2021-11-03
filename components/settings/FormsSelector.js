import React from 'react';
import {
   Box, HStack, Stack, VStack, Text, Switch, ScrollView
} from 'native-base';

import { styles } from '../../styles/styles';

import Subheading from '../styling/Subheading';

const FormsSelector = (props) => {
   return (
      <Stack>
         <VStack style={styles(props).settingsListStyle}>
            <Subheading>Harjoiteltavat muodot</Subheading>
         </VStack>
         <Stack style={styles(props).settingsListStyle} direction='row'>
               <HStack flex={2}>
               <Text>Perusmuoto</Text>
               </HStack>
               <HStack flex={1}>
                  <Switch
                     onTrackColor='#4E00C5'
                     offTrackColor='#b9b9b9'
                     isChecked={props.infinitive}
                     onToggle={(value) => props.setInfinitive(value)}
                  />
               </HStack>
            </Stack>
            <Stack style={styles(props).settingsListStyle} direction='row'>
               <HStack flex={2}>
                  <Text>Preesens</Text>
               </HStack>
               <HStack flex={1}>
                  <Switch
                     onTrackColor='#4E00C5'
                     offTrackColor='#b9b9b9'
                     isChecked={props.present}
                     onToggle={(value) => props.setPresent(value)}
                  />
               </HStack>
            </Stack>
            <Stack style={styles(props).settingsListStyle} direction='row'>
               <HStack flex={2}>
                  <Text>Imperfekti</Text>
               </HStack>
               <HStack flex={1}>
                  <Switch
                     onTrackColor='#4E00C5'
                     offTrackColor='#b9b9b9'
                     isChecked={props.past}
                     onToggle={(value) => props.setPast(value)}
                  />
               </HStack>
            </Stack>
            <Stack style={styles(props).settingsListStyle} direction='row'>
               <HStack flex={2}>
                  <Text>
                     {props.language === 1 ? 'Supiini (4. muoto)' : 'Perfekti'}
                  </Text>
               </HStack>
               <HStack flex={1}>
                  <Switch
                     onTrackColor='#4E00C5'
                     offTrackColor='#b9b9b9'
                     isChecked={props.presPerf}
                     onToggle={(value) => props.setPresPerf(value)}
                  />
               </HStack>
            </Stack>
      </Stack>
   );
};

export default FormsSelector;
