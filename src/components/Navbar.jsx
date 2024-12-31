import { useContext } from 'react';
import logo from '../assets/images/logo.png';
import { AuthContext } from '../providers/AuthProvider';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <div className="navbar bg-base-100 shadow-sm container px-4 mx-auto">
      <div className="flex-1">
        <Link to="/" className="flex gap-2 items-center">
          <img className="w-auto h-7" src={logo} alt="Logo" />
          <span className="font-bold text-gray-800">SoloSphere</span>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link
              to="/"
              className="hover:bg-blue-100 hover:text-blue-600 px-3 py-2 rounded-lg"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/jobs"
              className="hover:bg-green-100 hover:text-green-600 px-3 py-2 rounded-lg"
            >
              All Jobs
            </Link>
          </li>

          {!user && (
            <li>
              <Link
                to="/login"
                className="hover:bg-purple-100 hover:text-purple-600 px-3 py-2 rounded-lg"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {user && (
          <div className="dropdown dropdown-end z-50">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div title={user?.displayName} className="w-10 rounded-full">
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/add-job" className="flex items-center">
                  <FaUserCircle className="mr-2" />
                  Add Job
                </Link>
              </li>
              <li>
                <Link to="/my-posted-jobs" className="flex items-center">
                  <FaUserCircle className="mr-2" />
                  My Posted Jobs
                </Link>
              </li>
              <li>
                <Link to="/my-bids" className="flex items-center">
                  <FaUserCircle className="mr-2" />
                  My Bids
                </Link>
              </li>
              <li>
                <Link to="/bid-requests" className="flex items-center">
                  <FaUserCircle className="mr-2" />
                  Bid Requests
                </Link>
              </li>
              <li className="mt-2">
                <button
                  onClick={logOut}
                  className="bg-gray-200 block text-center flex items-center px-3 py-2 rounded-lg hover:bg-red-100 hover:text-red-600"
                >
                  <FaSignOutAlt className="mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
