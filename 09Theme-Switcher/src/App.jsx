import { useState,useEffect } from 'react'
import './App.css'
import { ThemeContextProvider } from './contexts/theme'
import Card from './components/Card'
import Button from './components/Button'

function App() {
  const [themeMode, setThemeMode] = useState("light")

  const lightTheme =()=>{
setThemeMode('light')  //lightTheme and darkTheme function humne theme.js me bnaye the hum use theme.js aur yaha jaha marji define kr skte hai.
  }

  const darkTheme = ()=>{
    setThemeMode('dark')
  }

  // actual change in theme
  useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark')
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])
  
  return (
  <ThemeContextProvider value={{themeMode,lightTheme,darkTheme}}>
  
<div className="flex flex-wrap min-h-screen items-center">
                <div className="w-full"> 
                    <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                      <Button />
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                      <Card />

                    </div>
                </div>
            </div> 

  </ThemeContextProvider>
  )
}

export default App
