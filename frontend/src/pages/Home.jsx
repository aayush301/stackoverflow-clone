import React, { useState } from 'react'
import LoginModal from '../components/modals/LoginModal';
import SignupModal from '../components/modals/SignupModal';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  return (
    <>
      <MainLayout showSidebarInitially={false}>
        <div className='bg-brand dark:bg-inherit text-white dark:text-gray-200 h-[40vh] py-8 text-center'>
          <h1 className='text-2xl'> Welcome to Knowledge Bytes</h1>
          <button onClick={() => setSignupModal(true)} className='mt-10 text-xl block space-x-2 hover:space-x-4'>
            <span className='transition-[margin]'>Join now</span>
            <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
          </button>
        </div>
      </MainLayout>

      <SignupModal isModalOpen={signupModal} onClose={() => setSignupModal(false)} setLoginModal={setLoginModal} />
      <LoginModal isModalOpen={loginModal} onClose={() => setLoginModal(false)} setSignupModal={setSignupModal} />
    </>
  )
}

export default Home