import React from 'react';
import { Button, Text } from 'native-base';

import { styles } from '../../styles/styles';

const ButtonComponent = (props) => {
   return (
      <Button
         style={[
            props.withMargin
               ? styles(props).buttonWithMargin
               : props.withMarginBottomAndTop
                  ? styles(props).buttonWithMarginBottomAndTop
                  : props.disabled
                     ? styles(props).buttonDisabledStyle
                     : styles(props).buttonDefaultStyle,
         ]}
         onPress={props.function}
         disabled={props.disabled}
         p='6'
         mb={props.mb}
      >
         <Text uppercase={false} style={styles(props).buttonTextStyle}>
            {props.title}
         </Text>
      </Button>
   );
};

export default ButtonComponent;
