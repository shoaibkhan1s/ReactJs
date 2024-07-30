import { useContext, createContext} from 'react'

export const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: ()=>{},
    lightTheme: ()=>{}
})

export const ThemeContextProvider = ThemeContext.Provider //mini-context me humne alag file bna kr provider create kra tha but hum same file me create kr skte hai.

export default function useTheme(){
return useContext(ThemeContext)   //yaha humne ek custom hook create kra hai taki hume har file me baar baar useContext use na krna pde hum sidha useTheme use krke use call kr le.
}