import React from 'react';

import { Spinner, Text } from 'native-base';

const SpinnerComponent = props => {

   return (
      <>
         <Spinner color='#7E00C5' />
         <Text style={{textAlign: 'center'}}>
            {props.text}
         </Text>
      </>
   )

}

export default SpinnerComponent;
