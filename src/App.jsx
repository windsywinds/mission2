import React, { useState } from 'react'


function App() {
  
  console.log("running")

  return (
    <div className="bg-[#0b0f51] text-stone-800 min-h-screen font-inter flex flex-col items-center justify-center">
      <h1 className="text-6xl">Image Recognition</h1>
      <input className="w-450"
            placeholder="Enter image URL"  
            
          />
          <button className="w-10px bg-slate-400"
            
          >
            Run Service
          </button>
    </div>
  )
}

export default App
