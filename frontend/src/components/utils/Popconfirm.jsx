import React, { useEffect, useRef } from 'react'
import ReactDom from 'react-dom';

const Portal = ({ children }) => {
  return ReactDom.createPortal(children, document.body);
}

const Popconfirm = ({ isOpen, title = "Are you sure?", okText = "Yes", cancelText = "No", onConfirm, onCancel, isDismissible = true }) => {

  const modalRef = useRef();

  useEffect(() => {
    if (!isOpen) return;

    const checkEscAndCloseModal = e => {
      if (e.key !== "Escape") return;
      onCancel();
    }

    window.addEventListener("keydown", checkEscAndCloseModal);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", checkEscAndCloseModal);

    }
  }, [isOpen, onCancel]);


  const checkOutsideAndCloseModal = e => {
    if (modalRef.current.contains(e.target)) return;
    onCancel();
  }


  return (
    <>
      <Portal>
        <div className={`fixed top-0 left-0 bottom-0 right-0 ${isOpen ? "opacity-1 z-[1000]" : "opacity-0 -z-50"} overflow-hidden flex items-center justify-center transition-all duration-500 bg-black bg-opacity-30`} onClick={checkOutsideAndCloseModal}>
          <div ref={modalRef} className={`absolute w-[500px] max-w-[100vw] min-h-[180px] ${!isOpen ? "opacity-0 translate-y-[80px]" : "opacity-1"} bg-white dark:bg-[#2c3e50] dark:text-gray-300 overflow-auto p-8 rounded-md shadow-lg transition-all duration-500 ease-out`}>

            <button className='absolute top-2 right-2 hover:bg-gray-200 dark:hover:bg-gray-800 w-8 h-8 rounded-md transition flex items-center justify-center' onClick={onCancel}>
              <span><i className="fa-solid fa-close"></i></span>
            </button>

            <div className='text-lg'>
              <h3 className='font-semibold'>{title}</h3>
              <div className='mt-5 flex gap-5'>
                <button onClick={onConfirm} className='bg-sky-500 hover:bg-sky-400 dark:text-black transition text-white px-3 py-1.5 rounded-[3px]'>{okText}</button>
                <button onClick={onCancel} className='bg-gray-200 hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-900 transition duration-150 font-semibold px-3 py-1.5 rounded-[3px]'>{cancelText}</button>
              </div>
            </div>

          </div>
        </div>
      </Portal>
    </>
  )
}

export default Popconfirm