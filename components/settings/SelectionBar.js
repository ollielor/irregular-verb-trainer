import React, { useEffect, useState } from 'react';
import { HStack, Text, VStack } from 'native-base';

import { connect } from 'react-redux';
import { styles } from '../../styles/styles';
import SpinnerComponent from '../styling/SpinnerComponent';
import ButtonBordered from '../buttons/ButtonBordered';

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
         <HStack direction='row' alignSelf='center'>
            <ButtonBordered bg='#eee' textColor='#000' function={props.selectAll} title='Valitse kaikki' />
            <ButtonBordered bg='#eee' textColor='#000' function={props.deselectAll} title='Poista kaikki valinnat' />
         </HStack>
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
