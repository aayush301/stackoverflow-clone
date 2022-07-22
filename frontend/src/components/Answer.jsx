import React, { useCallback, useEffect, useState } from 'react'
import SignupModal from '../components/modals/SignupModal';
import LoginModal from '../components/modals/LoginModal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useFetch from '../hooks/useFetch';
import { convertToXTimeAgo } from '../utils/date';
import { useNavigate } from 'react-router-dom';
import Popconfirm from './utils/Popconfirm';
import AnsActionIcons from './AnsActionIcons';

const Answer = ({ answer, question, onUpdateAnswer, highlight }) => {

  const authState = useSelector(state => state.authReducer);
  const [fetchData2] = useFetch();
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState(null);
  const [like, setLike] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [showPopConfirmAccept, setShowPopConfirmAccept] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);


  const isLoggedIn = authState.isLoggedIn;
  const isBookmarked = (bookmark !== null);
  const isLiked = (like !== null);
  const isOwnerOfAnswer = answer.answerer?._id === authState.user?._id;
  const isOwnerOfQuestion = question?.questioner?._id === authState.user?._id;

  const fetchBookmark = useCallback(async () => {
    if (!isLoggedIn || !answer._id) return;
    const config2 = { url: `/bookmarks/me?ansid=${answer._id}`, method: "get", headers: { Authorization: authState.token } };
    const { bookmark } = await fetchData2(config2, { showSuccessToast: false });
    if (bookmark) setBookmark(bookmark);
    else setBookmark(null);
  }, [answer, isLoggedIn, fetchData2, authState]);


  const fetchLikes = useCallback(async () => {
    if (!answer._id) return;
    const config2 = { url: `/likes/answers/${answer._id}`, method: "get", headers: { Authorization: authState.token } };
    const { likesCount, like } = await fetchData2(config2, { showSuccessToast: false });
    setLikesCount(likesCount);
    if (like) setLike(like);
    else setLike(null);
  }, [answer, fetchData2, authState]);


  useEffect(() => {
    fetchBookmark();
  }, [fetchBookmark]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);



  const handleEditIconClick = () => {
    navigate(`/answers/edit/${answer._id}`);
  }


  const handleAcceptIconClick = () => {
    if (answer.isAccepted) {
      return toast.info("You have already accepted this answer and can't revert this");
    }
    setShowPopConfirmAccept(true);
  }


  const handleConfirmAccept = () => {
    const config = { url: `/answers/${answer._id}/accept`, method: "put", headers: { Authorization: authState.token } };
    fetchData2(config).then(() => onUpdateAnswer(answer._id, { ...answer, isAccepted: true }));
    setShowPopConfirmAccept(false);
  }


  const handleBookmarkIconClick = async () => {
    if (!authState.isLoggedIn) {
      setLoginModal(true);
      return;
    }
    else if (!isBookmarked) {
      const config = { url: "/bookmarks", method: "post", data: { bookmarkType: "answer", answerId: answer._id }, headers: { Authorization: authState.token } };
      fetchData2(config, { showSuccessToast: false }).then(() => fetchBookmark());
    }
    else {
      const config = { url: `/bookmarks/${bookmark._id}`, method: "delete", headers: { Authorization: authState.token } };
      fetchData2(config, { showSuccessToast: false }).then(() => fetchBookmark());
    }
  }


  const handleLikeIconClick = async () => {
    if (!authState.isLoggedIn) {
      setLoginModal(true);
      return;
    }
    else if (!isLiked) {
      const config = { url: "/likes", method: "post", data: { type: "answer", answerId: answer._id }, headers: { Authorization: authState.token } };
      fetchData2(config, { showSuccessToast: false }).then(() => fetchLikes());
    }
    else {
      const config = { url: `/likes/${like._id}`, method: "delete", headers: { Authorization: authState.token } };
      fetchData2(config, { showSuccessToast: false }).then(() => fetchLikes());
    }
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
      <div id={answer._id} key={answer._id} className={`my-4 bg-gray-100 dark:bg-ui-dark-primary p-3 px-5 rounded-sm border-l-4 border-transparent ${answer.isAccepted ? "border-cyan-500" : ""} ${highlight ? "border-2 !border-sky-500 bg-sky-50" : ""}`}>
        {answer.isAccepted && (
          <div className='mb-2 text-cyan-500 font-semibold'> <i className="fa-solid fa-check"></i> Accepted</div>
        )}

        <div className='original-styles' dangerouslySetInnerHTML={{ __html: answer.text }}></div>
        <hr className='border-gray-300 dark:border-gray-500 mt-3 mb-2' />

        <div className='flex flex-col sm:flex-row'>
          <div>
            <AnsActionIcons
              answer={answer}
              isOwnerOfAnswer={isOwnerOfAnswer}
              isOwnerOfQuestion={isOwnerOfQuestion}
              isBookmarked={isBookmarked}
              isLiked={isLiked}
              likesCount={likesCount}
              handleEditIconClick={handleEditIconClick}
              handleAcceptIconClick={handleAcceptIconClick}
              handleBookmarkIconClick={handleBookmarkIconClick}
              handleLikeIconClick={handleLikeIconClick}
              handleCopyLinkIconClick={handleCopyLinkIconClick}
            />
          </div>

          <div className='sm:ml-auto'>
            <div>Answered {convertToXTimeAgo(answer.createdAt)} by {isOwnerOfAnswer ? "you" : answer.answerer?.name} </div>
          </div>
        </div>
      </div>

      <Popconfirm isOpen={showPopConfirmAccept} title='Are you sure to accept this? You want to able to unaccept after accepting once.' okText='Confirm' cancelText='Cancel' onConfirm={handleConfirmAccept} onCancel={() => setShowPopConfirmAccept(false)} />


      <SignupModal isModalOpen={signupModal} onClose={() => setSignupModal(false)} setLoginModal={setLoginModal} />
      <LoginModal isModalOpen={loginModal} onClose={() => setLoginModal(false)} setSignupModal={setSignupModal} />
    </>
  )
}

export default Answer