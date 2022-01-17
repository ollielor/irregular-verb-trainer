import React from 'react';

import { Text } from 'native-base';

import InfoContent from './InfoContent';

const InfoEnoughVerbs = (props) => {
    return (
        <InfoContent centered={props.centered}>
        <Text>
        Sinulla pitää olla vähintään {props.count} omaa verbiä valittuna. Valitse {''}
        {props.language === 1 ? props.count - props.verbsSwedishOwnLength : props.count - props.verbsGermanOwnLength} lisää 
                 <Text style={{ 
                    fontWeight: 'bold', 
                    color: '#7E00C5', 
                 }} 
                    onPress={() => navigation.navigate('Selaa verbejä')}
                 >
                    {' '}Selaa verbejä{' '}
                 </Text> 
           -ruudulta.
    </Text>
    </InfoContent>
    );
};

export default InfoEnoughVerbs;
