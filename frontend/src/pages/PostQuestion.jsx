import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import PostQuestionForm from '../components/forms/PostQuestionForm';
import Loader from '../components/utils/Loader';
import MainLayout from '../layouts/MainLayout';

const PostQuestion = () => {

  const authState = useSelector(state => state.authReducer);
  useEffect(() => {
    document.title = `Post a Question`;
  });

  if (authState.loading) {
    return <div className='my-40'><Loader className='mx-auto' /></div>;
  }

  return (
    <>
      <MainLayout>
        <h2 className='mx-8 mt-6 mb-3 text-black dark:text-gray-200 font-semibold text-lg rounded-sm'>Post Question</h2>
        <PostQuestionForm />
      </MainLayout>
    </>
  )
}

export default PostQuestion