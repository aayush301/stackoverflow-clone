import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout'

const NotFound = () => {

  useEffect(() => {
    document.title = "404 | Not found";
  }, []);

  return (
    <MainLayout>
      <div className='w-full h-full bg-gray-100 dark:bg-inherit dark:text-gray-200 py-16 text-center'>
        <h1 className='text-7xl my-8'>404</h1>
        <h2 className='text-xl'>The page you are looking for doesn't exist</h2>
        <Link to="/" className='inline-block my-5 px-3 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-sm'>Return to Home</Link>
      </div>
    </MainLayout>
  )
}

export default NotFound