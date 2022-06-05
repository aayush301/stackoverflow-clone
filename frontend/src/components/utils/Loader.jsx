import React from 'react'

const Loader = ({ className = "" }) => {
  return (
    <>
      <div className={`mx-auto w-8 h-8 ${className}`}>
        <div className="w-full h-full rounded-full border-[3px] border-indigo-600 border-b-transparent animate-loader"></div>
      </div>
    </>
  )
}

export default Loader