import React from 'react'
import dictionary from '/Users/jacobdominguez/Documents/codiyapa/copiador/src/assets/Dictionary-rafiki.png'
import { useRef } from 'react'
import '/Users/jacobdominguez/Documents/codiyapa/copiador/src/pages/DashBoard/DashBoard.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPencilAlt } from 'react-icons/fa'
import { RiArrowGoBackFill } from 'react-icons/ri'
import TextBox from '../../Components/TextBox/TextBox'
import { useDispatch, useSelector } from 'react-redux'
import { getParaph, paraphrased, sumCount, sumIsOpen, sumView } from '../../Redux/EasyCopy/copiarSlice'
import Sumarizer from '../Sumarizer/Sumarizer'
import GetText from '../../Components/GetText'

export const HeaderSlider = () => {
  const left = useRef()

  const handleMove = (e) => {
    left.current.style.width = `${e.clientX / window.innerWidth * 100}%`;
  }

  return (
    <>
    <div className='bg'> 
      <div className='side' id='left-side' ref={left} onMouseMove={e => handleMove(e)} onTouchMove={e => handleMove(e.touches[0])}>
        <h2 className='title'>
          Sometimes cheating is the only
          <span className='fancy'> option </span>
        </h2>
      </div>
      <div id="right-side" className="side" onMouseMove={e => handleMove(e)} onTouchMove={e => handleMove(e.touches[0])}>
        <h2 className="title">
          Sometimes cheating is the only  
          <span className="fancy"> option </span>     
        </h2>
      </div>
    </div>
    </>
  )
}


const DashBoard = () => {

  const [nav, setNav] = useState(false)
  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sumisOpen = useSelector(sumView)
  const dispatch = useDispatch()
   const handleMouseEnter = () => {
      setIsHover(true);
   };
   const handleMouseLeave = () => {
      setIsHover(false);
   };

  const toggleNav = () => {
    setNav(!nav)
    console.log(nav)
  }

  const clickHandle = () => {
    dispatch(sumIsOpen())
    setNav(!nav)
  }
  const navLinks = [
    {
      title: 'sumarizer',
      img: require('/Users/jacobdominguez/Documents/codiyapa/copiador/src/assets/cheating.gif'),
      path: '/sumarizer'
    }
  ]

  return (
    <>
    <main style={{transform: nav ? 'translateY(-50%)' : 'translateY(0%)'}}>
      <HeaderSlider />` `
    </main>

    <nav>
      <div id="nav-links"  style={{transform: nav ? 'translateY(0%) scale(1)' : ''}}>
        {/* <button key={i} className="nav-link" onClick={() => dispatch(sumIsOpen())}> */}
        {navLinks.map((tool,i) => 
        <button key={i} className="nav-link" onClick={() => clickHandle()}>
            <h2 className="nav-link-label rubik-font"> {tool.title} </h2>
            <img className="nav-link-image" src={tool.img} />
            </button>
            )}
      </div>
    </nav>

    {sumisOpen && <Sumarizer /> }

<button id="nav-toggle" style={{backgroundColor: nav ? 'rgb(85, 130, 149)' : '',
}}  type="button" onClick={toggleNav}  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

  <FaPencilAlt className='open' style={{
    opacity: isHover && !nav ? '1' : '0',
    transform: isHover && !nav ? 'translate(-0%, -50%) scale(1)' : '0',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) scale(0.9)',
    color: 'rgb(246, 231, 224)',
    fontSize:' 1.75rem',
    transition: 'transform, opacity',
    transitionTimingFunction: 'ease',
    transitionDuration: '400ms',
  }} />

  <RiArrowGoBackFill className='close' 
    style={{
    opacity: isHover && nav ? '1' : '0',
    transform: isHover && nav ? 'translate(-0%, -50%) scale(1)' : '0',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) scale(0.9)',
    color: 'rgb(246, 231, 224)',
    fontSize:' 1.75rem',
    transition: 'transform, opacity',
    transitionTimingFunction: 'ease',
    transitionDuration: '400ms',
  }} 

  />
</button>
    </>
  )
}

export default DashBoard
