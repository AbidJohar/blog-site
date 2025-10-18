/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import logo from '../assets/logo.jpg';
import ReactLoading from 'react-loading';

function Signup() {
   const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, formState: { isValid, errors } } = useForm({
    mode: 'onChange'
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    try {
      const res = await dispatch(registerUser(data));
      if (res.success) navigate('/');
    } catch (errorMessage) {
      console.log("Error in SignUp:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="flex items-center justify-center w-full h-screen">
      <ReactLoading type="bars" color="#00ffff" height={100} width={100} />
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full px-5 max-w-lg bg-gray-100 rounded-xl pb-6 pt-1 border border-black/20">
        <div className="flex justify-center">
          <img src={logo} width={100} height={100} alt="Logo" />
        </div>
        <h2 className="text-center text-xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <div>
              <Input
                label="Full Name"
                placeholder="Enter your full name"
                {...register('name', {
                  required: 'Full name is required',
                })}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      'Email address must be a valid address',
                  },
                })}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                })}
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-10 rounded-md shadow-md ${
                isValid ? 'bg-blue-400 text-white' : 'bg-gray-400 text-gray-700'
              }`}
              disabled={!isValid || loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;