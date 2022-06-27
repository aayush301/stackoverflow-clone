import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import ReactDom from 'react-dom';

const Portal = ({ children }) => {
  return ReactDom.createPortal(children, document.body);
}

const Modal = ({ children, isOpen, onClose }) => {

  const modalRef = useRef();
  const [mouseDownEv, setMouseDownEv] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const checkEscAndCloseModal = e => {
      if (e.key !== "Escape") return;
      onClose();
    }

    window.addEventListener("keydown", checkEscAndCloseModal);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", checkEscAndCloseModal);
    }
  }, [isOpen, onClose]);

  const handleMouseDown = e => {
    setMouseDownEv({ screenX: e.screenX, screenY: e.screenY });
  }



  const checkOutsideAndCloseModal = e => {
    if (modalRef.current.contains(e.target) || Math.abs(mouseDownEv.screenX - e.screenX) > 15 || Math.abs(mouseDownEv.screenY - e.screenY) > 15) return;
    onClose();
    setMouseDownEv(null);
  }


  return (
    <>
      <Portal>
        <div className={`fixed top-0 left-0 bottom-0 right-0 ${isOpen ? "opacity-1 z-[1000]" : "opacity-0 -z-50"} overflow-hidden flex items-center justify-center transition-all duration-500 bg-black bg-opacity-30`} onClick={checkOutsideAndCloseModal} onMouseDown={handleMouseDown}>
          <div ref={modalRef} className={`absolute ${!isOpen ? "opacity-0 scale-0" : "opacity-1"} bg-white rounded-sm shadow-lg overflow-auto transition duration-500 ease-out`}>
            <button className='absolute top-4 right-4 hover:bg-gray-200 dark:hover:bg-gray-800 w-8 h-8 flex items-center justify-center' onClick={onClose}>
              <span><i className="fa-solid fa-close"></i></span>
            </button>
            {children}
          </div>
        </div>
      </Portal>
    </>
  )
}

export default Modal