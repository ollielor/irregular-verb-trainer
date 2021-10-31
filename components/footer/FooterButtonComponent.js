import React from 'react';
import { Button, Text } from 'native-base';
import { styles } from '../../styles/styles';

const ButtonComponent = (props) => {
   return (
         <Button style={styles(props).footerButton} onPress={props.function}>
            <Text uppercase={false} style={styles(props).buttonTextStyle}>
               {props.title}
            </Text>
         </Button>
   );
};

export default ButtonComponent;
