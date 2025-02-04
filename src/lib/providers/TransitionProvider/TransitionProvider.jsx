"use client"

import { useState, createContext } from "react";

export const TransitionContext = createContext()

export const TransitionProvider = ({ children }) => {
  const [isTransitionActive, setIsTransitionActive] = useState(false);

  return (
    <TransitionContext.Provider value={{ isTransitionActive, setIsTransitionActive }} >
      {children}
    </TransitionContext.Provider>
  )
}