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
import { Facebook, Linkedin, Mail, Telegram, Twitter, Whatsapp } from 'react-social-sharing'
import Popconfirm from '../components/utils/Popconfirm';
import Tooltip from '../components/utils/Tooltip';
import SignupModal from '../components/modals/SignupModal';
import LoginModal from '../components/modals/LoginModal';
import Answer from '../components/Answer';

const QuestionWithAnswers = () => {

  const authState = useSelector(state => state.authReducer);
  const [fetchData, { loading }] = useFetch();
  const [fetchData2] = useFetch();
  const params = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [bookmark, setBookmark] = useState(null);
  const [isAnswerFormOpen, setIsAnswerFormOpen] = useState(false);
  const [isAnswerListVisible, setIsAnswerListVisible] = useState(true);
  const postAnswerRef = useRef();
  const [showShareIcons, setShowShareIcons] = useState(false);
  const [showPopConfirm, setShowPopConfirm] = useState(false);
  const { hash } = useLocation();
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);


  const isLoggedIn = authState.isLoggedIn;
  const isOwnerOfQuestion = question.questioner?._id === authState.user?._id;
  const isBookmarked = (bookmark !== null);

  useEffect(() => {
    document.title = `${loading ? "Loading..." : question.title}`
  }, [loading, question]);

  useEffect(() => {
    if (hash === "") return;
    setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 500);
  }, [hash]);



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
    const config2 = { url: `/bookmarks?qid=${question._id}`, method: "get", headers: { Authorization: authState.token } };
    const { bookmark } = await fetchData2(config2, { showSuccessToast: false });
    if (bookmark) setBookmark(bookmark);
    else setBookmark(null);
  }, [question, isLoggedIn, fetchData2, authState]);


  useEffect(() => {
    fetchQuestionWithAnswers();
  }, [fetchQuestionWithAnswers]);

  useEffect(() => {
    fetchBookmark();
  }, [fetchBookmark]);


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
        <div className='m-8 mb-32 text-gray-800 dark:text-gray-300'>

          {loading ? (
            <div className='my-40'><Loader className='mx-auto' /></div>
          ) : (
            <>

              <h2 className='text-2xl'>{question.title}</h2>
              <div>Asked {convertToXTimeAgo(question.createdAt)} by {isOwnerOfQuestion ? "you" : question.questioner?.name}</div>
              {question.createdAt !== question.updatedAt && (
                <div>updated {convertToXTimeAgo(question.updatedAt)} by {isOwnerOfQuestion ? "you" : question.questioner?.name}</div>
              )}


              <div className='flex flex-wrap my-2'>
                {[].concat(!isOwnerOfQuestion ? [] : [
                  { title: "Edit", onClick: handleEditIconClick, icon: <i className="fa-solid fa-pen"></i> },
                  { title: "Delete", onClick: () => { setShowPopConfirm(true) }, icon: <i className="fa-solid fa-trash"></i> },
                ], [
                  { title: "Bookmark", onClick: handleBookmarkIconClick, icon: !isBookmarked ? <i className="fa-regular fa-bookmark"></i> : <i className="fa-solid fa-bookmark"></i> },
                  { title: "Like", icon: <i className="fa-regular fa-thumbs-up"></i> },
                  { title: "Answer", onClick: handleAnswerIconClick, icon: <i className="fa-solid fa-reply"></i> },
                  { title: "Download", onClick: handleDownloadIconClick, icon: <i className="fa-solid fa-download"></i> },
                  { title: "Copy link", onClick: handleCopyLinkIconClick, icon: <i className="fa-solid fa-link"></i> },
                  { title: "Share", onClick: handleShareIconClick, icon: <i className="fa-solid fa-share-nodes"></i> },

                ]).map(({ title, onClick, icon }) => (
                  <Tooltip key={title} text={title} position='top'>
                    <button title={title} data-effect="solid" data-event-off="onmouseleave" onClick={onClick} className="w-8 h-8 text-[#183153] dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2c3e50] rounded-full transition focus:outline-blue-500">{icon}</button>
                  </Tooltip>
                ))}
              </div>

              <Popconfirm isOpen={showPopConfirm} title='Are you sure' okText='Yes' cancelText='No' onConfirm={() => setShowPopConfirm(false)} onCancel={() => setShowPopConfirm(false)} />

              <div className={`flex rounded-md shadow-md w-fit transition-[max-height] overflow-hidden ${showShareIcons ? "max-h-12" : "max-h-0"}`}>
                <Whatsapp link={window.location.href} small title="Share on Whatsapp" className="w-8 h-8 p-2 rounded-full" />
                <Facebook link={window.location.href} small title="Share on Facebook" className="w-8 h-8 p-2 rounded-full" />
                <Twitter link={window.location.href} small title="Share on Twitter" className="w-8 h-8 p-2 rounded-full" />
                <Linkedin link={window.location.href} small title="Share on Linkedin" className="w-8 h-8 p-2 rounded-full" />
                <Telegram link={window.location.href} small title="Share on Telegram" className="w-8 h-8 p-2 rounded-full" />
                <Mail link={window.location.href} small title="Share on Mail" className="w-8 h-8 p-2 rounded-full" />
              </div>

              <div className='mt-4 mb-8 bg-gray-100 dark:bg-ui-dark-primary p-4 rounded-sm'>
                <div className='original-styles' dangerouslySetInnerHTML={{ __html: question.body }}></div>
              </div>
              <hr />


              <div ref={postAnswerRef}>
                <button onClick={() => setIsAnswerFormOpen(!isAnswerFormOpen)} className='my-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 font-semibold text-white rounded-[3px]'>
                  <i className={`fa-solid fa-angle-down transition-all ${isAnswerFormOpen ? "rotate-180" : ""}`}></i>
                  <span className='ml-2'>Add your Answer</span>
                </button>
                <div className={`overflow-hidden ${!isAnswerFormOpen ? "max-h-0" : ""}`}>
                  <PostAnswerForm questionId={question._id} onSuccessPost={handlePostAnswerSuccess} />
                </div>
              </div>


              <button onClick={() => setIsAnswerListVisible(!isAnswerListVisible)} className='my-2 px-4 py-2 bg-emerald-400 hover:bg-emerald-500 font-semibold dark:text-black text-white rounded-[3px]'>
                <i className={`fa-solid fa-angle-down transition-all ${isAnswerListVisible ? "rotate-180" : ""}`}></i>
                <span className='ml-2'>{answers.length} Answers</span>
              </button>

              <div className={`${isAnswerListVisible ? "" : "hidden"}`}>
                {answers.map(answer => (
                  <Answer key={answer._id} answer={answer} highlight={hash.slice(1) === answer._id} />
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