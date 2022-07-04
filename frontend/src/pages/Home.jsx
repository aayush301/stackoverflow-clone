import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LoginModal from '../components/modals/LoginModal';
import SignupModal from '../components/modals/SignupModal';
import MainLayout from '../layouts/MainLayout';

const Home = () => {

  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const { isLoggedIn } = authState;

  return (
    <>
      <MainLayout showSidebarInitially={false}>

        <div className='relative py-16 px-8 bg-brand dark:bg-inherit text-white dark:text-gray-200 min-h-[90vh] overflow-hidden'>
          <h1 className='my-4 text-center text-2xl sm:text-4xl font-semibold'>Solve your all questions at one place</h1>
          <h3 className='text-center text-lg sm:text-2xl text-gray-50 dark:text-gray-300'>Get best answers to your questions here at Knowledge Bytes</h3>

          <div className='mx-4 lg:mx-24 mt-16 md:mt-24 mb-4 flex flex-col md:flex-row gap-8 justify-between items-center'>
            <ul className='list-disc flex flex-col gap-4 text-lg md:text-xl dark:text-gray-300'>
              <li>Ask any question whenever stuck</li>
              <li>Get the best answers to your questions</li>
              <li>Help others by answering their questions</li>
              <li>Bookmark your favourite items</li>
              <li>Thank others by liking their posts</li>
            </ul>

            <div className='text-lg sm:text-xl'>
              {!isLoggedIn ? (
                <>
                  <div className='mb-4'>Join now to get answers right at your desk</div>
                  <button onClick={() => setSignupModal(true)} className='space-x-2 hover:space-x-4 px-3 py-2 rounded-[4px] bg-[#6b3eb9] hover:bg-[#6235b1]'>
                    <span className='transition-[margin]'>Get started</span>
                    <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
                  </button>

                  <span className='ml-2'>or <Link to="/questions" className='text-green-400 whitespace-nowrap'>Search questions</Link></span>
                </>
              ) : (
                <button onClick={() => navigate("/dashboard")} className='block space-x-2 hover:space-x-4 px-3 py-2 rounded-[4px] bg-[#6b3eb9] hover:bg-[#6235b1]'>
                  <span className='transition-[margin]'>Dashboard</span>
                  <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
                </button>
              )}
            </div>
          </div>
        </div>

      </MainLayout>

      <SignupModal isModalOpen={signupModal} onClose={() => setSignupModal(false)} setLoginModal={setLoginModal} />
      <LoginModal isModalOpen={loginModal} onClose={() => setLoginModal(false)} setSignupModal={setSignupModal} />
    </>
  )
}

export default Home