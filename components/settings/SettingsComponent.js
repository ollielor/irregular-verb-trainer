import React from 'react';
import { Box, HStack } from 'native-base';

import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';
import Subheading from '../styling/Subheading';

import { styles } from '../../styles/styles';

const SettingsComponent = (props) => {
   return (
      <Box>
         <HStack style={styles(props).settingsBodyStyle}>
            <Subheading>Kielen valinta</Subheading>
         </HStack>
         <HStack style={styles(props).settingsBodyStyle}>
            <ButtonComponentNarrow
               title="Ruotsi"
               function={() => props.setLanguage(1)}
               disabled={props.language === 1}
               withMargin
            />
            <ButtonComponentNarrow
               title="Saksa"
               function={() => props.setLanguage(2)}
               disabled={props.language === 2}
               withMargin
            />
         </HStack>
         <HStack style={styles(props).settingsBodyStyle}>
            <Subheading>Vaikeustason valinta</Subheading>
         </HStack>
         <HStack style={styles(props).settingsBodyStyle}>
            <ButtonComponentNarrow
               title="Taso 1"
               function={() => props.setLevel(1)}
               disabled={props.level === 1}
               withMargin
            />
            <ButtonComponentNarrow
               title="Taso 2"
               function={() => props.setLevel(2)}
               disabled={props.level === 2}
               withMargin
            />
            <ButtonComponentNarrow
               title="Taso 3"
               function={() => props.setLevel(3)}
               disabled={props.level === 3}
               withMargin
            />
         </HStack>
      </Box>
   );
};

export default SettingsComponent;
