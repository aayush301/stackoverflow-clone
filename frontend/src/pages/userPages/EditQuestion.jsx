import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditQuestionForm from '../../components/forms/EditQuestionForm';
import useFetch from '../../hooks/useFetch';
import MainLayout from '../../layouts/MainLayout';

const EditQuestion = () => {

  const authState = useSelector(state => state.authReducer);
  const { qid } = useParams();
  const [fetchData] = useFetch();
  const [question, setQuestion] = useState({});

  useEffect(() => {
    document.title = `Edit Question`;
  });

  useEffect(() => {
    if (authState.loading) return;
    const config = { url: `/questions/${qid}`, method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setQuestion(data.question));
  }, [fetchData, qid, authState]);


  return (
    <>
      <MainLayout>
        <h2 className='mx-8 mt-6 mb-3 text-black dark:text-gray-200 font-semibold text-lg rounded-sm'>Edit Question</h2>
        <EditQuestionForm question={question} />
      </MainLayout>
    </>
  )
}

export default EditQuestion