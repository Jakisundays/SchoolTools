import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "/Users/jacobdominguez/Documents/codiyapa/copiador/src/Components/TextBox/TextBox.css";
import { MdContentCopy } from "react-icons/md";
import { Loading, sumCount } from "../../Redux/EasyCopy/copiarSlice";
import Loader from "../../Components/Loader/Loader";

const TextBox = (props) => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 1200);
  }, [copied]);

  const copyText = (str) => {
    setCopied(true);
    navigator.clipboard.writeText(str);
  };

  const dispatch = useDispatch();
  const wordCount = useSelector(sumCount);
  const loading = useSelector(Loading);

  return (
    <div className="text-box">
      <h1 className="textBh1"> {props.title} </h1>

      <div className="text-flex">
        <div className="caja">
          <textarea value={text} onChange={(e) => setText(e.target.value)}>
            {" "}
            {text}{" "}
          </textarea>
          <div className="left-text-box">
            <h2>
              {" "}
              {text.split(" ").filter((word) => word !== "").length} words{" "}
            </h2>
            <button className="button" onClick={() => props.funcion(text)}>
              {" "}
              {props.button}{" "}
            </button>
          </div>
        </div>

        <div className="caja">
          {loading ? (
            <div className="loadingText"> {<Loader />} </div>
          ) : (
            <p> {props.output} </p>
          )}

          <div className="right-text-box">
            <h2> {props.wordCount} words </h2>
            <button className="tooltip">
              <MdContentCopy />

              <span onClick={() => copyText(props.output)}>
                {" "}
                {copied ? "copied" : "copy"}{" "}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextBox;
