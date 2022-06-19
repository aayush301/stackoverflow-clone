import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import MainLayout from '../../layouts/MainLayout';

const UserDashboard = () => {

  const authState = useSelector(state => state.authReducer);

  useEffect(() => {
    document.title = `Dashboard | ${authState.user?.name}`
  }, [authState.user]);


  return (
    <>
      <MainLayout>
        <h1 className='m-8 dark:text-gray-300 text-2xl'>Welcome {authState.user?.name}</h1>
      </MainLayout>
    </>
  )
}

export default UserDashboard