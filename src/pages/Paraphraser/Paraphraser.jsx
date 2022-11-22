import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextBox from '../../Components/TextBox/TextBox'
import { getParaph, paraIsOpen, paraphrased, sumCount } from '../../Redux/EasyCopy/copiarSlice'
import '/Users/jacobdominguez/Documents/codiyapa/copiador/src/pages/Paraphraser/Paraphraser.css'

const Paraphraser = () => {
  const dispatch = useDispatch()
  const outPut = useSelector(paraphrased)
  const wordTotal = useSelector(sumCount)


  const paraObj = {
    title: 'Paraphraser',
    button: 'paraphrase',
    output: outPut,
    wordCount: wordTotal,
    funcion: (text) => {
      dispatch(getParaph(text))
    },
  }
  return (
    <>
      <div className='space-container' onClick={() => dispatch(paraIsOpen())} >
      </div>
      <TextBox {...paraObj} />
    </>
  )
}

export default Paraphraser
