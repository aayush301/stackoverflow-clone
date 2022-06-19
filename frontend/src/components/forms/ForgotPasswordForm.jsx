import React, { useEffect, useState } from 'react'
import validateManyFields from '../../validations';
import Input from '../utils/Input';
import Loader from '../utils/Loader';
import useFetch from '../../hooks/useFetch';

const ForgotPasswordForm = ({ isModalOpen, onClose, switchToSignup, redirectUrl }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
  });

  const [fetchData, { loading }] = useFetch();

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("loginForm", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: "/auth/forgot-password", method: "post", data: formData };
    fetchData(config, { autoCloseToast: false }).then(() => {
      setFormData({ email: "" });
    }).catch(err => {
      // console.log(err);
    });
  }

  useEffect(() => {
    setFormData({ email: "" });
  }, [isModalOpen]);



  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )


  return (
    <>
      <form className='m-auto max-w-[500px] bg-white dark:bg-ui-dark-primary p-8'>
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className='text-center mb-4 dark:text-white'>Forgot password? Don't worry, Enter email here</h2>
            <div className="mb-4">
              <label className="dark:text-gray-200 after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
              <Input type="text" name="email" value={formData.email} placeholder="Your email" onChange={handleChange} />
              {fieldError("email")}
            </div>

            <button className='bg-brand text-white px-4 py-2 font-medium hover:bg-brand-hover' onClick={handleSubmit}>Send email</button>

            <div className='pt-4'>
              <span onClick={switchToSignup} className='text-blue-400 cursor-pointer'>Don't have an account? Signup here</span>
            </div>
          </>
        )}
      </form>
    </>
  )
}

export default ForgotPasswordForm