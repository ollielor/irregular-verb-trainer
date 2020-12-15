import React from 'react';
import { Button, Text } from 'native-base';

const ButtonComponentNarrowWhite = (props) => {
   return (
      <Button
         style={{
            backgroundColor: 'transparent',
            borderColor: '#eee',
            marginLeft: 2,
            marginRight: 2,
         }}
         onPress={props.function}
         bordered
      >
         <Text uppercase={false} style={{ color: props.color }}>
            {props.title}
         </Text>
      </Button>
   );
};

export default ButtonComponentNarrowWhite;
