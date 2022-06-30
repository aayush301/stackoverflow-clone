import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/utils/Loader';
import useFetch from '../../hooks/useFetch';
import MainLayout from '../../layouts/MainLayout';
import { convertToXTimeAgo } from '../../utils/date';

const UserDashboard = () => {

  const authState = useSelector(state => state.authReducer);
  const [fetchData, { loading }] = useFetch();
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    document.title = `Dashboard | ${authState.user?.name}`
  }, [authState.user]);


  useEffect(() => {
    const fetchDashboardData = async () => {
      const config = { url: "/dashboard", method: "get", headers: { Authorization: authState.token } };
      const { data } = await fetchData(config, { showSuccessToast: false });
      const { questionsCount, answersCount, bookmarksCount, recentQuestions, recentAnswers } = data;
      setDashboardData({ questionsCount, answersCount, bookmarksCount, recentQuestions, recentAnswers });
    }

    fetchDashboardData();
  }, [authState, fetchData]);

  const shadow = "shadow-[0_2px_6px_2px_rgb(60_64_67_/15%)]";
  const hovershadow = "hover:shadow-[0_8px_30px_rgba(0,0,0,.12)]";


  return (
    <>
      <MainLayout>
        <div className='m-8 flex flex-wrap justify-between items-center dark:text-gray-300 gap-4'>
          <h1 className='text-2xl'>Welcome {authState.user?.name}</h1>
          <Link to="/questions/ask" className='bg-brand hover:bg-brand-hover px-3 py-2 text-white font-semibold rounded-[3px]'>Ask Question</Link>
        </div>

        {loading ? (
          <div className='my-40'><Loader className='mx-auto' /></div>
        ) : (
          <>
            <div className='mb-16 text-gray-800 dark:text-gray-300'>
              <div className='flex flex-wrap mx-8 ml-16 my-8 gap-4 md:gap-12 lg:gap-16 text-lg'>

                {dashboardData.questionsCount > 0 && (
                  <div className={`w-[200px] text-center px-4 py-3 rounded-[3px] dark:bg-ui-dark-primary ${shadow} ${hovershadow} transition-shadow`}>
                    <div>
                      <span className='text-teal-600 text-5xl'>{dashboardData.questionsCount}</span>
                      <span className='ml-3 text-xl'>Questions</span>
                    </div>
                    <span>asked by you</span>
                  </div>
                )}

                {dashboardData.answersCount > 0 && (
                  <div className={`w-[200px] h-p[] text-center px-4 py-3 rounded-[3px] dark:bg-ui-dark-primary ${shadow} ${hovershadow} transition-shadow`}>
                    <div>
                      <span className='text-pink-600 text-5xl'>{dashboardData.answersCount}</span>
                      <span className='ml-3 text-xl'>Answers</span>
                    </div>
                    <span>given by you</span>
                  </div>
                )}

                {dashboardData.bookmarksCount > 0 && (
                  <div className={`w-[200px] h-p[] text-center px-4 py-3 rounded-[3px] dark:bg-ui-dark-primary ${shadow} ${hovershadow} transition-shadow`}>
                    <div>
                      <span className='text-purple-600 text-5xl'>{dashboardData.bookmarksCount}</span>
                      <span className='ml-3 text-xl'>Bookmarks</span>
                    </div>
                    <span>saved by you</span>
                  </div>
                )}
              </div>


              <div className='mx-3 sm:mx-16 my-16 flex flex-col sm:flex-row justify-around gap-3 text-center text-lg font-semibold'>
                <Link to="/questions" className='text-purple-500'>View all questions posted by public <i className="ml-1 transition fa-solid fa-angle-right"></i></Link>
                <Link to="/activities/me" className='text-teal-500'>See your all activities <i className="ml-1 transition fa-solid fa-angle-right"></i> </Link>
                <Link to="/answers/me" className='text-red-500'>View answers by you <i className="ml-1 transition fa-solid fa-angle-right"></i></Link>
                <Link to="/profile" className='text-sky-500'>View Profile <i className="ml-1 transition fa-solid fa-angle-right"></i> </Link>
              </div>

              <div className='flex flex-col sm:flex-row md:justify-evenly gap-3'>
                {dashboardData.recentQuestions?.length > 0 && (
                  <div className='mb-5 w-full sm:w-[450px] text-[18px] bg-gray-50 dark:bg-ui-dark-primary px-4 py-4 rounded-[3px]'>
                    <h3 className='mb-4 text-gray-600 dark:text-inherit text-center text-xl font-semibold'>Recent Questions by you</h3>
                    {dashboardData.recentQuestions?.map(question => (
                      <div key={question._id} className='my-1 flex justify-between'>
                        <div className='max-w-[300px] text-blue-800 dark:text-blue-200 whitespace-nowrap overflow-ellipsis overflow-hidden inline-'>
                          <Link to={`/questions/${question.slug}`}>{question.title}</Link>
                        </div>
                        <span>{convertToXTimeAgo(question.createdAt)}</span>
                      </div>
                    ))}
                  </div>
                )}

                {dashboardData.recentAnswers?.length > 0 && (
                  <div className='mb-5 w-full sm:w-[450px] text-[18px] bg-gray-50 dark:bg-ui-dark-primary px-4 py-4 rounded-[3px]'>
                    <h3 className='mb-4 text-gray-600 dark:text-inherit text-center text-xl font-semibold'>Recent Answers by you</h3>
                    {dashboardData.recentAnswers?.map(answer => (
                      <div key={answer._id} className='my-1 flex justify-between'>
                        <div className='max-w-[300px] text-blue-800 dark:text-blue-200 whitespace-nowrap overflow-ellipsis overflow-hidden inline-'>
                          <Link to={`/questions/${answer.question?.slug}#${answer._id}`}>{answer.question?.title}</Link>
                        </div>
                        <span>{convertToXTimeAgo(answer.createdAt)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>


            </div>
          </>
        )}
      </MainLayout>
    </>
  )
}

export default UserDashboard