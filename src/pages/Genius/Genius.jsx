import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getGpt3,
  gptIsOpen,
  gptResponse,
  plagIsOpen,
} from "../../Redux/EasyCopy/copiarSlice";
import "/Users/jacobdominguez/Documents/codiyapa/copiador/src/pages/Genius/Genius.css";

const Genius = () => {
  const [datos, setDatos] = useState({
    pregunta: "",
    modelo: "text-davinci-002",
    temperature: 0.7,
  });

  const models = [
    "text-davinci-002",
    "text-curie-001",
    "text-babbage-001",
    "text-ada-001",
  ];

  const dispatch = useDispatch();
  const gptRes = useSelector(gptResponse);

  return (
    <>
      <div className="space-container" onClick={() => dispatch(gptIsOpen())} />

      <div className="Genius-card">
        <h1> Ask me anything - AI </h1>
        <div className="Genius-flex">
          <div className="Genius-Input">
            <div className="Input-Output">
              <textarea
                className="gptText"
                placeholder="Ask me anything..."
                value={datos.pregunta}
                onChange={(e) =>
                  setDatos({ ...datos, pregunta: e.target.value })
                }
              ></textarea>

              <p> {gptRes} </p>
            </div>
            <div className="Genius-btns">
              <h2>
                {" "}
                {
                  datos.pregunta.split(" ").filter((word) => word !== "").length
                }{" "}
                words
              </h2>
              <button
                className="button"
                onClick={() => dispatch(getGpt3(datos))}
              >
                {" "}
                Ask{" "}
              </button>
            </div>
          </div>

          <div className="Genius-settings">
            <span className="modelos">
              Models:
              <select>
                {models.map((ai, i) => (
                  <option key={i} value={ai}>
                    {" "}
                    {ai}{" "}
                  </option>
                ))}
              </select>
            </span>

            <span>
              {" "}
              Temperature: {datos.temperature}
              <input
                type="range"
                className="slider"
                value={datos.temperature}
                onChange={(e) =>
                  setDatos({ ...datos, temperature: Number(e.target.value) })
                }
                min="0"
                max="1"
                step="0.01"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Genius;
