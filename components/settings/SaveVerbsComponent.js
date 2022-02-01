import React from 'react';

import { HStack, Stack, Text } from 'native-base';

import ButtonComponent from '../buttons/ButtonComponent';

const SaveVerbsComponent = (props) => {
   return (
      <Stack direction='column' alignItems='center'>
         <HStack>
            <ButtonComponent
               title="Tallenna omat verbit"
               color="#7E00C5"
               disabled={!props.settingsChanged}
               function={props.saveVerbs}
               p={props.p}
            />
         </HStack>
      </Stack>
   );
};

export default SaveVerbsComponent;
