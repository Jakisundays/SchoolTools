import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/Loader/Loader";
import {
  getPlag,
  Loading,
  plagio,
  plagIsOpen,
  plagSources,
} from "../../Redux/EasyCopy/copiarSlice";
import "/Users/jacobdominguez/Documents/codiyapa/copiador/src/pages/PlagiarismCheck/Plagiarism.css";

const Plagiarism = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const plagPercent = useSelector(plagio);
  const sources = useSelector(plagSources);
  const cargando = useSelector(Loading);

  useEffect(() => {
    if (sources !== undefined) {
      sources.map((src, i) => console.log(src, i));
    } else {
      console.log(sources);
    }
  }, [sources]);

  return (
    <>
      <div
        className="space-container"
        onClick={() => dispatch(plagIsOpen())}
      ></div>

      <section className="plag-container">
        <h1> Plagiarism check </h1>
        <div className="plag-flex">
          <div className="plag-box">
            <textarea
              placeholder="original text..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            <div className="plag-tools">
              <h2>
                {" "}
                {
                  text.split(" ").filter((word) => word !== "").length
                } words{" "}
              </h2>
              <button
                style={{ top: "4px" }}
                className="button"
                onClick={() => dispatch(getPlag(text))}
              >
                {" "}
                Check plagiarism{" "}
              </button>
            </div>
          </div>

          <div className="plag-details">
            {cargando ? (
              <div className="loadingPlag">
                {" "}
                <Loader />{" "}
              </div>
            ) : (
              <>
                <h1> Details </h1>
                <h2> {plagPercent} % </h2>
                <h2> sources: </h2>
                <ul className="plag-ul">
                  {sources !== undefined
                    ? sources.map((src, i) => (
                        <li key={i} className="plag-li">
                          <a className="source-link" href={src}> {src} </a>
                        </li>
                      ))
                    : null}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Plagiarism;
