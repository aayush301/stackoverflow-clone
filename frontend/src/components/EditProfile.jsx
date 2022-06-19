import React, { useState } from 'react'
import ChangePasswordForm from './forms/ChangePasswordForm';
import ChangeUsernameForm from './forms/ChangeUsernameForm';
import EditProfileForm from './forms/EditProfileForm';


const EditProfile = ({ profile, onProfileUpdate }) => {
  const [openedTab, setOpenedTab] = useState(0);
  const tabClasses = (tabNo) => (
    `font-semibold text-md text-gray-600 cursor-pointer uppercase border-b-2 border-transparent px-6 py-2 mt-2 hover:bg-gray-50 dark:hover:bg-gray-800 focus:border-transparent transition
     ${openedTab === tabNo && "text-sky-500 border-blue-500"} `
  );

  return (
    <>
      <div className='sm:mx-8'>
        <ul className="flex flex-row overflow-x-auto list-none border-b border-slate-200 dark:border-gray-500 p-0">
          <li className={tabClasses(0)} onClick={() => setOpenedTab(0)}>Personal Details </li>
          <li className={tabClasses(1)} onClick={() => setOpenedTab(1)}>Change Username </li>
          <li className={tabClasses(2)} onClick={() => setOpenedTab(2)}>Change Password </li>
        </ul>

        <div>
          <div className={openedTab !== 0 ? "hidden" : ""}>
            <EditProfileForm profile={profile} onProfileUpdate={onProfileUpdate} />
          </div>

          <div className={openedTab !== 1 ? "hidden" : ""}>
            <ChangeUsernameForm profile={profile} onProfileUpdate={onProfileUpdate} />
          </div>

          <div className={openedTab !== 2 ? "hidden" : ""}>
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </>
  )
}

export default EditProfile