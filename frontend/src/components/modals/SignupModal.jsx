import React from 'react'
import SignupForm from '../forms/SignupForm';
import Modal from '../utils/Modal'

const SignupModal = ({ isModalOpen, onClose, setLoginModal }) => {
  const switchToLogin = () => {
    onClose();
    setLoginModal(true);
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onClose}>
        <div className='w-[400px] max-w-[100vw]'>
          <SignupForm isModalOpen={isModalOpen} onClose={onClose} switchToLogin={switchToLogin} />
        </div>
      </Modal>
    </>
  )
}

export default SignupModal