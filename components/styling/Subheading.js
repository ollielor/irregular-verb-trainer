import React from 'react';
import { Text } from 'native-base';
import { styles } from '../../styles/styles';

const Subheading = (props) => {
   return <Text {...props} style={styles(props).subheadingStyle} />;
};

export default Subheading;
