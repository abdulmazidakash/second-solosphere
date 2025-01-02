/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FaRegCalendarAlt, FaTags, FaDollarSign, FaGavel } from 'react-icons/fa';

const JobCard = ({ job }) => {
  const {
    title = 'Untitled',
    deadline,
    category = 'Unknown',
    min_price = 0,
    max_price = 0,
    description = '',
    _id,
    bid_count = 0,
  } = job || {};

  // Generate dynamic gradient based on the category
  const gradientColors = {
    Unknown: 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600',
    Design: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
    Development: 'bg-gradient-to-r from-blue-400 via-green-500 to-teal-500',
    Marketing: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500',
    Default: 'bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500',
  };
  const gradient = gradientColors[category] || gradientColors.Default;

  return (
    <Link
      to={_id ? `/job/${_id}` : '#'}
      aria-disabled={!_id}
      aria-label={title}
      className={`w-full max-w-sm px-4 py-3 rounded-md shadow-md transition-all ${
        _id ? 'hover:scale-[1.05] cursor-pointer' : 'opacity-50 cursor-not-allowed'
      } ${gradient} text-white`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <FaRegCalendarAlt aria-hidden="true" />
          <span className="text-xs font-light">
            {deadline ? format(new Date(deadline), 'P') : 'No Deadline'}
          </span>
        </div>
        <span className="px-3 py-1 text-[8px] uppercase bg-white text-gray-800 rounded-full">
          {category}
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold">{title}</h1>
        <p className="mt-2 text-sm">
          {description.substring(0, 70) || 'No description available'}...
        </p>
        <div className="mt-2 text-sm">
          <div className="flex items-center space-x-1">
            <FaDollarSign aria-hidden="true" />
            <span>Range: ${min_price} - ${max_price}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaGavel aria-hidden="true" />
            <span>Total Bids: {bid_count}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
