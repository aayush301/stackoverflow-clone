import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import UserSidebar from '../components/UserSidebar';

const MainLayout = ({ children }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth < 730 ? false : true);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const authState = useSelector(state => state.authReducer);

  if (!authState.isLoggedIn) {
    return (
      <>
        <div className='relative flex flex-col bg-gray-50 h-screen w-screen overflow-x-hidden'>
          <Navbar showSidebarToggler={false} />
          <div className='bg-white dark:bg-[#2a2f38] grow'>
            {children}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className='relative flex flex-col h-screen w-screen overflow-x-hidden overflow-y-hidden'>
      <Navbar showSidebarToggler={true} toggleSidebar={toggleSidebar} />
      <div className='relative grow flex overflow-y-hidden'>
        <UserSidebar isSidebarOpen={isSidebarOpen} />
        <div className='grow bg-white overflow-y-auto dark:bg-[#2a2f38] transition-[background-color]'>
          {children}
        </div>
      </div>
    </div>
  )

}


export default MainLayout;