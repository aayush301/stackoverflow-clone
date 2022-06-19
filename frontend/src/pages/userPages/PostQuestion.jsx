import React, { useEffect } from 'react'
import PostQuestionForm from '../../components/forms/PostQuestionForm';
import MainLayout from '../../layouts/MainLayout';

const PostQuestion = () => {

  useEffect(() => {
    document.title = `Post a Question`;
  });


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