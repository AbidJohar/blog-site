/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import logo from '../assets/logo.jpg';
 

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { isValid, errors } } = useForm({
    mode: 'onChange'
  });

 const onSubmit = async (data) => {
  setError('');
  try {
    const res = await dispatch(loginUser(data));

    if (res?.success) {
      navigate('/');
    }
  } catch (errorMessage) {
    console.log("Error in login:", errorMessage);
    setError(errorMessage); // <-- show real backend error
  }
};

  return (
    <div className="flex items-center justify-center w-full">
      <div className="mx-auto w-full max-w-lg mt-4 bg-gray-100 rounded-xl px-5 pt-1 pb-7 mb-4 border border-black/30">
        <div className="flex justify-center">
          <img src={logo} width={100} height={100} alt="Logo" />
        </div>
        <h2 className="text-center text-xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="space-y-5">
            <div>
              <Input
                label="Email"
                type="email"
                placeholder="Enter the email"
                {...register('email', {
                  required: 'Email is required',
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      'Email address must be a valid address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter the password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full py-2 rounded-md shadow-md ${
                isValid ? 'bg-blue-600 text-white' : 'bg-gray-400 text-gray-700'
              }`}
              disabled={!isValid}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;