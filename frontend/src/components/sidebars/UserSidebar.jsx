import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';

const UserSidebar = ({ isSidebarOpen }) => {

  const authState = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogoutClick = () => {
    dispatch(logout());
  }

  return (
    <>
      <div className={`absolute z-10 h-full bg-gray-50 dark:bg-[#2c3e50] text-gray-800 dark:text-gray-300 py-4 overflow-y-auto transition-all w-60 ${isSidebarOpen ? "shadow-2xl md:shadow-xl" : "-translate-x-full"}`}>

        <div className='flex gap-4 items-center'>
          <span className='ml-3 bg-brand hover:bg-brand-hover w-8 h-8 text-white flex items-center justify-center rounded-full cursor-pointer'>{authState.user?.name?.charAt(0)}</span>
          <span>{authState.user?.name}</span>
        </div>

        <ul className='my-4 whitespace-nowrap overflow-x-hidden'>
          {[
            {
              title: "Dashboard",
              path: "/dashboard",
              icon: <i className="fa-solid fa-home"></i>,
            },
            {
              title: "Ask a Question",
              path: "/questions/ask",
              icon: <i className="fa-solid fa-circle-question"></i>,
            },
            {
              title: "My Activities",
              path: "/activities/me",
              icon: <i className="fa-solid fa-chart-line"></i>,
            },
            {
              title: "My Questions",
              path: "/questions/me",
              icon: <i className="fa-solid fa-question"></i>,
            },
            {
              title: "My Answers",
              path: "/answers/me",
              icon: <i className="fa-solid fa-reply"></i>,
            },
            {
              title: "My Bookmarks",
              path: "/bookmarks/me",
              icon: <i className="fa-solid fa-bookmark"></i>,
            },
            {
              title: "My likes",
              path: "/likes/me",
              icon: <i className="fa-solid fa-thumbs-up"></i>,
            },
            {
              title: "My Profile",
              path: "/profile",
              icon: <i className="fa-solid fa-user"></i>,
            },

          ].map((menuItem, i) => (
            <li key={i} className={`cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-900 text-inherit dark:text-inherit transition ${location.pathname === menuItem.path ? "border-r-[3px]  border-purple-700 bg-gray-200 dark:bg-gray-800" : ""}`}>
              <Link to={menuItem.path} className='block w-full h-full px-4 py-2'>
                <span className='inline-block w-8 mr-3.5 text-[#183153] dark:text-inherit'>{menuItem.icon}</span>
                <span>{menuItem.title}</span>
              </Link>
            </li>
          ))}

        </ul>
        <button className='block mx-auto bg-brand hover:bg-brand-hover text-white dark:text-black text-lg px-3 py-1.5 rounded-sm' onClick={handleLogoutClick}>Logout</button>
      </div>

      <div className={`flex-shrink-0 h-full bg-white dark:bg-[#2a2f38] ${isSidebarOpen ? "md:w-60" : "w-0"}`}>
      </div>
    </>
  )
}

export default UserSidebar