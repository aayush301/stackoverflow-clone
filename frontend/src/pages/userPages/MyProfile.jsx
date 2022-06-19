import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import EditProfile from '../../components/EditProfile';
import Loader from '../../components/utils/Loader';
import useFetch from '../../hooks/useFetch';
import MainLayout from '../../layouts/MainLayout';
import { convertToAbsoluteDate, convertToXTimeAgo } from '../../utils/date';

const MyProfile = () => {
  const authState = useSelector(state => state.authReducer);
  const [fetchData, { loading }] = useFetch();
  const [profile, setProfile] = useState({});
  const [mode, setMode] = useState("view");     // view or edit


  useEffect(() => {
    document.title = `Profile | ${authState.user?.name}`
  }, [authState.user]);


  const fetchProfile = useCallback(async () => {
    const config = { url: "/profile", method: "get", headers: { Authorization: authState.token } };
    const { user } = await fetchData(config, { showSuccessToast: false });
    setProfile(user);
  }, [authState, fetchData]);

  useEffect(() => { fetchProfile() }, [fetchProfile, authState, fetchData]);

  const handleProfileUpdate = () => {
    fetchProfile();
  }

  const toggleMode = () => {
    setMode(mode === "view" ? "edit" : "view");
  }


  return (
    <>
      <MainLayout>
        <div className='h-full pt-8'>
          <h2 className='ml-8 dark:text-gray-300 font-semibold text-xl rounded-sm'>My Profile</h2>

          <div className="flex mx-8">
            <button onClick={toggleMode} className='ml-auto font-semibold text-blue-500 uppercase hover:text-blue-700'>{mode === "view" ? "Edit profile" : 'View profile'}</button>
          </div>

          {mode === "view" ? (
            loading ? (
              <div className='sm:mx-8 bg-gray-100 dark:bg-ui-dark-primary px-3 sm:px-8 py-8 rounded-md'>
                <Loader />
              </div>
            ) : (
              <div className='sm:mx-8 bg-gray-100 dark:bg-ui-dark-primary dark:text-gray-300 px-3 sm:px-8 py-8 rounded-md text-gray-800 font-medium overflow-x-auto'>
                <div className='mb-4'>
                  <h2 className='inline-block font-semibold uppercase text-black dark:text-inherit text-2xl'>{profile.name}</h2>
                  <span className='ml-4 text-[17px] inline-block font-semibold text-green-600'>@{profile.username}</span>
                  <div>Joined {convertToXTimeAgo(profile.joiningTime)}, ({convertToAbsoluteDate(profile.joiningTime)})</div>
                </div>

                <div>
                  <div className='flex gap-4'>
                    <span className='w-20 text-right'>Email </span>
                    <span className='text-black dark:text-inherit font-semibold'>{profile.email}</span>
                  </div>
                  <div className='flex gap-4'>
                    <span className='w-20 text-right'>Location </span>
                    <span className='text-black dark:text-inherit font-semibold'>{profile.location || "No location added"}</span>
                  </div>
                </div>
              </div>
            )

          ) : (
            <EditProfile profile={profile} onProfileUpdate={handleProfileUpdate} />
          )}
        </div>
      </MainLayout>
    </>
  )
}

export default MyProfile