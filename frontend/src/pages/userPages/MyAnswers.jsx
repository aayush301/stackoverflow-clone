import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/utils/Loader';
import useFetch from '../../hooks/useFetch';
import MainLayout from '../../layouts/MainLayout';
import { convertToXTimeAgo } from '../../utils/date';

const MyAnswers = () => {
  const [fetchData, { loading }] = useFetch();
  const authState = useSelector(state => state.authReducer);
  const [answers, setAnswers] = useState([]);


  useEffect(() => {
    if (authState.loading) return;
    document.title = `My Answers | ${authState.user?.name}`;
  }, [authState]);


  useEffect(() => {

    if (authState.loading) return;
    const fetchAnswers = async () => {
      const config = { url: "/answers/me", method: "get", headers: { Authorization: authState.token } };
      const { answers } = await fetchData(config, { showSuccessToast: false });
      setAnswers(answers);
    }

    fetchAnswers();
  }, [authState, fetchData]);


  return (
    <>
      <MainLayout>
        <div className='my-8'>
          <h2 className='mx-4 sm:mx-8 mb-3 dark:text-gray-300 font-semibold text-xl rounded-sm'>Answers by me</h2>

          {loading ? (
            <div className='my-40'><Loader className='mx-auto' /></div>
          ) : (
            <>
              <h4 className='mx-4 sm:mx-8 text-emerald-400 dark:text-gray-300 text-lg font-semibold'>{answers.length} Answers</h4>
              <div className='sm:mx-8 text-[17px]'>
                {answers.map((answer, index) => (
                  <div key={answer._id} className={`my-4 bg-gray-100 dark:bg-ui-dark-primary p-3 rounded-sm`}>
                    <div>
                      <Link to={`/questions/${answer.question?.slug}#${answer._id}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>#{index + 1}: {answer.question?.title}</Link>
                    </div>

                    <div className='flex flex-col sm:flex-row justify-between'>
                      {answer.isAccepted && <span className='text-pink-500'>Accepted</span>}
                      <span className='ml-auto dark:text-gray-300'>answered {convertToXTimeAgo(answer.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>


      </MainLayout>
    </>
  )
}

export default MyAnswers