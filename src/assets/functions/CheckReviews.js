import "../../App.css";

import { FaThumbsUp, FaRegMeh } from "react-icons/fa";
import { BsFillSkipEndFill } from "react-icons/bs";
import { GiOnTarget } from "react-icons/gi";

export default function CheckReviews(string) {
  if (string === "recommended") {
    return (
      <div className="icons-reviews-container">
        <span>{string}</span>
        <FaThumbsUp className="Thumbs-up-yellow" />
      </div>
    );
  } else if (string === "exceptional") {
    return (
      <div className="icons-reviews-container">
        <span>{string}</span>
        <GiOnTarget className="on-target-icon" />
      </div>
    );
  } else if (string === "meh") {
    return (
      <div className="icons-reviews-container">
        <span>{string}</span>
        <FaRegMeh />
      </div>
    );
  } else if (string === "skip") {
    return (
      <div className="icons-reviews-container">
        <span>{string}</span>
        <BsFillSkipEndFill />
      </div>
    );
  }
}
