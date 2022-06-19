import React from 'react'
import Tooltip from './utils/Tooltip'

const QActionIcons = ({
  isOwnerOfQuestion,
  isBookmarked,
  handleEditIconClick,
  handleBookmarkIconClick,
  handleAnswerIconClick,
  handleDownloadIconClick,
  handleCopyLinkIconClick,
  handleShareIconClick
}) => {

  const arr1 = !isOwnerOfQuestion ? [] : [
    { title: "Edit", onClick: handleEditIconClick, icon: <i className="fa-solid fa-pen"></i> },
  ];

  const arr2 = [
    { title: "Bookmark", onClick: handleBookmarkIconClick, icon: !isBookmarked ? <i className="fa-regular fa-bookmark"></i> : <i className="fa-solid fa-bookmark"></i> },
    { title: "Like", icon: <i className="fa-regular fa-thumbs-up"></i> },
  ];

  const arr3 = isOwnerOfQuestion ? [] : [
    { title: "Answer", onClick: handleAnswerIconClick, icon: <i className="fa-solid fa-reply"></i> },
  ];

  const arr4 = [
    { title: "Download", onClick: handleDownloadIconClick, icon: <i className="fa-solid fa-download"></i> },
    { title: "Copy link", onClick: handleCopyLinkIconClick, icon: <i className="fa-solid fa-link"></i> },
    { title: "Share", onClick: handleShareIconClick, icon: <i className="fa-solid fa-share-nodes"></i> },
  ];

  const arr = [].concat(arr1, arr2, arr3, arr4);


  return (
    <>
      <div className='flex flex-wrap my-2'>
        {arr.map(({ title, onClick, icon }) => (
          <Tooltip key={title} text={title} position='top'>
            <button title={title} onClick={onClick} className="w-8 h-8 text-[#183153] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2c3e50] rounded-full transition focus:outline-blue-500">{icon}</button>
          </Tooltip>
        ))}
      </div>
    </>
  )
}

export default QActionIcons