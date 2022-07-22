import React from 'react'
import { formatLargeNumber } from '../utils/largeNumber';
import Tooltip from './utils/Tooltip'

const AnsActionIcons = ({
  answer,
  isOwnerOfAnswer,
  isOwnerOfQuestion,
  isBookmarked,
  isLiked,
  likesCount,
  handleEditIconClick,
  handleAcceptIconClick,
  handleBookmarkIconClick,
  handleLikeIconClick,
  handleCopyLinkIconClick,
}) => {

  const arr1 = !isOwnerOfAnswer ? [] : [
    { title: "Edit", onClick: handleEditIconClick, icon: <i className="fa-solid fa-pen"></i> },
  ];

  const arr2 = !isOwnerOfQuestion ? [] : [
    { title: answer.isAccepted ? "Already accepted" : "Accept", onClick: handleAcceptIconClick, icon: !answer.isAccepted ? <i className="fa-regular fa-circle-check"></i> : <i className="fa-solid fa-circle-check"></i> },
  ];

  const arr3 = [
    { title: isBookmarked ? "Unbookmark" : "Bookmark", onClick: handleBookmarkIconClick, icon: !isBookmarked ? <i className="fa-regular fa-bookmark"></i> : <i className="fa-solid fa-bookmark"></i> },
    { title: isLiked ? "Remove like" : "Like", onClick: handleLikeIconClick, icon: !isLiked ? <i className="fa-regular fa-thumbs-up"></i> : <i className="fa-solid fa-thumbs-up"></i> },
  ];

  const arr4 = [
    { title: "Copy link", onClick: handleCopyLinkIconClick, icon: <i className="fa-solid fa-link"></i> },
  ];

  const arr123 = [].concat(arr1, arr2, arr3);


  return (
    <>
      <div className='flex flex-wrap items-center'>
        {arr123.map(({ title, onClick, icon }) => (
          <Tooltip key={title} text={title} position='top'>
            <button title={title} onClick={onClick} className="w-8 h-8 text-[#183153] dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#2c3e50] rounded-full transition focus:outline-blue-500">{icon}</button>
          </Tooltip>
        ))}

        {likesCount > 0 && (
          <span className='mr-2'>{formatLargeNumber(likesCount)}</span>
        )}

        {arr4.map(({ title, onClick, icon }) => (
          <Tooltip key={title} text={title} position='top'>
            <button title={title} onClick={onClick} className="w-8 h-8 text-[#183153] dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#2c3e50] rounded-full transition focus:outline-blue-500">{icon}</button>
          </Tooltip>
        ))}
      </div>
    </>
  )
}

export default AnsActionIcons