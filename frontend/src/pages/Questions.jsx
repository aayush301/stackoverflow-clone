import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import QuestionFilters from '../components/QuestionFilters';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import { convertToXTimeAgo } from '../utils/date';

const Questions = () => {

  const authState = useSelector(state => state.authReducer);
  const [fetchData, { loading }] = useFetch();
  const [questions, setQuestions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const currSearchParams = Object.fromEntries([...searchParams]);
  const { answerFilter } = currSearchParams;


  useEffect(() => {
    document.title = `${loading ? "Loading..." : "Questions"}`
  }, [loading]);


  useEffect(() => {

    if (authState.loading) return;
    const fetchQuestions = async () => {
      const config = { url: "/questions", method: "get", params: { answerFilter } };
      const { questions } = await fetchData(config, { showSuccessToast: false });
      setQuestions(questions);
    }

    fetchQuestions();
  }, [authState, fetchData, answerFilter]);

  return (
    <>
      <MainLayout>
        <div className='my-8 mb-32 text-gray-800 dark:text-gray-300'>

          {loading ? (
            <div className='my-40'><Loader className='mx-auto' /></div>
          ) : (
            <>
              <h1 className='mx-4 mb-4 sm:mx-8 text-gray-800 dark:text-gray-300 text-2xl font-semibold'>All Questions</h1>

              <QuestionFilters searchParams={searchParams} setSearchParams={setSearchParams} />

              <div className='sm:mx-8 mt-8 text-[17px]'>
                {questions.map((question, index) => (
                  <div key={question._id} className={`my-4 bg-gray-100 dark:bg-ui-dark-primary p-3 rounded-sm`}>
                    <div>
                      <Link to={`/questions/${question.slug}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>#{index + 1}: {question.title}</Link>
                    </div>

                    <div className='flex flex-col sm:flex-row justify-between text-sm sm:text-base'>
                      <div>
                        {question.ansCount ? (
                          <span className='text-green-500 font-semibold'>{question.ansCount} Answers</span>
                        ) : (
                          <span className='text-gray-600 dark:text-gray-300'>No Answers</span>
                        )}
                        {question.acceptedAnsCount > 0 && (
                          <span className='mx-4 text-pink-500 font-semibold'>{question.acceptedAnsCount} accepted</span>
                        )}
                      </div>
                      <div>
                        <span className='ml-auto dark:text-gray-300'>asked {convertToXTimeAgo(question.createdAt)} by {question.questioner.name}</span>
                      </div>

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

export default Questions