import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import MainLayout from '../layouts/MainLayout';

const UserDashboard = () => {

  const authState = useSelector(state => state.authReducer);

  useEffect(() => {
    document.title = `Dashboard | ${authState.user?.name}`
  }, [authState.user]);

  return (
    <>
      <MainLayout>
        <div>Hello</div>
      </MainLayout>
    </>
  )
}

export default UserDashboard