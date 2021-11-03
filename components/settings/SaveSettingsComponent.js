import React from 'react';

import ButtonComponent from '../buttons/ButtonComponent';

import { styles } from '../../styles/styles';

const SaveSettingsComponent = (props) => {
   return (
            <ButtonComponent
               title="Tallenna asetukset"
               color="#7E00C5"
               function={props.saveSettings}
            />
   );
};

export default SaveSettingsComponent;
