import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';
import LoginForm from '../forms/LoginForm';
import Modal from '../utils/Modal'

const LoginModal = ({ isModalOpen, onClose, setSignupModal, redirectUrl }) => {
  const switchToSignup = () => {
    onClose();
    setSignupModal(true);
  }

  // login or forgot-password
  const [showType, setShowType] = useState("login");
  useEffect(() => {
    setShowType("login");
  }, [isModalOpen]);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={onClose}>
        <div className='w-[400px] max-w-[100vw] max-w-screen dark:bg-ui-dark-primary'>
          {showType === "login" ? (
            <LoginForm isModalOpen={isModalOpen} onClose={onClose} switchToSignup={switchToSignup} redirectUrl={redirectUrl} switchToForgotPassword={() => { setShowType("forgot-password") }} />
          ) : (
            <ForgotPasswordForm isModalOpen={isModalOpen} onClose={onClose} switchToSignup={switchToSignup} />
          )}
        </div>
      </Modal>
    </>
  )
}

export default LoginModal