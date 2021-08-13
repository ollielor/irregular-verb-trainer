import React from 'react';
import { Button, Text } from 'native-base';

import { styles } from '../../styles/styles';
import { useLinkProps } from '@react-navigation/native';

const ButtonComponentNarrow = (props) => {
   return (
      <Button
         style={[props.withMargin && { margin: 2 },
            props.disabled
               ? styles(props).buttonNarrowDisabledStyle
               : styles(useLinkProps).buttonNarrowEnabledStyle
         ]}
         onPress={props.function}
         disabled={props.disabled}
      >
         <Text uppercase={false} style={styles(props).buttonText}>
            {props.title}
         </Text>
      </Button>
   );
};

export default ButtonComponentNarrow;
