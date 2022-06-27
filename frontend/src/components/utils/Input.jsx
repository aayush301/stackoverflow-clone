import React from 'react'

const Input = ({ id, name, type, value, className = "", disabled = false, placeholder, onChange }) => {
  return (
    <input id={id} type={type} name={name} value={value} disabled={disabled} className={`block w-full mt-2 px-3 py-2 text-gray-600 dark:text-gray-300 rounded-[4px] border-2 border-gray-100 dark:border-[#202225] ${disabled ? "bg-gray-50" : "bg-white dark:bg-[#202225]"} hover:border-gray-300 focus:border-brand dark:focus:border-brand focus:hover:border-brand dark:focus:hover:border-brand transition outline-none ${className}`} placeholder={placeholder} onChange={onChange} />
  )
}
export default Input

export const Textarea = ({ id, name, type, value, className = "", placeholder, onChange }) => {
  return (
    <textarea id={id} type={type} name={name} value={value} className={`block w-full h-40 mt-2 px-3 py-2 text-gray-600 rounded-[4px] border-2 border-gray-100 focus:border-brand transition outline-none hover:border-gray-300 ${className}`} placeholder={placeholder} onChange={onChange} />
  )
}

