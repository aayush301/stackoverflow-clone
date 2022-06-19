import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditAnswerForm from '../../components/forms/EditAnswerForm';
import useFetch from '../../hooks/useFetch';
import MainLayout from '../../layouts/MainLayout';

const EditAnswer = () => {

  const authState = useSelector(state => state.authReducer);
  const { ansid } = useParams();
  const [fetchData] = useFetch();
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    document.title = `Edit Answer`;
  });

  useEffect(() => {
    if (authState.loading) return;
    const config = { url: `/answers/${ansid}`, method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setAnswer(data.answer));
  }, [fetchData, ansid, authState]);


  return (
    <>
      <MainLayout>
        <h2 className='mx-8 mt-6 mb-3 text-black dark:text-gray-200 font-semibold text-lg rounded-sm'>Edit Answer</h2>
        <EditAnswerForm answer={answer} />
      </MainLayout>
    </>
  )
}

export default EditAnswer