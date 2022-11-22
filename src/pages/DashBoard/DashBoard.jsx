import React from "react";
import { useRef } from "react";
import "/Users/jacobdominguez/Documents/codiyapa/copiador/src/pages/DashBoard/DashBoard.css";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getParaph,
  paraIsOpen,
  paraphrased,
  paraView,
  plagView,
  sumCount,
  sumIsOpen,
  sumView,
  plagIsOpen,
  gptView,
  gptIsOpen,
} from "../../Redux/EasyCopy/copiarSlice";
import Sumarizer from "../Sumarizer/Sumarizer";
import Paraphraser from "../Paraphraser/Paraphraser";
import Plagiarism from "../PlagiarismCheck/Plagiarism";
import Genius from "../Genius/Genius";

export const HeaderSlider = () => {
  const left = useRef();

  const handleMove = (e) => {
    left.current.style.width = `${(e.clientX / window.innerWidth) * 100}%`;
  };

  return (
    <>
      <div className="bg">
        <div
          className="side"
          id="left-side"
          ref={left}
          onMouseMove={(e) => handleMove(e)}
          onTouchMove={(e) => handleMove(e.touches[0])}
        >
          <h2 className="title">
            Measure progress, not the time that you're
            <span className="fancy"> working. </span>
          </h2>
        </div>
        <div
          id="right-side"
          className="side"
          onMouseMove={(e) => handleMove(e)}
          onTouchMove={(e) => handleMove(e.touches[0])}
        >
          <h2 className="title">
            Measure progress, not the time that you're
            <span className="fancy"> working. </span>
          </h2>
        </div>
      </div>
    </>
  );
};

const DashBoard = () => {
  const [nav, setNav] = useState(false);
  const [isHover, setIsHover] = useState(false);
  // const [postY, setPostY] = useState(0)
  const slide = useRef();

  const sumisOpen = useSelector(sumView);
  const paraisOpen = useSelector(paraView);
  const plagisOpen = useSelector(plagView);
  const gptisOpen = useSelector(gptView);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const toggleNav = () => {
    setNav(!nav);
  };

  const navLinks = [
    {
      title: "Text Summarizer",
      img: require("/Users/jacobdominguez/Documents/codiyapa/copiador/src/assets/summary.png"),
      funcion: () => {
        dispatch(sumIsOpen());
        setNav(!nav);
      },
    },
    {
      title: "Paraphraser",
      img: require("/Users/jacobdominguez/Documents/codiyapa/copiador/src/assets/Paraphraser.png"),
      funcion: () => {
        dispatch(paraIsOpen());
        setNav(!nav);
      },
    },
    {
      title: "Plagiarism Check",
      img: require("/Users/jacobdominguez/Documents/codiyapa/copiador/src/assets/plagioCheck.png"),
      funcion: () => {
        dispatch(plagIsOpen());
        setNav(!nav);
      },
    },
    {
      title: "Ask me anything - AI",
      img: require("/Users/jacobdominguez/Documents/codiyapa/copiador/src/assets/Ai.png"),
      funcion: () => {
        dispatch(gptIsOpen());
        setNav(!nav);
      },
    },
  ];

  return (
    <>
      <main style={{ transform: nav ? "translateY(-50%)" : "translateY(0%)" }}>
        <HeaderSlider />
      </main>

      <nav>
        <div
          id="nav-links"
          ref={slide}
          style={{ transform: nav && "translateY(0%) scale(1)" }}
        >
          {navLinks.map((tool, i) => (
            <div key={i} className="nav-link" onClick={() => tool.funcion()}>
              <h2 className="nav-link-label rubik-font"> {tool.title} </h2>
              <img className="nav-link-image" src={tool.img} />
            </div>
          ))}
        </div>
      </nav>

      {sumisOpen && <Sumarizer />}
      {paraisOpen && <Paraphraser />}
      {plagisOpen && <Plagiarism />}
      {gptisOpen && <Genius />}

      <button
        id="nav-toggle"
        style={{ backgroundColor: nav && "var(--c1)" }}
        type="button"
        onClick={toggleNav}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <FaPencilAlt
          className="open"
          style={{
            opacity: isHover && !nav ? "1" : "0",
            transform: isHover && !nav ? "translate(-0%, -50%) scale(1)" : "0",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) scale(0.9)",
            color: "var(--c2)",
            fontSize: " 1.75rem",
            transition: "transform, opacity",
            transitionTimingFunction: "ease",
            transitionDuration: "400ms",
          }}
        />

        <RiArrowGoBackFill
          className="close"
          style={{
            opacity: isHover && nav ? "1" : "0",
            transform: isHover && nav ? "translate(-0%, -50%) scale(1)" : "0",
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) scale(0.9)",
            color: "rgb(246, 231, 224)",
            fontSize: " 1.75rem",
            transition: "transform, opacity",
            transitionTimingFunction: "ease",
            transitionDuration: "400ms",
          }}
        />
      </button>
    </>
  );
};

export default DashBoard;
