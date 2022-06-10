import React, { useState, useEffect } from 'react'
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Loader from '../utils/Loader';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { useNavigate } from 'react-router-dom';

const EditAnswerForm = ({ answer }) => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({ text: "" });
  const [fetchData, { loading }] = useFetch();
  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({ text: answer?.text || "" });
  }, [answer]);


  const handleSubmit = async e => {
    e.preventDefault();
    setFormErrors({});
    if (!formData.text) {
      setFormErrors({ text: "This field is required" });
      return;
    }

    const config = { url: `/answers/${answer._id}`, method: "put", data: formData, headers: { Authorization: authState.token } };
    fetchData(config).then(() => {
      navigate(`/questions/${answer.question?.slug}#${answer._id}`);
    });
  }

  const handleReset = e => {
    e.preventDefault();
    setFormData({ text: answer.text });
  }

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <form className={`relative mx-8 mb-8 bg-gray-100 dark:bg-ui-dark-primary p-4 ${(loading) ? " pointer-events-none" : ""}`}>

        {loading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-50/50 dark:bg-gray-600/50">
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'><Loader /></div>
          </div>
        )}

        <div className="mb-4 text-xl dark:text-gray-200">
          {answer.question?.title}
        </div>


        <div className="mb-4">
          <div className='bg-white'>
            <DefaultEditor placeholder='Start typing...' value={formData.text} onChange={e => setFormData(formData => ({ ...formData, text: e.target.value }))} />
          </div>
          {fieldError("text")}
        </div>

        <button onClick={handleSubmit} className='mr-3 bg-brand hover:bg-brand-hover text-white px-2 py-1 rounded-[3px]'>Submit</button>
        <button onClick={handleReset} className='bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded-[3px]'>Reset</button>

      </form>
    </>
  )
}

export default EditAnswerForm