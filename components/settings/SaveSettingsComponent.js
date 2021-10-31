import React from 'react';
import { Box } from 'native-base';

import ButtonComponent from '../buttons/ButtonComponent';

import { styles } from '../../styles/styles';

const SaveSettingsComponent = (props) => {
   return (
         <Box style={styles(props).settingsBodyStyle}>
            <ButtonComponent
               title="Tallenna asetukset"
               color="#7E00C5"
               function={props.saveSettings}
            />
         </Box>
   );
};

export default SaveSettingsComponent;
