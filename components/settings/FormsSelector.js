import React from 'react';
import {
   Box, HStack, Stack, Text, Switch
} from 'native-base';

import { styles } from '../../styles/styles';

import Subheading from '../styling/Subheading';

const FormsSelector = (props) => {
   return (
      <Box>
         <HStack style={styles(props).settingsListStyle}>
            <Subheading>Harjoiteltavat muodot</Subheading>
         </HStack>
         <HStack style={styles(props).settingsListStyle}>
            <Stack>
               <HStack>
               <Text>Perusmuoto</Text>
               </HStack>
               <HStack>
                  <Switch
                     value={props.infinitive}
                     onValueChange={(value) => props.setInfinitive(value)}
                  />
               </HStack>
            </Stack>
            <Stack>
               <HStack>
                  <Text>Preesens</Text>
               </HStack>
               <HStack>
                  <Switch
                     value={props.present}
                     onValueChange={(value) => props.setPresent(value)}
                  />
               </HStack>
            </Stack>
            <Stack>
               <HStack>
                  <Text>Imperfekti</Text>
               </HStack>
               <HStack>
                  <Switch
                     value={props.past}
                     onValueChange={(value) => props.setPast(value)}
                  />
               </HStack>
            </Stack>
            <Stack>
               <HStack>
                  <Text>
                     {props.language === 1 ? 'Supiini (4. muoto)' : 'Perfekti'}
                  </Text>
               </HStack>
               <HStack>
                  <Switch
                     value={props.presPerf}
                     onValueChange={(value) => props.setPresPerf(value)}
                  />
               </HStack>
            </Stack>
         </HStack>
      </Box>
   );
};

export default FormsSelector;
