import React, { useEffect, useState } from 'react'
import Input from '../../components/utils/Input';
import useFetch from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Loader from '../utils/Loader';
import useDebounce from '../../hooks/useDebounce';

const ChangeUsernameForm = ({ profile, onProfileUpdate }) => {

  const initialState = {
    username: profile.username || "",
  };

  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState(initialState);
  const [fetchData, { loading }] = useFetch();
  const [fetchData2] = useFetch();
  const authState = useSelector(state => state.authReducer);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  const checkUsername = () => {
    if (formData.username === profile.username) {
      setIsUsernameAvailable(true);
      return;
    }

    const config = { url: `/users/username/${formData.username}`, method: "head", headers: { Authorization: authState.token } };
    fetchData2(config, { showSuccessToast: false, showErrorToast: false })
      .then(() => {
        setIsUsernameAvailable(false);
      })
      .catch(err => {
        if (err.response.status === 404) setIsUsernameAvailable(true);
        else setIsUsernameAvailable(false);
      });
  }

  useDebounce(checkUsername, 1000, [formData.username]);


  useEffect(() => {
    setFormData({
      username: profile.username || "",
    });
  }, [profile]);


  const handleChange = e => {
    setFormData(formData => ({
      ...formData, [e.target.name]: e.target.value
    }));
  }


  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors({});
    if (!formData.username) {
      setFormErrors({ username: "This field is required" });
      return;
    }

    const config = { url: `/profile/username`, method: "put", data: formData, headers: { Authorization: authState.token } };
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
      <form className={`relative bg-gray-100 pt-12 pb-9 dark:bg-ui-dark-primary p-4 ${(loading) ? " pointer-events-none" : ""}`}>

        {loading && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-50/50 dark:bg-gray-600/50">
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'><Loader /></div>
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="username" className="dark:text-gray-200 after:content-['*'] after:ml-0.5 after:text-red-500">Username</label>
          <Input type="text" name="username" id="username" value={formData.username} placeholder="Your username" onChange={handleChange} />

          {fieldError("username")}
          {formData.username && (isUsernameAvailable ? (
            <div className='font-semibold text-green-500'>Available <i className="fa-solid fa-check"></i></div>
          ) : (
            <div className='text-red-400'>Username already taken</div>
          ))}
        </div>


        <button onClick={handleSubmit} disabled={!formData.username || !isUsernameAvailable} className='mr-3 bg-brand disabled:bg-gray-400 dark:text-black disabled:hover:bg-gray-400 hover:bg-brand-hover text-white px-2 py-1 rounded-[3px]'>Change username</button>
        <button onClick={handleReset} className='bg-red-400 hover:bg-red-500 text-white px-2 py-1 rounded-[3px]'>Reset</button>

      </form>
    </>
  )
}

export default ChangeUsernameForm