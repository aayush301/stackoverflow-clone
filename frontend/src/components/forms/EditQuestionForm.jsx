import React, { useState, useEffect } from 'react'
import Input from '../../components/utils/Input';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Loader from '../utils/Loader';
import validateManyFields from '../../validations';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { useNavigate } from 'react-router-dom';

const EditQuestionForm = ({ question }) => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({ title: "", body: "" });
  const [fetchData, { loading }] = useFetch();
  const authState = useSelector(state => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({ title: question.title || "", body: question.body || "" });
  }, [question]);


  const handleChange = e => {
    setFormData(formData => ({
      ...formData, [e.target.name]: e.target.value
    }));
  }


  const handleSubmit = async e => {
    e.preventDefault();
    const errors = validateManyFields("editQuestionForm", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: `/questions/${question._id}`, method: "put", data: formData, headers: { Authorization: authState.token } };
    fetchData(config).then((data) => {
      navigate(`/questions/${data.question?.slug}`);
    });
  }

  const handleReset = e => {
    e.preventDefault();
    setFormData({ title: question.title, body: question.body });
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

        <div className="mb-4">
          <label htmlFor="title" className="dark:text-gray-200 after:content-['*'] after:ml-0.5 after:text-red-500">Title</label>
          <Input type="text" name="title" id="title" value={formData.title} placeholder="Title of your Question" onChange={handleChange} />
          {fieldError("title")}
        </div>

        <div className="mb-4">
          <label htmlFor="body" className="block mb-2 dark:text-gray-200 after:content-['*'] after:ml-0.5 after:text-red-500">Body</label>
          <div className='bg-white'>
            <DefaultEditor placeholder='Start typing...' value={formData.body} onChange={e => setFormData(formData => ({ ...formData, body: e.target.value }))} />
          </div>
          {fieldError("body")}
        </div>

        <button onClick={handleSubmit} className='mr-3 bg-brand hover:bg-brand-hover text-white px-2 py-1 rounded-[3px]'>Submit</button>
        <button onClick={handleReset} className='bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded-[3px]'>Reset</button>

      </form>
    </>
  )
}

export default EditQuestionForm