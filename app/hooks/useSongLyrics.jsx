"use client"

import axios from "axios"
import { useEffect, useState } from "react"

export const useSongLyrics = (songId) =>{
    const [loading,setLoading] = useState(true)
    const [lyrics,setLyrics] = useState([])

    useEffect(()=>{
        setLyrics([])
    },[songId])

    useEffect(()=>{
        setLoading(false)
        axios.get(`https://saavn.me/lyrics?id=${songId}`)
        .then((res)=>{
            setLyrics(res.data)
        })
        setLoading(false)
    },[songId])

    return {loading,lyrics}


}

// https://saavn.me/lyrics?id=${songId}