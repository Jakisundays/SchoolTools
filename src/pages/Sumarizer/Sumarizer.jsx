import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TextBox from "../../Components/TextBox/TextBox";
import {
  getSumText,
  sumCount,
  sumIsOpen,
  sumText,
} from "../../Redux/EasyCopy/copiarSlice";
import "/Users/jacobdominguez/Documents/codiyapa/copiador/src/pages/Sumarizer/Sumarizer.css";

const Sumarizer = () => {
  const outPut = useSelector(sumText);
  const wordTotal = useSelector(sumCount);
  const dispatch = useDispatch();

  const sumObj = {
    title: "Text Summarizer",
    button: "Summarize",
    output: outPut,
    wordCount: wordTotal,
    funcion: (text) => {
      dispatch(getSumText(text));
    },
  };

  return (
    <>
      <div
        className="space-container"
        onClick={() => dispatch(sumIsOpen())}
      ></div>
      <TextBox {...sumObj} />
    </>
  );
};

export default Sumarizer;
