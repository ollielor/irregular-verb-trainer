import React, { useState, useEffect, Fragment } from 'react';
import { Text } from 'native-base';

import { connect } from 'react-redux';

import CardComponentBrowse from '../cards/CardComponentBrowse';

import { sortVerbs } from '../../helpers/sorters';
import SpinnerComponent from '../styling/SpinnerComponent';
import ButtonComponentNarrow from '../buttons/ButtonComponentNarrow';

const VerbListByLevel = (props) => {

    const [verbsByLevel, setVerbsByLevel] = useState([]);
    const [verbsLoaded, setVerbsLoaded] = useState(false);
    const [verbs, setVerbs] = useState([]);
 
    const levels = [1, 2, 3];
 
   useEffect(() => {
      setVerbsLoaded(false);
      let verbListByLevel = [];
      verbListByLevel = [...verbListByLevel, sortVerbs(
         props.language === 1 ? props.verbsSwedish : props.verbsGerman, 
         props.levelToShow,
         10,
         true
      )];
      setVerbsByLevel(verbListByLevel);
      setVerbsLoaded(true);
   }, []);

   useEffect(() => {
      return () => { };
   }, []);

   return (
      <>
         <Text>
            {props.levelToShow}
            {String(verbsLoaded)}
         </Text>
        {!verbsLoaded
        && (
           <SpinnerComponent text='Ladataan verbejä...' />
        )
         }
      {verbsLoaded && verbsByLevel.map((verbLevelGroup) =>
            verbLevelGroup.map((verb, idx) => (
                <CardComponentBrowse verb={verb} key={idx} level={verb.level} />
         )))}
      </>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   language: state.settings.language,
});

export default connect(mapStateToProps)(VerbListByLevel);
