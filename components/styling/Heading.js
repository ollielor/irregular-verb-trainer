import React from 'react';
import { Text } from 'native-base';
import { styles } from '../../styles/styles';

const Heading = (props) => {
   return <Text {...props} style={styles(props).headingStyle} />;
};

export default Heading;
