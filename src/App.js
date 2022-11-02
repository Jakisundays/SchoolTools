import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';

import './App.css';
import TextBox from './Components/TextBox/TextBox';
import DashBoard from './pages/DashBoard/DashBoard';
import Paraphraser from './pages/Paraphraser/Paraphraser';
import Sumarizer from './pages/Sumarizer/Sumarizer';
import { counter, getParaph, paraphrased, sumCount } from './Redux/EasyCopy/copiarSlice';




function App() {


  return (
    <div className="App">
      <DashBoard />
      {/* <Sumarizer /> */}
    </div>
  );
}

export default App;
