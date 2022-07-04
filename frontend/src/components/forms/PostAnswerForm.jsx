import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Loader from '../utils/Loader';
import { DefaultEditor } from 'react-simple-wysiwyg';
import SignupModal from '../modals/SignupModal';
import LoginModal from '../modals/LoginModal';

const PostAnswerForm = ({ questionId, onSuccessPost }) => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({ text: "" });
  const [fetchData, { loading }] = useFetch();
  const authState = useSelector(state => state.authReducer);

  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setSignupModal] = useState(false);


  const handleSubmit = async e => {
    e.preventDefault();
    setFormErrors({});

    if (!formData.text) {
      setFormErrors({ text: "This field is required" });
      return;
    }

    if (!authState.isLoggedIn) {
      setLoginModal(true);
      return;
    }

    const config = { url: `/questions/${questionId}/answers`, method: "post", data: formData, headers: { Authorization: authState.token } };
    fetchData(config).then(() => {
      onSuccessPost();
    });
  }

  const handleDiscard = e => {
    e.preventDefault();
    setFormData({ text: "" });
  }

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <form className={`relative bg-gray-100 dark:bg-ui-dark-primary p-4 ${(loading) ? " pointer-events-none" : ""}`}>

        {loading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-50/50 dark:bg-gray-600/50">
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'><Loader /></div>
          </div>
        )}


        <div className='mb-4'>
          <div className='bg-white'>
            <DefaultEditor placeholder='Start typing...' value={formData.text} onChange={e => { setFormData({ ...formData, text: e.target.value }) }} />
          </div>
          {fieldError("text")}
        </div>

        <button onClick={handleSubmit} className='mr-3 bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-[3px]'>Submit</button>
        <button onClick={handleDiscard} className='bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded-[3px]'>Discard</button>
      </form>

      <hr className='my-4' />

      <SignupModal isModalOpen={signupModal} onClose={() => setSignupModal(false)} setLoginModal={setLoginModal} />
      <LoginModal isModalOpen={loginModal} onClose={() => setLoginModal(false)} setSignupModal={setSignupModal} />

    </>
  )
}

export default PostAnswerForm