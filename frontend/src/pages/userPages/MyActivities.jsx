import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/utils/Loader';
import useFetch from '../../hooks/useFetch';
import MainLayout from '../../layouts/MainLayout';
import { convertToXTimeAgo } from '../../utils/date';


const activityEnum = {
  CREATED_QUESTION: 'CREATED_QUESTION',
  EDITED_QUESTION: 'EDITED_QUESTION',
  CREATED_ANSWER: 'CREATED_ANSWER',
  EDITED_ANSWER: 'EDITED_ANSWER',
  ACCEPTED_ANSWER: 'ACCEPTED_ANSWER',
  LIKED: 'LIKED',
  BOOKMARKED: 'BOOKMARKED',
}



const MyActivities = () => {
  const [fetchData, { loading }] = useFetch();
  const authState = useSelector(state => state.authReducer);
  const [activities, setActivities] = useState([]);


  useEffect(() => {
    if (authState.loading) return;
    document.title = `My Activities | ${authState.user?.name}`;
  }, [authState]);


  const fetchActivities = useCallback(async () => {
    const config = { url: "/activities/me", method: "get", headers: { Authorization: authState.token } };
    const { activities } = await fetchData(config, { showSuccessToast: false });
    setActivities(activities);
  }, [fetchData, authState]);


  useEffect(() => {
    if (authState.loading) return;
    fetchActivities();
  }, [authState, fetchActivities]);



  const renderActivity = activity => {
    switch (activity.activityType) {

      case activityEnum.CREATED_QUESTION: return (
        <>
          <div className='mb-2'>
            <span className='inline-block mr-2 bg-yellow-300 text-gray-800 dark:bg-inherit dark:text-yellow-500 px-2 py-1 font-semibold rounded-sm'>Asked a question</span>
            <span> <i className="fa-regular fa-clock"></i> {convertToXTimeAgo(activity.createdAt)}</span>
          </div>

          <div>
            <Link to={`/questions/${activity.question?.slug}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>{activity.question?.title}</Link>
          </div>
        </>
      );

      case activityEnum.EDITED_QUESTION: return (
        <>
          <div className='mb-2'>
            <span className='inline-block mr-2 bg-red-200 text-gray-800 dark:bg-inherit dark:text-red-200 px-2 py-1 font-semibold rounded-sm'>Updated a question</span>
            <span> <i className="fa-regular fa-clock"></i> {convertToXTimeAgo(activity.createdAt)}</span>
          </div>

          <div>
            <Link to={`/questions/${activity.question?.slug}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>{activity.question?.title}</Link>
          </div>
        </>
      );

      case activityEnum.CREATED_ANSWER: return (
        <>
          <div className='mb-2'>
            <span className='inline-block mr-2 bg-pink-500 text-white dark:bg-inherit dark:text-pink-500 px-2 py-1 font-semibold rounded-sm'>Answered a question</span>
            <span> <i className="fa-regular fa-clock"></i> {convertToXTimeAgo(activity.createdAt)}</span>
          </div>

          <div>
            <Link to={`/questions/${activity.answer.question?.slug}#${activity.answer._id}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>{activity.answer.question?.title}</Link>
          </div>
        </>
      );

      case activityEnum.EDITED_ANSWER: return (
        <>
          <div className='mb-2'>
            <span className='inline-block mr-2 bg-red-200 text-gray-800 dark:bg-inherit dark:text-red-200 px-2 py-1 font-semibold rounded-sm'>Edited an answer</span>
            <span> <i className="fa-regular fa-clock"></i> {convertToXTimeAgo(activity.createdAt)}</span>
          </div>

          <div>
            <Link to={`/questions/${activity.answer.question?.slug}#${activity.answer._id}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>{activity.answer.question?.title}</Link>
          </div>
        </>
      );

      case activityEnum.ACCEPTED_ANSWER: return (
        <>
          <div className='mb-2'>
            <span className='inline-block mr-2 bg-teal-500 text-white dark:bg-inherit dark:text-teal-500 px-2 py-1 font-semibold rounded-sm'>Accepted an answer</span>
            <span> <i className="fa-regular fa-clock"></i> {convertToXTimeAgo(activity.createdAt)}</span>
          </div>

          <div>
            <Link to={`/questions/${activity.answer.question?.slug}#${activity.answer._id}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>{activity.answer.question?.title}</Link>
          </div>
        </>
      );

      case activityEnum.BOOKMARKED: return (
        <>
          <div className='mb-2'>
            <span className='inline-block mr-2 bg-purple-300 text-gray-800 dark:bg-inherit dark:text-purple-500 px-2 py-1 font-semibold rounded-sm'>Bookmarked {activity.question ? "question" : "answer"}</span>
            <span> <i className="fa-regular fa-clock"></i> {convertToXTimeAgo(activity.createdAt)}</span>
          </div>

          <div>
            {activity.question ? (
              <Link to={`/questions/${activity.question?.slug}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>{activity.question?.title}</Link>
            ) : (
              <Link to={`/questions/${activity.answer.question?.slug}#${activity.answer._id}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>{activity.answer.question?.title}</Link>
            )}
          </div>
        </>
      );

      case activityEnum.LIKED: return (
        <>
          <div className='mb-2'>
            <span className='inline-block mr-2 bg-green-300 text-black dark:bg-inherit dark:text-green-200 px-2 py-1 font-semibold rounded-sm'>Liked {activity.question ? "question" : "answer"}</span>
            <span> <i className="fa-regular fa-clock"></i> {convertToXTimeAgo(activity.createdAt)}</span>
          </div>

          <div>
            {activity.question ? (
              <Link to={`/questions/${activity.question?.slug}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>{activity.question?.title}</Link>
            ) : (
              <Link to={`/questions/${activity.answer?.question?.slug}#${activity.answer?._id}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>{activity.answer?.question?.title}</Link>
            )}
          </div>
        </>
      );

      default: return (
        <>{activity.activityType}</>
      );
    }

  }


  return (
    <>
      <MainLayout>
        <div className='my-8 dark:text-gray-300'>
          <h2 className='mx-4 sm:mx-8 mb-3 dark:text-gray-300 font-semibold text-xl rounded-sm'> My Activites </h2>

          {loading ? (
            <div className='my-40'><Loader className='mx-auto' /></div>
          ) : (
            <>
              {activities.map(activity => (
                <div key={activity._id} className={`my-4 sm:mx-8 bg-gray-100 dark:bg-ui-dark-primary p-3 rounded-sm`}>
                  {renderActivity(activity)}
                </div>
              ))}
            </>
          )}

        </div>


      </MainLayout>
    </>
  )
}

export default MyActivities