import React from 'react';
import { Button, Text } from 'native-base';

import { styles } from '../../styles/styles';
import { useLinkProps } from '@react-navigation/native';

const ButtonComponentNarrow = (props) => {
   return (
      <Button
         style={
            props.disabled
               ? styles(props).buttonNarrowDisabledStyle
               : styles(useLinkProps).buttonNarrowEnabledStyle
         }
         onPress={props.function}
         disabled={props.disabled}
      >
         <Text uppercase={false} style={{ color: '#D2D2D2' }}>
            {props.title}
         </Text>
      </Button>
   );
};

export default ButtonComponentNarrow;
