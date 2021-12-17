import React from 'react';
import { Button, Text } from 'native-base';

import { styles } from '../../styles/styles';

const ButtonComponentNarrow = (props) => {
   return (
      <Button
         style={[props.withMargin && { margin: 2 },
         props.disabled
            ? styles(props).buttonNarrowDisabledStyle
            : styles(props).buttonNarrowEnabledStyle
         ]}
         onPress={props.function}
         disabled={props.disabled}
         mt={props.mt}
      >
         <Text uppercase={false} style={styles(props).buttonTextStyle}>
            {props.title}
         </Text>
      </Button>
   );
};

export default ButtonComponentNarrow;
