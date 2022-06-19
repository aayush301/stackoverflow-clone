import React, { useState } from 'react'
import Input from '../../components/utils/Input';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Loader from '../utils/Loader';
import validateManyFields from '../../validations';

const ChangePasswordForm = () => {

  const initialState = {
    existingPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(initialState);
  const [fetchData, { loading }] = useFetch();
  const authState = useSelector(state => state.authReducer);


  const handleChange = e => {
    setFormData(formData => ({
      ...formData, [e.target.name]: e.target.value
    }));
  }


  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("changePasswordForm", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: `/profile/password`, method: "put", data: formData, headers: { Authorization: authState.token } };
    fetchData(config);
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
          <label htmlFor="existingPassword" className="dark:text-gray-200 after:content-['*'] after:ml-0.5 after:text-red-500">Existing Password</label>
          <Input type="text" name="existingPassword" id="existingPassword" value={formData.existingPassword} placeholder="Your existing password" onChange={handleChange} />
          {fieldError("existingPassword")}
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="dark:text-gray-200 after:content-['*'] after:ml-0.5 after:text-red-500">New Password</label>
          <Input type="text" name="newPassword" id="newPassword" value={formData.newPassword} placeholder="Your new password" onChange={handleChange} />
          {fieldError("newPassword")}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="dark:text-gray-200 after:content-['*'] after:ml-0.5 after:text-red-500">Confirm Password</label>
          <Input type="text" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} placeholder="Confirm password" onChange={handleChange} />
          {fieldError("confirmPassword")}
        </div>

        <button onClick={handleSubmit} className='mr-3 bg-brand hover:bg-brand-hover text-white px-2 py-1 rounded-[3px]'>Submit</button>

      </form>
    </>
  )
}

export default ChangePasswordForm