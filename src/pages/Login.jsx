import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';

const defaultSignIn = {
  username: 'emilys',
  password: 'emilyspass',
};

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin');
  const [form, setForm] = useState(defaultSignIn);
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isSignIn = mode === 'signin';

  const handleSignInChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUpChange = (event) => {
    const { name, value } = event.target;
    setSignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    if (!isSignIn) {
      alert(`Akun ${signupForm.name || signupForm.email} berhasil dibuat untuk demo.`);
      setMode('signin');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://dummyjson.com/auth/login', {
        username: form.username,
        password: form.password,
        expiresInMins: 30,
      });

      localStorage.setItem('bengkelpro_user', JSON.stringify(response.data));
      navigate('/dashboard');
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Login gagal. Gunakan demo emilys / emilyspass atau coba lagi.';
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocial = (provider) => {
    alert(`${provider} login hanya tampilan demo.`);
  };

  return (
    <div className="w-full max-w-[366px]">
      <h2 className="mb-10 text-center text-xl font-semibold text-black">
        {isSignIn ? 'Sign In' : 'Sign Up'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {!isSignIn && (
          <label className="block">
            <span className="mb-3 block text-base font-medium text-black">Name</span>
            <input
              name="name"
              value={signupForm.name}
              onChange={handleSignUpChange}
              className="h-11 w-full rounded-full border border-[#c8c6e8] bg-white px-5 text-sm outline-none transition focus:border-[#3b35ad]"
              autoComplete="name"
            />
          </label>
        )}

        <label className="block">
          <span className="mb-3 block text-base font-medium text-black">Email</span>
          <input
            name={isSignIn ? 'username' : 'email'}
            value={isSignIn ? form.username : signupForm.email}
            onChange={isSignIn ? handleSignInChange : handleSignUpChange}
            className="h-11 w-full rounded-full border border-[#c8c6e8] bg-white px-5 text-sm outline-none transition focus:border-[#3b35ad]"
            autoComplete={isSignIn ? 'username' : 'email'}
          />
        </label>

        <label className="block">
          <span className="mb-3 block text-base font-medium text-black">Password</span>
          <input
            name="password"
            type="password"
            value={isSignIn ? form.password : signupForm.password}
            onChange={isSignIn ? handleSignInChange : handleSignUpChange}
            className="h-11 w-full rounded-full border border-[#c8c6e8] bg-white px-5 text-sm outline-none transition focus:border-[#3b35ad]"
            autoComplete={isSignIn ? 'current-password' : 'new-password'}
          />
        </label>

        <div className="flex items-center justify-between gap-4 text-xs">
          <label className="flex items-center gap-2 text-black">
            <input
              type="checkbox"
              defaultChecked
              className="h-3.5 w-3.5 accent-[#3b35ad]"
            />
            {isSignIn ? 'Remember me' : 'I agree to the'}
            {!isSignIn && (
              <button type="button" className="font-semibold text-[#17108a]">
                Terms & Conditions
              </button>
            )}
          </label>

          {isSignIn && (
            <button type="button" className="font-semibold text-[#17108a]">
              Forgot Password?
            </button>
          )}
        </div>

        {errorMessage && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="h-11 w-full rounded-full bg-[#3b35bd] text-base font-medium text-white shadow-[0_10px_22px_rgba(59,53,189,0.24)] transition hover:bg-[#2f2aa4] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? 'Loading...' : isSignIn ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-5 text-sm text-black">
        {isSignIn ? 'Not a member yet?' : 'Have an Account?'}{' '}
        <button
          type="button"
          onClick={() => {
            setErrorMessage('');
            setMode(isSignIn ? 'signup' : 'signin');
          }}
          className="font-semibold text-[#17108a]"
        >
          {isSignIn ? 'Signup' : 'Sign In'}
        </button>
      </p>

      <div className="my-8 flex items-center gap-6 text-[#9a9a9a]">
        <span className="h-px flex-1 bg-[#dddddd]" />
        <span>{isSignIn ? 'Sign In with' : 'Sign Up with'}</span>
        <span className="h-px flex-1 bg-[#dddddd]" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          ['Facebook', FaFacebookF, '#3530d5'],
          ['Google', FaGoogle, '#ff3d16'],
          ['twitter', FaTwitter, '#15aee7'],
        ].map(([label, Icon, color]) => (
          <div key={label} className="text-center">
            <button
              type="button"
              onClick={() => handleSocial(label)}
              className="flex h-11 w-full items-center justify-center rounded-full text-xl text-white shadow-[0_8px_16px_rgba(15,23,42,0.12)]"
              style={{ backgroundColor: color }}
            >
              <Icon />
            </button>
            <p className="mt-2 text-xs text-black">{label}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navigate('/dashboard')}
        className="mt-7 block w-full text-center text-xs font-semibold text-[#17108a]"
      >
        Masuk demo dashboard
      </button>
    </div>
  );
};

export default Login;
