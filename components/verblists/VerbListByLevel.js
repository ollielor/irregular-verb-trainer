import React, { useState, useEffect, Fragment } from 'react';

import { connect } from 'react-redux';

import CardComponentBrowse from '../cards/CardComponentBrowse';

import { sortVerbsByLevel } from '../../helpers/sorters';
import SpinnerComponent from '../styling/SpinnerComponent';

const VerbListByLevel = (props) => {

    const [verbsByLevels, setVerbsByLevels] = useState([]);
    const [verbsLoaded, setVerbsLoaded] = useState(false);
   
   const levels = [1, 2, 3];

   useEffect(() => {
      setVerbsLoaded(false);
      let verbs = levels.map((level) => [verbs, ...sortVerbsByLevel(props.verbs, level)]);
      setVerbsByLevels(verbs);
      setVerbsLoaded(true);
   }, []);

   useEffect(() => {
      return () => { };
   }, []);

   return (
      <>
        {!verbsLoaded ? (
           <SpinnerComponent text='Ladataan verbejä...' />
        )
        : verbsByLevels.map((verbLevelGroup) =>
            verbLevelGroup && verbLevelGroup.map((verb, idx) => verb && (
                <CardComponentBrowse verb={verb} verbLoaded={verbsLoaded} key={idx} level={verb.level} />
            ))
        )}
      </>
   );
};

const mapStateToProps = (state) => ({
   verbsGerman: state.verbs.verbsGerman,
   verbsSwedish: state.verbs.verbsSwedish,
   language: state.settings.language,
});

export default connect(mapStateToProps)(VerbListByLevel);
