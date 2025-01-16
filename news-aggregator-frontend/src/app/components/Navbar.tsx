import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { RootState } from '../store';

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-semibold text-gray-800">News Aggregator</div>
          <div className="flex space-x-4">
            <Link to="/" className="text-gray-800 hover:text-blue-500">Home</Link>
            {user ? (
              <>
                <Link to="/preferences" className="text-gray-800 hover:text-blue-500">Preferences</Link>
                <button onClick={handleLogout} className="text-gray-800 hover:text-blue-500">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-800 hover:text-blue-500">Login</Link>
                <Link to="/register" className="text-gray-800 hover:text-blue-500">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}