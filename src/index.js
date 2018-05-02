import React from "react";
import { render } from "react-dom";
import styles from "./style.css";
import GuessBoard from "./GuessBoard";

render(
  <GuessBoard words={["alphabets", "adidas", "mercedes", "kids"]} />,
  document.getElementById("root")
);
