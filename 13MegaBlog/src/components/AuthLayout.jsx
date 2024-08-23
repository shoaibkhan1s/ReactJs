import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    const navigate = useNavigate() // Route navigate karne ke liye navigate function banaya
    const [loader, setLoader] = useState(true) // Loader ke liye state banayi, jo initially true hai
    const authStatus = useSelector(state => state.auth.status) // Redux store se authStatus ko access kar rahe hain

    useEffect(() => {
        // Agar authentication true hai aur authStatus false hai, toh login page pe bhejo
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } 
        // Agar authentication false hai aur authStatus true hai, toh home page pe bhejo
        else if(!authentication &&  authStatus !== authentication) {
            navigate('/')
        }
        setLoader(false) // Loader ko false set kar diya, kyunki ab hume pata chal gaya ki user authenticated hai ya nahi
    }, [authStatus, navigate, authentication]) // Yeh effect jab bhi authStatus, navigate, ya authentication change hote hain, tab chalega

    // Agar loader true hai toh "Loading..." message dikhayenge, warna children render karenge
    return loader ? <h1>Loading...</h1> : <>{children}</>
}
