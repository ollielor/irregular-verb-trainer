import React from 'react';
import { Button, Text } from 'native-base';

import { styles } from '../../styles/styles';

const ButtonComponentNarrowWhite = (props) => {
   return (
      <Button
         style={styles(props).buttonStyle}
         onPress={props.function}
         bordered
         borderColor={props.disabled ? '#eee' : props.borderColor}
         disabled={props.disabled}
      >
         <Text uppercase={false} style={styles(props).textStyle}>
            {props.title}
         </Text>
      </Button>
   );
};

export default ButtonComponentNarrowWhite;
