import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
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
          <Tooltip position='bottom' text={"Change theme"}>
            <button className='w-8 h-8 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full cursor-pointer' onClick={toggleTheme}>
              {theme === "dark" ? (<i className="fa-solid fa-moon"></i>) : (<i className="fa-solid fa-sun"></i>)}
            </button>
          </Tooltip>
          {authState.isLoggedIn ? (
            <Link to="/dashboard" className='bg-brand hover:bg-brand-hover w-8 h-8 text-white flex items-center justify-center rounded-full cursor-pointer'>{authState.user?.name?.charAt(0)}</Link>
          ) : (
            <button className='py-2 px-3 cursor-pointer text-brand hover:bg-gray-100 uppercase transition rounded-sm text-xl font-semibold' onClick={() => setLoginModal(true)}>Login</button>
          )}
        </div>
      </header>

      <SignupModal isModalOpen={signupModal} onClose={() => setSignupModal(false)} setLoginModal={setLoginModal} />
      <LoginModal isModalOpen={loginModal} onClose={() => setLoginModal(false)} setSignupModal={setSignupModal} />
    </>
  )
}

export default Navbar