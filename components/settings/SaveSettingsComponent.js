import React from 'react';

import { HStack, Stack, Text } from 'native-base';

import ButtonComponent from '../buttons/ButtonComponent';

const SaveSettingsComponent = (props) => {
   return (
      <Stack direction='column' alignItems='center'>
         <HStack>
            <ButtonComponent
               title="Tallenna asetukset"
               color="#7E00C5"
               disabled={!props.settingsChanged || (!props.infinitive && !props.present && !props.past && !props.presPerf)}
               function={props.saveSettings}
            />
         </HStack>
         {!props.infinitive && !props.present && !props.past && !props.presPerf && (
            <HStack mt='3'>
               <Text>Valitse vähintään yksi harjoiteltava muoto!</Text>
            </HStack>
         )}
      </Stack>
   );
};

export default SaveSettingsComponent;
