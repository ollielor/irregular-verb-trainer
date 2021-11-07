import React from 'react';
import {
   Center, HStack, Stack, VStack, Text, Switch
} from 'native-base';

import { styles } from '../../styles/styles';

import Subheading from '../styling/Subheading';

const FormsSelector = (props) => {

   const changeForm = (verbForm, value) => {
      props.setSettingsChanged(true);
      switch (verbForm) {
         case 'infinitive':
            props.setInfinitive(value);
            props.setInfinitiveChanged(true);
            break;
         case 'present':
            props.setPresent(value);
            props.setPresentChanged(true);
            break;
         case 'past':
            props.setPast(value);
            props.setPastChanged(true);
            break;
         case 'presperf':
            props.setPresPerf(value);
            props.setPresPerfChanged(true);
            break;
      }
   }

   return (
      <Stack>
         <VStack style={styles(props).settingsListStyle}>
            <Subheading>Harjoiteltavat muodot</Subheading>
         </VStack>
         <Stack style={styles(props).settingsListStyle} direction='row'>
            <HStack flex={2}>
               <Center height={50}>
                  <Text>Perusmuoto</Text>
               </Center>
            </HStack>
            <HStack flex={1}>
               <Center height={50}>
                  <Switch
                     onTrackColor='#4E00C5'
                     offTrackColor='#b9b9b9'
                     onThumbColor='#ffffff'
                     isChecked={props.infinitive}
                     onToggle={(value) => changeForm('infinitive', value)}
                  />
               </Center>
            </HStack>
         </Stack>
         <Stack style={styles(props).settingsListStyle} direction='row'>
            <HStack flex={2}>
               <Center height={50}>
                  <Text>Preesens</Text>
               </Center>
            </HStack>
            <HStack flex={1}>
               <Center height={50}>
                  <Switch
                     onTrackColor='#4E00C5'
                     offTrackColor='#b9b9b9'
                     onThumbColor='#ffffff'
                     isChecked={props.present}
                     onToggle={(value) => changeForm('present', value)}
                  />
               </Center>
            </HStack>
         </Stack>
         <Stack style={styles(props).settingsListStyle} direction='row'>
            <HStack flex={2}>
               <Center height={50}>
                  <Text>Imperfekti</Text>
               </Center>
            </HStack>
            <HStack flex={1} direction='column'>
               <Center>
                  <Switch
                     onTrackColor='#4E00C5'
                     offTrackColor='#b9b9b9'
                     onThumbColor='#ffffff'
                     isChecked={props.past}
                     onToggle={(value) => changeForm('past', value)}
                  />
               </Center>
            </HStack>
         </Stack>
         <Stack style={styles(props).settingsListStyle} direction='row'>
            <HStack flex={2}>
               <Center height={50}>
                  <Text>
                     {props.language === 1 ? 'Supiini (4. muoto)' : 'Perfekti'}
                  </Text>
               </Center>
            </HStack>
            <HStack flex={1}>
               <Switch
                  onTrackColor='#4E00C5'
                  offTrackColor='#b9b9b9'
                  onThumbColor='#ffffff'
                  isChecked={props.presPerf}
                  onToggle={(value) => changeForm('presperf', value)}
               />
            </HStack>
         </Stack>
      </Stack>
   );
};

export default FormsSelector;
