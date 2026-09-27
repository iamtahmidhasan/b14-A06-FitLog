"use client"

import React, { createContext, ReactNode, useState } from 'react'

const ExerciseContext = createContext({})

export default function ExerciseProvider({children}:{children : ReactNode}) {
    const [todaysplan, setTodaysplan] = useState([])
    const [save, setSave] = useState([])
    const sharedData= {
        todaysplan,setTodaysplan,save,setSave
    }
  return (
    <ExerciseContext.Provider value={sharedData}>
        {children}
    </ExerciseContext.Provider>
  )
}
