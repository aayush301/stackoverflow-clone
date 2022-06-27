import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/utils/Loader';
import useFetch from '../../hooks/useFetch';
import MainLayout from '../../layouts/MainLayout';
import { convertToXTimeAgo } from '../../utils/date';

const MyLikes = () => {
  const [fetchData, { loading }] = useFetch();
  const authState = useSelector(state => state.authReducer);
  const [likes, setLikes] = useState([]);


  useEffect(() => {
    if (authState.loading) return;
    document.title = `My Likes | ${authState.user?.name}`;
  }, [authState]);


  const fetchLikes = useCallback(async () => {
    const config = { url: "/likes/me", method: "get", headers: { Authorization: authState.token } };
    const { likes } = await fetchData(config, { showSuccessToast: false });
    setLikes(likes);
  }, [fetchData, authState]);


  useEffect(() => {
    if (authState.loading) return;
    fetchLikes();
  }, [authState, fetchLikes]);


  return (
    <>
      <MainLayout>
        <div className='my-8 dark:text-gray-300'>
          <h2 className='mx-4 sm:mx-8 mb-3 dark:text-gray-300 font-semibold text-xl rounded-sm'> My Likes </h2>

          {loading ? (
            <div className='my-40'><Loader className='mx-auto' /></div>
          ) : (
            <>
              <h4 className='mx-4 sm:mx-8 text-gray-800 dark:text-gray-300 text-lg'>{likes.length} likes</h4>
              <div className='sm:mx-8 text-[17px]'>
                {likes.map((like, index) => (
                  like.type === "question" ? (
                    <div key={like.question._id} className={`my-4 bg-gray-100 dark:bg-ui-dark-primary p-3 rounded-sm`}>
                      <div>
                        <Link to={`/questions/${like.question.slug}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>#{index + 1}: {like.question.title}</Link>
                      </div>

                      <div className='flex flex-col sm:flex-row justify-between text-sm sm:text-base'>
                        <div> Question | Liked {convertToXTimeAgo(like.createdAt)} </div>
                        <span className='ml-auto dark:text-gray-300'>asked {convertToXTimeAgo(like.question.createdAt)} by {like.question.questioner.name}</span>
                      </div>
                    </div>

                  ) : (

                    <div key={like._id} className={`my-4 bg-gray-100 dark:bg-ui-dark-primary p-3 rounded-sm`}>
                      <div>
                        <Link to={`/questions/${like.answer.question.slug}#${like.answer._id}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>#{index + 1}: {like.answer.question?.title}</Link>
                      </div>

                      <div className='flex flex-col sm:flex-row justify-between text-sm sm:text-base'>
                        <div> Answer | Liked {convertToXTimeAgo(like.createdAt)} </div>
                        <span className='dark:text-gray-300'>answered {convertToXTimeAgo(like.answer.createdAt)} by {like.answer.answerer.name}</span>
                      </div>
                    </div>
                  )

                ))}
              </div>
            </>
          )}

        </div>


      </MainLayout>
    </>
  )
}

export default MyLikes