import React from 'react';
import {
  Center, HStack, Stack, VStack, Text, Switch
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
                     onToggle={(value) => props.setInfinitive(value)}
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
                     onToggle={(value) => props.setPresent(value)}
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
                     onToggle={(value) => props.setPast(value)}
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
                     onToggle={(value) => props.setPresPerf(value)}
                  />
               </HStack>
            </Stack>
      </Stack>
   );
};

export default FormsSelector;
