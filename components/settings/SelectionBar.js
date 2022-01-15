import React from 'react';
import { Text, VStack } from 'native-base';

import { connect } from 'react-redux';
import { styles } from '../../styles/styles';

const SelectionBar = (props) => {
   return (
      <>
         <VStack>
         <Text style={styles(props).selectionBar} bg='#e8e8e8' color='#7E00C5'>
            Olet valinnut {props.language === 1 ? props.verbsSwedishOwn.length : props.verbsGermanOwn.length} omaa verbiä.
            {props.language === 1 ? props.ownVerbsSwedish.length : props.ownVerbsGerman.length}
         </Text>
         </VStack>
         <VStack>
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
