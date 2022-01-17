import React, { useEffect, useState } from 'react';
import { Text, VStack } from 'native-base';

import { connect } from 'react-redux';
import { styles } from '../../styles/styles';
import SpinnerComponent from '../styling/SpinnerComponent';

const SelectionBar = (props) => {

   const textGenerator = () => {
      if (props.language === 1 && props.verbsSwedishOwn.length > 1) {
         return `Olet valinnut ${props.verbsSwedishOwn.length} omaa verbiä.`
      } else if (props.language === 1 && props.verbsSwedishOwn.length === 1) {
         return `Olet valinnut yhden oman verbin.`
      } else if (props.language === 1 && props.verbsSwedishOwn.length === 0) {
         return `Et ole valinnut yhtään omaa verbiä.`
      }
      if (props.language === 2 && props.verbsGermanOwn.length > 1) {
         return `Olet valinnut ${props.verbsGermanOwn.length} omaa verbiä.`
      } else if (props.language === 2 && props.verbsGermanOwn.length === 1) {
         return `Olet valinnut yhden oman verbin.`
      } else if (props.language === 2 && props.verbsGermanOwn.length === 0) {
         return `Et ole valinnut yhtään omaa verbiä.`
      }
   };

   return (
      <>
         <VStack>
         {props.language === 1 && props.verbsSwedishOwn || props.language === 2 && props.verbsGermanOwn &&
         <Text style={styles(props).selectionBar} bg='#e8e8e8' color='#7E00C5'>
            {`${textGenerator()}`}
         </Text>
         }
         <Text onPress={props.selectAll}>
            Valitse kaikki verbit
         </Text>
         <Text onPress={props.deselectAll}>
            Poista kaikki valinnat
         </Text>
         </VStack>
   </>
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
   verbsSwedishOwn: state.verbs.verbsSwedishOwn,
   verbsGermanOwn: state.verbs.verbsGermanOwn
});

export default connect(mapStateToProps)(SelectionBar);
