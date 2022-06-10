import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import UserSidebar from '../components/sidebars/UserSidebar';

const MainLayout = ({ children, showSidebarInitially = null }) => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(showSidebarInitially ?? (window.innerWidth < 730 ? false : true));
  const authState = useSelector(state => state.authReducer);

  const classes1 = "relative flex flex-col bg-gray-50 h-screen w-screen overflow-x-hidden";
  const classes2 = "bg-white dark:bg-[#0f1f2e]";

  if (!authState.isLoggedIn) {
    return (
      <>
        <div className={classes1}>
          <Navbar showSidebarToggler={false} />
          <div className={`grow transition-[background-color] ${classes2}`}>
            {children}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className={classes1}>
      <Navbar showSidebarToggler={true} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className='relative grow flex overflow-y-hidden'>
        <UserSidebar isSidebarOpen={isSidebarOpen} />
        <div className={`grow transition-[background-color] overflow-y-auto ${classes2}`}>
          {children}
        </div>
      </div>
    </div>
  )

}


export default MainLayout;