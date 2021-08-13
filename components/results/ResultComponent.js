import React from 'react';
import ResultHistoryView from './ResultHistoryView';

import { connect } from 'react-redux';

const ResultHistoryComponent = (props) => {
   return (
      <ResultHistoryView
         hideButton
         resultHistory={props.resultData.filter(
            (historyItem) =>
               historyItem.level === props.historyLevel &&
               historyItem.language === props.language
         )}
      />
   );
};

const mapStateToProps = (state) => ({
   language: state.settings.language,
});

export default connect(mapStateToProps)(ResultHistoryComponent);
