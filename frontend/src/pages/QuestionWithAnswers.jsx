import React, { useCallback, useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostAnswerForm from '../components/forms/PostAnswerForm';
import Loader from '../components/utils/Loader';
import useFetch from '../hooks/useFetch';
import MainLayout from '../layouts/MainLayout';
import { convertToXTimeAgo } from '../utils/date';
import generateQWithAnsPdf from '../utils/pdf';
import QWithAnsPdf from '../utils/QWithAnsPdf';
import SignupModal from '../components/modals/SignupModal';
import LoginModal from '../components/modals/LoginModal';
import Answer from '../components/Answer';
import QActionIcons from '../components/QActionIcons';

const QuestionWithAnswers = () => {

  const authState = useSelector(state => state.authReducer);
  const [fetchData, { loading }] = useFetch();
  const [fetchData2] = useFetch();
  const params = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [bookmark, setBookmark] = useState(null);
  const [like, setLike] = useState(null);
  const [likesCount, setLikesCount] = useState(0);
  const [isAnswerFormOpen, setIsAnswerFormOpen] = useState(false);
  const [isAnswerListVisible, setIsAnswerListVisible] = useState(true);
  const postAnswerRef = useRef();
  const { hash } = useLocation();
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);


  const isLoggedIn = authState.isLoggedIn;
  const isOwnerOfQuestion = question.questioner?._id === authState.user?._id;
  const isBookmarked = (bookmark !== null);
  const isLiked = (like !== null);

  useEffect(() => {
    document.title = `${loading ? "Loading..." : question.title}`
  }, [loading, question]);

  useEffect(() => {
    if (hash === "") return;
    setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 500);
  }, [hash]);

  const handleUpdateAnswer = (id, answer) => {
    const answersCopy = [...answers];
    const ind = answersCopy.findIndex(ans => ans._id === id);
    answersCopy[ind] = answer;
    setAnswers(answersCopy);
  }



  const fetchQuestionWithAnswers = useCallback(async () => {
    try {
      const config = { url: `/questions/byslug/${params.qslug}`, method: "get" };
      const data = await fetchData(config, { showSuccessToast: false, showErrorToast: false });
      setQuestion(data.question);
      setAnswers(data.answers);
    }
    catch (err) {
      navigate("/questions");
    }
  }, [fetchData, params.qslug, navigate]);


  const fetchBookmark = useCallback(async () => {
    if (!isLoggedIn || !question._id) return;
    const config2 = { url: `/bookmarks/me?qid=${question._id}`, method: "get", headers: { Authorization: authState.token } };
    const { bookmark } = await fetchData2(config2, { showSuccessToast: false });
    if (bookmark) setBookmark(bookmark);
    else setBookmark(null);
  }, [question, isLoggedIn, fetchData2, authState]);


  const fetchLikes = useCallback(async () => {
    if (!question._id) return;
    const config2 = { url: `/likes/questions/${question._id}`, method: "get", headers: { Authorization: authState.token } };
    const { likesCount, like } = await fetchData2(config2, { showSuccessToast: false });
    setLikesCount(likesCount);
    if (like) setLike(like);
    else setLike(null);
  }, [question, fetchData2, authState]);



  useEffect(() => {
    fetchQuestionWithAnswers();
  }, [fetchQuestionWithAnswers]);

  useEffect(() => {
    fetchBookmark();
  }, [fetchBookmark]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);


  const handlePostAnswerSuccess = () => {
    fetchQuestionWithAnswers();
  }


  const handleEditIconClick = () => {
    navigate(`/questions/edit/${question._id}`);
  }

  const handleBookmarkIconClick = async () => {
    if (!authState.isLoggedIn) {
      setLoginModal(true);
      return;
    }
    else if (!isBookmarked) {
      const config = { url: "/bookmarks", method: "post", data: { bookmarkType: "question", questionId: question._id }, headers: { Authorization: authState.token } };
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
      const config = { url: "/likes", method: "post", data: { type: "question", questionId: question._id }, headers: { Authorization: authState.token } };
      fetchData2(config, { showSuccessToast: false }).then(() => fetchLikes());
    }
    else {
      const config = { url: `/likes/${like._id}`, method: "delete", headers: { Authorization: authState.token } };
      fetchData2(config, { showSuccessToast: false }).then(() => fetchLikes());
    }
  }

  const handleCopyLinkIconClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Copied to clipboard", { theme: localStorage.getItem("theme") || "light" });
    } catch (err) {
      toast.error('Failed to copy!', { theme: localStorage.getItem("theme") || "light" });
    }
  }

  const handleDownloadIconClick = () => {
    generateQWithAnsPdf(question, answers);
  }

  const handleAnswerIconClick = () => {
    setIsAnswerFormOpen(true);
    setTimeout(() => {
      postAnswerRef.current.scrollIntoView({ block: "center" });
    }, 10);
  }


  return (
    <>
      <MainLayout>
        <div className='my-8 mb-32 text-gray-800 dark:text-gray-300'>

          {loading ? (
            <div className='my-40'><Loader className='mx-auto' /></div>
          ) : (
            <>
              <div className='mx-4 sm:mx-8'>
                <h2 className='text-2xl'>{question.title}</h2>
                <div>Asked {convertToXTimeAgo(question.createdAt)} by {isOwnerOfQuestion ? "you" : question.questioner?.name}</div>
                {question.createdAt !== question.updatedAt && (
                  <div>updated {convertToXTimeAgo(question.updatedAt)} by {isOwnerOfQuestion ? "you" : question.questioner?.name}</div>
                )}


                <QActionIcons
                  isOwnerOfQuestion={isOwnerOfQuestion}
                  isBookmarked={isBookmarked}
                  isLiked={isLiked}
                  likesCount={likesCount}
                  handleEditIconClick={handleEditIconClick}
                  handleBookmarkIconClick={handleBookmarkIconClick}
                  handleLikeIconClick={handleLikeIconClick}
                  handleAnswerIconClick={handleAnswerIconClick}
                  handleDownloadIconClick={handleDownloadIconClick}
                  handleCopyLinkIconClick={handleCopyLinkIconClick}
                />
              </div>

              <div className='mt-4 mb-8 sm:mx-8 bg-gray-100 dark:bg-ui-dark-primary p-4 rounded-sm'>
                <div className='original-styles' dangerouslySetInnerHTML={{ __html: question.body }}></div>
              </div>
              <hr className='sm:mx-8' />


              {!isOwnerOfQuestion && (
                <div ref={postAnswerRef}>
                  <button onClick={() => setIsAnswerFormOpen(!isAnswerFormOpen)} className='my-2 mx-4 sm:mx-8 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 font-semibold text-white rounded-[3px]'>
                    <i className={`fa-solid fa-angle-down transition-all ${isAnswerFormOpen ? "rotate-180" : ""}`}></i>
                    <span className='ml-2'>Add your Answer</span>
                  </button>
                  <div className={`sm:mx-8 overflow-hidden ${!isAnswerFormOpen ? "max-h-0" : ""}`}>
                    <PostAnswerForm questionId={question._id} onSuccessPost={handlePostAnswerSuccess} />
                  </div>
                </div>
              )}


              <button onClick={() => setIsAnswerListVisible(!isAnswerListVisible)} className='my-2 mx-4 sm:mx-8 px-4 py-2 bg-emerald-400 hover:bg-emerald-500 font-semibold dark:text-black text-white rounded-[3px]'>
                <i className={`fa-solid fa-angle-down transition-all ${isAnswerListVisible ? "rotate-180" : ""}`}></i>
                <span className='ml-2'>{answers.length} Answers</span>
              </button>

              <div className={`sm:mx-8 ${isAnswerListVisible ? "" : "hidden"}`}>
                {answers.map(answer => (
                  <Answer key={answer._id} answer={answer} question={question} onUpdateAnswer={handleUpdateAnswer} highlight={hash.slice(1) === answer._id} />
                ))}
              </div>
            </>
          )}

        </div>


        <SignupModal isModalOpen={signupModal} onClose={() => setSignupModal(false)} setLoginModal={setLoginModal} />
        <LoginModal isModalOpen={loginModal} onClose={() => setLoginModal(false)} setSignupModal={setSignupModal} />

        {!loading && <div className="hidden"><QWithAnsPdf question={question} answers={answers} /> </div>}

      </MainLayout>
    </>
  )
}

export default QuestionWithAnswers