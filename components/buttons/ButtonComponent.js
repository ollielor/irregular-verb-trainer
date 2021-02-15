import React from 'react';
import { Platform } from 'react-native';
import { Button, Text } from 'native-base';

const ButtonComponent = (props) => {
   return (
      <Button
         full
         style={{ backgroundColor: props.color, marginBottom: props.withMargin && Platform.OS === 'android' ? 25 : 7 }}
         onPress={props.function}
      >
         <Text uppercase={false} style={{ color: '#D2D2D2' }}>
            {props.title}
         </Text>
      </Button>
   );
};

export default ButtonComponent;
