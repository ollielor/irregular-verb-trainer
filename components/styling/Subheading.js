import React from 'react';
import { Text } from 'native-base';

const Subheading = (props) => {
   return (
      <Text
         {...props}
         style={{
            color: '#4E00C5',
            fontWeight: 'bold',
            marginTop: 15,
            marginBottom: 10,
         }}
      />
   );
};

export default Subheading;
