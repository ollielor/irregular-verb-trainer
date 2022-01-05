import React from 'react';
import { Button, Text } from 'native-base';

import { styles } from '../../styles/styles';

const ButtonBordered = (props) => {
   return (
      <Button
         bg={props.bg}
         onPress={props.function}
      >
         <Text uppercase={false} style={{color: props.textColor}}>
            {props.title}
         </Text>
      </Button>
   );
};

export default ButtonBordered;