import React, { Component } from "react";
import PropTypes from "prop-types";
import EndScore from "./endscore";
import "animate.css";

class GuessBoard extends Component {
  state = {
    currentWordIndex: 0,
    words: this.props.words,
    lettersMatched: false,
    inputValue: "",
    errorsCount: 0,
    isDone: false
  };

  handleChange = (e) => {
    const { words, currentWordIndex, inputValue, errorsCount } = this.state;
    const input = e.target.value;
    const currentWord = words[currentWordIndex];

    // match last letter from current work and input work
    if (currentWord[input.length - 1] === input[input.length - 1]) {
      this.setState({
        letterMatched: true,
        inputValue: e.target.value
      });

      // if input value equals current value go to next word
      if (currentWord === input) {
        this.setState((prev) => {
          return {
            currentWordIndex: prev.currentWordIndex + 1,
            inputValue: ""
          };
        });

        // check if current word is last of words
        if (currentWordIndex === words.length - 1) {
          this.setState({
            currentWordIndex: 0,
            isDone: true
          });
        }
      }
    } else {
      // if last letters not matched modify lettermatched to false
      if (errorsCount === 10) {
        this.gameOver();
      } else {
        this.setState((prev) => {
          return {
            letterMatched: false,
            inputValue: prev.inputValue,
            errorsCount: prev.errorsCount + 1
          };
        });
      }
    }
  }; //handlechange ended

  restart = () => {
    this.setState({
      currentWordIndex: 0,
      words: this.props.words,
      lettersMatched: false,
      inputValue: "",
      isDone: false,
      errorsCount: 0
    });
  };

  gameOver = () => {
    this.setState({
      isDone: true,
      currentWordIndex: 0
    });
  };

  render() {
    const {
      currentWordIndex,
      inputValue,
      words,
      letterMatched,
      isDone,
      errorsCount
    } = this.state;
    const errorBarStyles = { width: `${(errorsCount / 10) * 100}%` };
    const na = [...words[currentWordIndex]];
    const modifiedValue = na.map((letter, index) => {
      return letter === inputValue[index] ? (
        <span className="highlighted">{letter}</span>
      ) : (
        letter
      );
    });
    return (
      <div className="wrapper">
        <div className="error-bar" style={errorBarStyles} />
        <h1>Typing for Kids!</h1>
        <div className="wrapper-input">
          <h2 className="current-word">{modifiedValue}</h2>
          <input
            type="text"
            placeholder="type here"
            onChange={this.handleChange}
            value={inputValue}
            className={`animated ${!letterMatched ? "shake" : ""}`}
          />
        </div>
        <div className="lettersBar">
          <span />
        </div>
        {isDone || errorsCount >= 10 ? (
          <EndScore onRestart={this.restart} />
        ) : (
          ""
        )}
      </div>
    );
  }
}

GuessBoard.proptypes = {
  words: PropTypes.arrayOf(PropTypes.string)
};

GuessBoard.defaultProps = {
  words: ["M.Subhan", "Ahmed"]
};

export default GuessBoard;
