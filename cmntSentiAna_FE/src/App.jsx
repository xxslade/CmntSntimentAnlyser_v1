import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainPage from '../pages/mainPage'
import AnalysisPage from '../pages/AnalysisPage'
import LoadingPage from '../pages/LoadingPage'


function App() {
    const [isMainPage, setIsMainPage] = useState(true);
    const [userURL, setUserURL] = useState('');

  return (
    <>
    {/* <MainPage setIsMainPage = {setIsMainPage}/> */}
    {/* {loading? <LoadingPage /> : isMainPage ? <MainPage setIsMainPage = {setIsMainPage} setUserURL={setUserURL}/> : <AnalysisPage userURL={userURL} setLoading={setLoading}/>} */}
     {isMainPage ? <MainPage setIsMainPage = {setIsMainPage} setUserURL={setUserURL}/> : <AnalysisPage userURL={userURL}/>} 
    </>
  )
}

export default App
