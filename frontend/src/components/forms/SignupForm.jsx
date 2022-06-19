import React, { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch';
import validateManyFields from '../../validations';
import Input from '../utils/Input';
import Loader from '../utils/Loader';

const SignupForm = ({ isModalOpen, onClose, switchToLogin }) => {

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [fetchData, { loading }] = useFetch();
  const [status, setStatus] = useState("");

  const handleChange = e => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    const errors = validateManyFields("signupForm", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {}));
      return;
    }

    const config = { url: "/auth/register", method: "post", data: formData };
    fetchData(config, { autoCloseToast: false }).then(() => {
      setStatus("success");
    }).catch(err => {
      // console.log(err);
    });

  }

  const fieldError = (field) => (
    <p className={`mt-1 text-pink-600 text-sm ${formErrors[field] ? "block" : "hidden"}`}>
      <i className='mr-2 fa-solid fa-circle-exclamation'></i>
      {formErrors[field]}
    </p>
  )

  useEffect(() => {
    setFormData({ name: "", email: "", password: "" });
  }, [isModalOpen]);



  return (
    <>
      <form className='m-auto max-w-[500px] p-8 bg-white dark:bg-ui-dark-primary'>
        {loading ? (
          <Loader />
        ) : status === "success" ? (
          <div>
            <div className='text-green-500'> Congratulations, you are just one step behind completing your registration. please check your email </div>
          </div>
        ) : (
          <>
            <h2 className='text-center mb-4 dark:text-white'>Welcome user, please signup here</h2>
            <div className="mb-4">
              <label className="dark:text-gray-200 after:content-['*'] after:ml-0.5 after:text-red-500">Name</label>
              <Input type="text" name="name" value={formData.name} placeholder="Your name" onChange={handleChange} />
              {fieldError("name")}
            </div>

            <div className="mb-4">
              <label className="dark:text-gray-200 after:content-['*'] after:ml-0.5 after:text-red-500">Email</label>
              <Input type="text" name="email" value={formData.email} placeholder="Your email" onChange={handleChange} />
              {fieldError("email")}
            </div>

            <div className="mb-4">
              <label className="dark:text-gray-200 after:content-['*'] after:ml-0.5 after:text-red-500">Password</label>
              <Input type="password" name="password" value={formData.password} placeholder="Your password.." onChange={handleChange} />
              {fieldError("password")}
            </div>

            <button className='bg-brand text-white px-4 py-2 font-medium hover:bg-brand-hover' onClick={handleSubmit}>Submit</button>

            <div className='pt-4'>
              <span onClick={switchToLogin} className='text-blue-400 cursor-pointer'>Already have an account? Login here</span>
            </div>
          </>
        )}

      </form>
    </>
  )
}

export default SignupForm