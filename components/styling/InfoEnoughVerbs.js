import React from 'react';

import { Text } from 'native-base';

import InfoContent from './InfoContent';

const InfoEnoughVerbs = (props) => {
    return (
        <InfoContent centered={props.centered}>
        <Text>
        Sinulla pitää olla vähintään {props.count} omaa verbiä valittuna tähän tehtävätyyppiin. Voit lisätä omia verbejä
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
