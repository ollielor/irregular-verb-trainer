import React from 'react';
import { Text } from 'native-base';

const HeadingVerbList = props => {

   return (
      <Text {...props} style={{color: '#7E00C5', fontSize: 20, fontWeight: 'bold', textAlign: 'center', paddingTop: 5, paddingBottom: 5}} />
   );
}

export default HeadingVerbList;