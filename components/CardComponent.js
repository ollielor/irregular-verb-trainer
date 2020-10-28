import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { 
   Card,
   CardItem,
   Text,
} from 'native-base';

const CardComponent = props => {

    return (
      <Card>
         <CardItem header>
            <Text>{props.infinitive}</Text>
         </CardItem>
      </Card>
    );
}

export default CardComponent;
