import React, { useCallback, useEffect, useState } from 'react'
import SignupModal from '../components/modals/SignupModal';
import LoginModal from '../components/modals/LoginModal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useFetch from '../hooks/useFetch';
import Tooltip from './utils/Tooltip';
import { convertToXTimeAgo } from '../utils/date';
import ShareIcons from './ShareIcons';
import { useNavigate } from 'react-router-dom';

const Answer = ({ answer, highlight }) => {

  const authState = useSelector(state => state.authReducer);
  const [fetchData2] = useFetch();
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState(null);
  const [showShareIcons, setShowShareIcons] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);


  const isLoggedIn = authState.isLoggedIn;
  const isBookmarked = (bookmark !== null);
  const isOwnerOfAnswer = answer.answerer?._id === authState.user?._id;


  const fetchBookmark = useCallback(async () => {
    if (!isLoggedIn || !answer._id) return;
    const config2 = { url: `/bookmarks?ansid=${answer._id}`, method: "get", headers: { Authorization: authState.token } };
    const { bookmark } = await fetchData2(config2, { showSuccessToast: false });
    if (bookmark) setBookmark(bookmark);
    else setBookmark(null);
  }, [answer, isLoggedIn, fetchData2, authState]);


  useEffect(() => {
    fetchBookmark();
  }, [fetchBookmark]);



  const handleEditIconClick = () => {
    navigate(`/answers/edit/${answer._id}`);
  }

  const handleBookmarkIconClick = async () => {
    if (!authState.isLoggedIn) {
      setLoginModal(true);
      return;
    }
    else if (!isBookmarked) {
      const config = { url: "/bookmarks", method: "post", data: { bookmarkType: "answer", answerId: answer._id }, headers: { Authorization: authState.token } };
      fetchData2(config).then(() => fetchBookmark());
    }
    else {
      const config = { url: `/bookmarks/${bookmark._id}`, method: "delete", headers: { Authorization: authState.token } };
      fetchData2(config).then(() => fetchBookmark());
    }
  }

  const handleShareIconClick = () => {
    setShowShareIcons(!showShareIcons);
  }

  const shareableLink = window.location.href.split("#")[0] + "#" + answer._id;
  const handleCopyLinkIconClick = async () => {
    try {
      await navigator.clipboard.writeText(shareableLink);
      toast.success("Copied to clipboard", { theme: localStorage.getItem("theme") || "light" });
    } catch (err) {
      toast.error('Failed to copy!', { theme: localStorage.getItem("theme") || "light" });
    }
  }


  return (
    <>
      <div id={answer._id} key={answer._id} className={`my-4 bg-gray-100 dark:bg-ui-dark-primary p-3 px-5 rounded-sm ${highlight ? "border-2 border-sky-500 bg-sky-50" : ""}`}>
        <div className='original-styles' dangerouslySetInnerHTML={{ __html: answer.text }}></div>
        <hr className='border-gray-300 dark:border-gray-500 mt-3 mb-2' />

        <div className='flex flex-col sm:flex-row'>
          <div>
            <div>
              {[].concat(!isOwnerOfAnswer ? [] : [
                { title: "Edit", onClick: handleEditIconClick, icon: <i className="fa-solid fa-pen"></i> },
                // { title: "Accept", onClick: handleAcceptIconClick, icon: <i className="fa-solid fa-check"></i> },
              ], [
                { title: "Bookmark", onClick: handleBookmarkIconClick, icon: !isBookmarked ? <i className="fa-regular fa-bookmark"></i> : <i className="fa-solid fa-bookmark"></i> },
                { title: "Like", icon: <i className="fa-regular fa-thumbs-up"></i> },
                { title: "Copy link", onClick: handleCopyLinkIconClick, icon: <i className="fa-solid fa-link"></i> },
                { title: "Share", onClick: handleShareIconClick, icon: <i className="fa-solid fa-share-nodes"></i> },

              ]).map(({ title, onClick, icon }) => (
                <Tooltip key={title} text={title} position='top'>
                  <button title={title} data-effect="solid" data-event-off="onmouseleave" onClick={onClick} className="w-8 h-8 text-[#183153] dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#2c3e50] rounded-full transition focus:outline-blue-500">{icon}</button>
                </Tooltip>
              ))}
            </div>
            <ShareIcons showShareIcons={showShareIcons} link={shareableLink} />
          </div>

          <div className='sm:ml-auto'>
            <div>Answered {convertToXTimeAgo(answer.createdAt)} by {isOwnerOfAnswer ? "you" : answer.answerer?.name} </div>
            {answer.createdAt !== answer.updatedAt && (
              <div>updated {convertToXTimeAgo(answer.updatedAt)} by {isOwnerOfAnswer ? "you" : answer.answerer?.name} </div>
            )}
          </div>
        </div>
      </div>

      <SignupModal isModalOpen={signupModal} onClose={() => setSignupModal(false)} setLoginModal={setLoginModal} />
      <LoginModal isModalOpen={loginModal} onClose={() => setLoginModal(false)} setSignupModal={setSignupModal} />
    </>
  )
}

export default Answer