import React from 'react';
import { Switch } from 'native-base';

const SwitchBrowse = (props) => {

    
    const toggleAction = (value) => {
        if (value) {
            props.addToOwnVerbs(props.verbId);
        } else {
            props.removeFromOwnVerbs(props.verbId);
        }
    }

   return (
    <Switch
    onTrackColor='#4E00C5'
    offTrackColor='#b9b9b9'
    onThumbColor='#ffffff'
    isChecked={props.added}
    onToggle={(value) => toggleAction(value)}
    />    
   )
};

export default SwitchBrowse;
