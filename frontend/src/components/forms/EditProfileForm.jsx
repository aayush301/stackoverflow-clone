import React, { useState, useEffect } from 'react'
import Input from '../../components/utils/Input';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Loader from '../utils/Loader';
import validateManyFields from '../../validations';

const EditProfileForm = ({ profile, onProfileUpdate }) => {

  const initialState = {
    name: profile.name || "",
    location: profile.location || ""
  };

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(initialState);
  const [fetchData, { loading }] = useFetch();
  const authState = useSelector(state => state.authReducer);

  useEffect(() => {
    setFormData({
      name: profile.name || "",
      location: profile.location || "",
    });
  }, [profile]);


  const handleChange = e => {
    setFormData(formData => ({
      ...formData, [e.target.name]: e.target.value
    }));
  }


  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("editProfileForm", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: `/profile`, method: "put", data: formData, headers: { Authorization: authState.token } };
    fetchData(config).then(() => {
      onProfileUpdate();
    });
  }

  const handleReset = e => {
    e.preventDefault();
    setFormData(initialState);
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

        <div className="mb-4">
          <label htmlFor="name" className="dark:text-gray-200 after:content-['*'] after:ml-0.5 after:text-red-500">Name</label>
          <Input type="text" name="name" id="name" value={formData.name} placeholder="Your name" onChange={handleChange} />
          {fieldError("name")}
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="dark:text-gray-200">Location</label>
          <Input type="text" name="location" id="location" value={formData.location} placeholder="Your location" onChange={handleChange} />
        </div>

        <button onClick={handleSubmit} className='mr-3 bg-brand hover:bg-brand-hover text-white px-2 py-1 rounded-[3px]'>Submit</button>
        <button onClick={handleReset} className='bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded-[3px]'>Reset</button>

      </form>
    </>
  )
}

export default EditProfileForm