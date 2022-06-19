import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Input from '../../components/utils/Input';
import validateManyFields from '../../validations';
import Loader from '../../components/utils/Loader';

const ResetPassword = () => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [fetchData, { loading }] = useFetch();
  const { accessToken } = useParams();

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("resetPasswordForm", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: "/auth/reset-password", method: "post", data: formData, headers: { Authorization: accessToken } };
    fetchData(config, { autoCloseToast: false });
  }


  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  return (
    <>
      <div className='pl-4 p-4 text-brand font-semibold text-lg shadow-md dark:bg-ui-dark-primary'>
        <Link to="/">Knowledge Bytes</Link>
      </div>

      <div className='h-[95vh] pt-8 dark:bg-[#0f1f2e]'>
        <div className='mx-auto w-[450px] max-w-[100vw] p-8 shadow-md rounded-md dark:bg-ui-dark-primary'>
          <h2 className='mb-4 text-center dark:text-white'>Reset Password</h2>
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="mb-4">
                <label className="dark:text-gray-200 after:content-['*'] after:ml-0.5 after:text-red-500">Enter your new password</label>
                <Input type="password" name="password" value={formData.password} placeholder="Your new password" onChange={handleChange} />
                {fieldError("password")}
              </div>

              <div className="mb-4">
                <label className="dark:text-gray-200 after:content-['*'] after:ml-0.5 after:text-red-500">Confirm password</label>
                <Input type="password" name="confirmPassword" value={formData.confirmPassword} placeholder="Enter password again" onChange={handleChange} />
                {fieldError("confirmPassword")}
              </div>

              <button className='bg-brand text-white px-4 py-2 font-medium hover:bg-brand-hover' onClick={handleSubmit}>Submit</button>
            </>
          )}

        </div>
      </div>
    </>
  )
}

export default ResetPassword