import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import LoginModal from '../../components/modals/LoginModal';
import SignupModal from '../../components/modals/SignupModal';

const AccountActivation = () => {

  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);
  const [fetchData] = useFetch();
  const { activationToken } = useParams();
  const [activationState, setactivationState] = useState("processing");
  // processing, success, error

  useEffect(() => {
    const config = { url: "/auth/activate-account", method: "post", data: { activationToken } };
    fetchData(config, { showSuccessToast: false })
      .then(() => {
        setactivationState("success");
      })
      .catch(err => {
        setactivationState("error");
      });
  }, [activationToken, fetchData])

  return (
    <>
      <div className='py-8'>
        <div className='ml-4 mt-4 mb-8 text-brand font-semibold text-lg'>
          <Link to="/">Knowledge Bytes</Link>
        </div>

        {activationState === "processing" ? (
          <div className='py-8 text-2xl bg-blue-500 font-semibold text-white w-screen text-center h-[200px]'>
            Wait for a while while your account is being activated
          </div>
        ) : activationState === "success" ? (
          <div className='py-8 text-2xl bg-green-500 font-semibold text-white w-screen text-center h-[200px]'>
            Congratulations, your account has been activated and can log in now.
            <button onClick={() => setLoginModal(true)} className='mx-auto mt-10 block text-xl space-x-2 hover:space-x-4'>
              <span className='transition-[margin]'>Login</span>
              <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
            </button>
          </div>
        ) : (
          <div className='py-8 text-2xl bg-red-500 font-semibold text-white w-screen text-center h-[200px]'>
            Oops, some error. You need to signup again.
            <button onClick={() => setSignupModal(true)} className='mx-auto mt-10 block text-xl space-x-2 hover:space-x-4'>
              <span className='transition-[margin]'>Signup</span>
              <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
            </button>
          </div>
        )}
      </div>

      <SignupModal isModalOpen={signupModal} onClose={() => setSignupModal(false)} setLoginModal={setLoginModal} />
      <LoginModal isModalOpen={loginModal} onClose={() => setLoginModal(false)} setSignupModal={setSignupModal} redirectUrl="/dashboard" />
    </>
  )
}

export default AccountActivation