import React from "react";
import PropTypes from 'prop-types';

const EndScore = props => {
  return (
    <div className="end-score">
      <h2>Try Again</h2>
      <button className="restart-btn" onClick={props.onRestart}>
        Restart
      </button>
    </div>
  );
};

EndScore.propTypes = {
  onRestart: PropTypes.func
};

export default EndScore;
