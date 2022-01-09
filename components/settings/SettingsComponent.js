import React from 'react';
import { Box, HStack } from 'native-base';

import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';
import Subheading from '../styling/Subheading';

import { styles } from '../../styles/styles';

const SettingsComponent = (props) => {

   const changeLanguage = (languageCode) => {
      props.setLanguage(languageCode);
      props.setSettingsChanged(true);
   }

   const changeLevel = (levelCode) => {
      props.setLevel(levelCode);
      props.setSettingsChanged(true);
   }

   return (
      <Box>
         <HStack style={styles(props).settingsBodyStyle}>
            <Subheading>Kielen valinta</Subheading>
         </HStack>
         <HStack style={styles(props).settingsBodyStyle}>
            <ButtonComponentNarrow
               title="Ruotsi"
               function={() => changeLanguage(1)}
               disabled={props.language === 1}
               withMargin
            />
            <ButtonComponentNarrow
               title="Saksa"
               function={() => changeLanguage(2)}
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
               function={() => changeLevel(1)}
               disabled={props.level === 1}
               withMargin
            />
            <ButtonComponentNarrow
               title="Taso 2"
               function={() => changeLevel(2)}
               disabled={props.level === 2}
               withMargin
            />
            <ButtonComponentNarrow
               title="Taso 3"
               function={() => changeLevel(3)}
               disabled={props.level === 3}
               withMargin
            />
            <ButtonComponentNarrow
               title="Omat verbit"
               function={() => changeLevel(4)}
               disabled={props.level === 4}
               withMargin
            />
         </HStack>
      </Box>
   );
};

export default SettingsComponent;
