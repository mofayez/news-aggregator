import { useState } from 'react';
import { useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';
import { RootState, useAppDispatch } from '../store';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error, validationErrors } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register({ name, email, password, password_confirmation })).unwrap();

      navigate('/login');
    } catch (error) {
      console.error('Register failed:', error);
    }
  };

  return (
    <div className="pt-20">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Register</h1>
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {validationErrors && validationErrors.name && (
            <p className="text-red-500 text-sm">{validationErrors.name[0]}</p>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {validationErrors && validationErrors.email && (
            <p className="text-red-500 text-sm">{validationErrors.email[0]}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {validationErrors && validationErrors.password && (
            <p className="text-red-500 text-sm">{validationErrors.password[0]}</p>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            value={password_confirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {validationErrors && validationErrors.password_confirmation && (
            <p className="text-red-500 text-sm">{validationErrors.password_confirmation[0]}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}