import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../../components/utils/Loader';
import useFetch from '../../hooks/useFetch';
import MainLayout from '../../layouts/MainLayout';
import { convertToXTimeAgo } from '../../utils/date';

const MyBookmarks = () => {
  const [fetchData, { loading }] = useFetch();
  const [fetchData2] = useFetch();
  const authState = useSelector(state => state.authReducer);
  const [bookmarks, setBookmarks] = useState([]);
  const [dirty, setDirty] = useState(false);


  useEffect(() => {
    if (authState.loading) return;
    document.title = `My Bookmarks | ${authState.user?.name}`;
  }, [authState]);


  const fetchBookmarks = useCallback(async () => {
    const config = { url: "/bookmarks/me", method: "get", headers: { Authorization: authState.token } };
    const { bookmarks } = await fetchData(config, { showSuccessToast: false });
    setBookmarks(bookmarks);
  }, [fetchData, authState]);


  useEffect(() => {
    if (authState.loading) return;
    fetchBookmarks();
  }, [authState, fetchBookmarks]);


  const toggleBookmark = async (id) => {
    setDirty(true);
    const bookmark = bookmarks.find(bookmark => bookmark._id === id);
    const type = bookmark.bookmarkType;

    if (bookmark.isBookmarked === undefined || bookmark.isBookmarked === true) {
      const config = { url: `/bookmarks/${id}`, method: "delete", headers: { Authorization: authState.token } };
      fetchData2(config, { showSuccessToast: false }).then(() => setBookmarks(bookmarks.map(bookmark => {
        if (bookmark._id !== id) return bookmark;
        return { ...bookmark, isBookmarked: false }
      })));
    }
    else {
      const config = type === "question" ?
        { url: "/bookmarks", method: "post", data: { bookmarkType: type, questionId: bookmark.question._id }, headers: { Authorization: authState.token } } :
        { url: "/bookmarks", method: "post", data: { bookmarkType: type, answerId: bookmark.answer._id }, headers: { Authorization: authState.token } };
      fetchData2(config, { showSuccessToast: false }).then((data) => setBookmarks(bookmarks.map(bookmark => {
        if (bookmark._id !== id) return bookmark;
        return { ...bookmark, _id: data.bookmark._id, isBookmarked: true }
      })));
    }
  }

  const refreshBookmarks = () => {
    fetchBookmarks();
    setDirty(false);
  }


  const questionBookmarks = bookmarks.filter(bookmark => bookmark.bookmarkType === "question");
  const answerBookmarks = bookmarks.filter(bookmark => bookmark.bookmarkType === "answer");

  // Note: bookmark.isBookmarked is not contained in data fetched from api (since bookmark is bookmarked itself ofcourse).
  // It is used in client side only to just change current state of bookmarks after toggling bookmarks with api
  // so that user can toggle the bookmark back if he wants.

  return (
    <>
      <MainLayout>
        <div className='my-8'>
          <h2 className='mx-4 sm:mx-8 mb-3 dark:text-gray-300 font-semibold text-xl rounded-sm'>
            My Bookmarks
            {dirty && (
              <button onClick={refreshBookmarks} title='Refresh' className='ml-2 w-8 h-8 text-[#183153] text-base dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2c3e50] rounded-full transition focus:outline-blue-500'>
                <i className="fa-solid fa-arrow-rotate-right"></i>
              </button>
            )}
          </h2>


          {loading ? (
            <div className='my-40'><Loader className='mx-auto' /></div>
          ) : (
            <>
              {questionBookmarks.length > 0 && (
                <>
                  <h4 className='mx-4 sm:mx-8 text-gray-800 dark:text-gray-300 text-lg'>{questionBookmarks.length} Question bookmarks</h4>
                  <div className='sm:mx-8 text-[17px]'>
                    {questionBookmarks.map((bookmark, index) => (
                      <div key={bookmark.question._id} className={`my-4 bg-gray-100 dark:bg-ui-dark-primary p-3 rounded-sm`}>
                        <div>
                          <Link to={`/questions/${bookmark.question.slug}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>#{index + 1}: {bookmark.question.title}</Link>
                        </div>

                        <div className='flex flex-col sm:flex-row justify-between text-sm sm:text-base'>
                          <div>

                            <button onClick={() => toggleBookmark(bookmark._id)} className="w-8 h-8 text-[#183153] dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#2c3e50] rounded-full transition focus:outline-blue-500">
                              {(bookmark.isBookmarked === undefined || bookmark.isBookmarked === true) ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}
                            </button>

                            {bookmark.question.ansCount ? (
                              <span className='text-green-500 font-semibold'>{bookmark.question.ansCount} Answers</span>
                            ) : (
                              <span className='text-gray-600 dark:text-gray-300'>No Answers</span>
                            )}
                            {bookmark.question.acceptedAnsCount > 0 && (
                              <span className='mx-4 text-pink-500 font-semibold'>{bookmark.question.acceptedAnsCount} accepted</span>
                            )}
                          </div>
                          <div>
                            <span className='ml-auto dark:text-gray-300'>asked {convertToXTimeAgo(bookmark.question.createdAt)} by {bookmark.question.questioner.name}</span>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}


              {answerBookmarks.length > 0 && (
                <>
                  <h4 className='mx-4 mt-16 sm:mx-8 text-gray-800 dark:text-gray-300 text-lg'>{answerBookmarks.length} Answer bookmarks</h4>
                  <div className='sm:mx-8 text-[17px]'>
                    {answerBookmarks.map((bookmark, index) => (
                      <div key={bookmark._id} className={`my-4 bg-gray-100 dark:bg-ui-dark-primary p-3 rounded-sm`}>
                        <div>
                          <Link to={`/questions/${bookmark.answer.question.slug}#${bookmark.answer._id}`} className='font-semibold text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500'>#{index + 1}: {bookmark.answer.question?.title}</Link>
                        </div>

                        <div className='flex flex-col sm:flex-row justify-between text-sm sm:text-base'>
                          <div>
                            <button onClick={() => toggleBookmark(bookmark._id)} className="w-8 h-8 text-[#183153] dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#2c3e50] rounded-full transition focus:outline-blue-500">
                              {(bookmark.isBookmarked === undefined || bookmark.isBookmarked === true) ? <i className="fa-solid fa-bookmark"></i> : <i className="fa-regular fa-bookmark"></i>}
                            </button>
                            {bookmark.answer.isAccepted && <span className='text-pink-500'>Accepted</span>}
                          </div>

                          <span className='dark:text-gray-300'>answered {convertToXTimeAgo(bookmark.answer.createdAt)} by {bookmark.answer.answerer.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

        </div>


      </MainLayout>
    </>
  )
}

export default MyBookmarks