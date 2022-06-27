import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginModal from './modals/LoginModal';
import SignupModal from './modals/SignupModal';
import Tooltip from './utils/Tooltip';

const Navbar = ({ showSidebarToggler, toggleSidebar }) => {

  const authState = useSelector(state => state.authReducer);
  const [theme, setTheme] = useState(localStorage.getItem("theme") === "dark" ? "dark" : "light");

  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);

  const toggleTheme = () => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
    else {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
    document.documentElement.classList.toggle("dark");
  }


  return (
    <>
      <header className='flex justify-between sticky z-20 top-0 p-4 bg-white dark:bg-ui-dark-primary text-black dark:text-gray-200 shadow-md items-center transition duration-500'>
        <div className='flex items-center gap-2'>
          {showSidebarToggler && <span onClick={toggleSidebar} className="inline-flex w-10 h-10 items-center justify-center cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"><i className="fa-solid fa-align-left"></i></span>}
          <h2 className='cursor-pointer uppercase text-xl font-semibold'>
            <Link to="/"> Knowledge Bytes </Link>
          </h2>
        </div>

        <div className='flex gap-2 sm:gap-4 font-medium items-center'>
          <Tooltip position='bottom' text={"Toggle theme"}>
            <button className='w-8 h-8 text-center hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full cursor-pointer' onClick={toggleTheme}>
              {theme === "dark" ? (
                <i className="fa-solid fa-moon"></i>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[22px] h-[22px] mx-[5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </Tooltip>

          {authState.isLoggedIn ? (
            <Link to="/dashboard" className='bg-brand hover:bg-brand-hover w-8 h-8 text-white flex items-center justify-center rounded-full cursor-pointer'>{authState.user?.name?.charAt(0)}</Link>
          ) : (
            <button className='py-1.5 px-4 cursor-pointer text-white bg-brand hover:bg-brand-hover text-lg transition rounded-[3px] font-semibold' onClick={() => setLoginModal(true)}>Login</button>
          )}
        </div>
      </header>

      <SignupModal isModalOpen={signupModal} onClose={() => setSignupModal(false)} setLoginModal={setLoginModal} />
      <LoginModal isModalOpen={loginModal} onClose={() => setLoginModal(false)} setSignupModal={setSignupModal} redirectUrl={"/dashboard"} />
    </>
  )
}

export default Navbar