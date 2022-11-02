import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getParaph, getPlag, getTradX3, load, plagio, paraphrased, traduction } from '../Redux/EasyCopy/copiarSlice'

const GetText = () => {
    // const response = useSelector(quote)
    const trad = useSelector(traduction)
    const loading = useSelector(load)
    const plag = useSelector(plagio)
    const dispatch = useDispatch()
    const [texto, setTexto] = useState('Shakespeare was the son of John Shakespeare, an alderman and a successful glover (glove-maker) originally from Snitterfield in Warwickshire, and Mary Arden, the daughter of an affluent landowning family.')
  return (
    <div>

      <h1>{trad}</h1>
      <h1>{plag}</h1>
      <h1>{loading ? 'Loading' : 'Not loading'}</h1>
      <textarea value={texto} onChange={e => setTexto(e.target.value)}></textarea>
      {/* <button onClick={() => dispatch(getParaph(texto))}> parafrasear </button> */}
      {/* <button onClick={() => dispatch(getTradX3())}> trad3 </button> */}
      <button onClick={() => dispatch(getPlag(texto))}> plag </button>
    </div>
  )
}

export default GetText
