import React from 'react'
import { Facebook, Linkedin, Mail, Telegram, Twitter, Whatsapp } from 'react-social-sharing'

const ShareIcons = ({ link = window.location.href, showShareIcons }) => {
  return (
    <>
      <div className={`flex flex-wrap rounded-md shadow-md w-fit transition-[max-height] overflow-hidden ${showShareIcons ? "max-h-12" : "max-h-0"}`}>
        <Whatsapp link={link} small title="Share on Whatsapp" className="w-8 h-8 p-2 rounded-full" />
        <Facebook link={link} small title="Share on Facebook" className="w-8 h-8 p-2 rounded-full" />
        <Twitter link={link} small title="Share on Twitter" className="w-8 h-8 p-2 rounded-full" />
        <Linkedin link={link} small title="Share on Linkedin" className="w-8 h-8 p-2 rounded-full" />
        <Telegram link={link} small title="Share on Telegram" className="w-8 h-8 p-2 rounded-full" />
        <Mail link={link} small title="Share on Mail" className="w-8 h-8 p-2 rounded-full" />
      </div>
    </>
  )
}

export default ShareIcons