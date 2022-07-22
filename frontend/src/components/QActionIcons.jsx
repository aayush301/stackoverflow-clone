import React from 'react'
import { formatLargeNumber } from '../utils/largeNumber';
import Tooltip from './utils/Tooltip'

const QActionIcons = ({
  isOwnerOfQuestion,
  isBookmarked,
  isLiked,
  likesCount,
  handleEditIconClick,
  handleBookmarkIconClick,
  handleLikeIconClick,
  handleAnswerIconClick,
  handleDownloadIconClick,
  handleCopyLinkIconClick,
}) => {

  const arr1 = !isOwnerOfQuestion ? [] : [
    { title: "Edit", onClick: handleEditIconClick, icon: <i className="fa-solid fa-pen"></i> },
  ];

  const arr2 = [
    { title: isBookmarked ? "Unbookmark" : "Bookmark", onClick: handleBookmarkIconClick, icon: !isBookmarked ? <i className="fa-regular fa-bookmark"></i> : <i className="fa-solid fa-bookmark"></i> },
    { title: isLiked ? "Remove like" : "Like", onClick: handleLikeIconClick, icon: !isLiked ? <i className="fa-regular fa-thumbs-up"></i> : <i className="fa-solid fa-thumbs-up"></i> },
  ];

  const arr3 = isOwnerOfQuestion ? [] : [
    { title: "Answer", onClick: handleAnswerIconClick, icon: <i className="fa-solid fa-reply"></i> },
  ];

  const arr4 = [
    { title: "Download", onClick: handleDownloadIconClick, icon: <i className="fa-solid fa-download"></i> },
    { title: "Copy link", onClick: handleCopyLinkIconClick, icon: <i className="fa-solid fa-link"></i> },
  ];

  const arr12 = [].concat(arr1, arr2);
  const arr34 = [].concat(arr3, arr4);


  return (
    <>
      <div className='flex flex-wrap items-center my-2'>
        {arr12.map(({ title, onClick, icon }) => (
          <Tooltip key={title} text={title} position='top'>
            <button title={title} onClick={onClick} className="w-8 h-8 text-[#183153] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2c3e50] rounded-full transition focus:outline-blue-500">{icon}</button>
          </Tooltip>
        ))}

        {likesCount > 0 && (
          <span className='mr-2'>{formatLargeNumber(likesCount)}</span>
        )}

        {arr34.map(({ title, onClick, icon }) => (
          <Tooltip key={title} text={title} position='top'>
            <button title={title} onClick={onClick} className="w-8 h-8 text-[#183153] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2c3e50] rounded-full transition focus:outline-blue-500">{icon}</button>
          </Tooltip>
        ))}
      </div>
    </>
  )
}

export default QActionIcons