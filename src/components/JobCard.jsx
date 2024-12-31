/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';
import { format } from 'date-fns';

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

  return (
    <Link
      to={_id ? `/job/${_id}` : '#'}
      className={`w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md 
      transition-all hover:scale-[1.05]`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-light text-gray-800">
          Deadline: {deadline ? format(new Date(deadline), 'P') : 'No Deadline'}
        </span>
        <span className="px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full">
          {category}
        </span>
      </div>

      <div>
        <h1 className="mt-2 text-lg font-semibold text-gray-800">{title}</h1>
        <p className="mt-2 text-sm text-gray-600">
          {description.substring(0, 70) || 'No description available'}...
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600">
          Range: ${min_price} - ${max_price}
        </p>
        <p className="mt-2 text-sm font-bold text-gray-600">
          Total Bids: {bid_count}
        </p>
      </div>
    </Link>
  );
};

export default JobCard;
