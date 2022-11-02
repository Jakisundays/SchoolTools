import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextBox from '../../Components/TextBox/TextBox'
import { getParaph, paraphrased, sumCount, sumIsOpen } from '../../Redux/EasyCopy/copiarSlice'
import '/Users/jacobdominguez/Documents/codiyapa/copiador/src/pages/Sumarizer/Sumarizer.css'



const Sumarizer = () => {
  const outPut = useSelector(paraphrased)
  const wordTotal = useSelector(sumCount)
  const dispatch = useDispatch()
  
  const obj1 = {
    title: 'paraphraser',
    button: 'apretar',
    output: outPut,
    wordCount: wordTotal,
    funcion: (text) => {
      dispatch(getParaph(text))
    },
  }

  return (
    <>
    
    <div className='space-container' onClick={() => dispatch(sumIsOpen())} >
    </div>
      <TextBox {...obj1} />
    </>
  )
}

export default Sumarizer
