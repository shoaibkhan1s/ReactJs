import React, { useState,useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    const data = useLoaderData() // use in second method of fetching
    // const [data, setData] = useState([])
    // useEffect(()=>{
    //     fetch(`https://api.github.com/users/hiteshchoudhary`)
    //     .then((res)=>res.json())
    //     .then((res=>{
    //         console.log(res)
    //         setData(res)
    //     }))
    // },[])
    
  return (
<div className="text-center m-4 bg-gray-600 text-white p-4 text-3xl">
    Github Followers : {data.followers}
    <div className='flex justify-center mt-3'>
    <img  src={data.avatar_url} alt="Github Image" width={300}/>
    </div>
</div>
)
}

export default Github

//another method of fetching data
export const githubInfoLoader = async () =>{
     const res  = await fetch('https://api.github.com/users/hiteshchoudhary')
    return res.json()
}