import React from 'react'
import LoginForm from './forms/LoginForm';
import Modal from './utils/Modal'

const LoginModal = ({ isModalOpen, onClose, setSignupModal }) => {
  const switchToSignup = () => {
    onClose();
    setSignupModal(true);
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onClose}>
        <div className='w-[400px] max-w-[100vw] max-w-screen dark:bg-ui-dark-primary'>
          <LoginForm isModalOpen={isModalOpen} onClose={onClose} switchToSignup={switchToSignup} />
        </div>
      </Modal>
    </>
  )
}

export default LoginModal