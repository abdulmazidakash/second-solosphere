import Axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { compareAsc, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaDollarSign, FaClipboardList } from 'react-icons/fa';
import { AuthContext } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import axios from 'axios';

const JobDetails = () => {

  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [job, setJob] = useState({});

  useEffect(() => {
    fetchJobData();
  }, [id]);

  const fetchJobData = async () => {
    try {
      const { data } = await Axios.get(`${import.meta.env.VITE_API_URL}/job/${id}`);
      setJob(data);
      // setStartDate(new Date(data.deadline));
    } catch (error) {
      console.error('Failed to fetch job data:', error);
    }
  };

  const { title, deadline, category, min_price, max_price, description, buyer, _id} = job || {};


  const handleSubmit = async e =>{
    e.preventDefault();

    const form = e.target;
    const price = form.price.value;
    const email = user?.email;
    const comment = form.comment.value;
    const job_id = _id;
    const deadline = startDate;
    const bidData = {price, email, comment, job_id, deadline: startDate};
    
    console.table(bidData);

    //email validation
    // if(user?.email === buyer?.email)
    //   return toast.error('You cannot place a bid on your own job.');

    //deadline crossed validation 

    if(compareAsc(new Date(), new Date(deadline)) === 1) 
      return toast.error('Deadline has passed. You cannot place a bid on this job.');

    //
    if(price > max_price)
       return toast.error('Your bid is higher than the maximum price.');

    //
    if(compareAsc(new Date(startDate), new Date(deadline)) === 1)
      return toast.error('Deadline should be before the job deadline.');

    try{

      //make a post request
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/add-bid`, bidData)
      toast.success('bid added successfully');
    console.log(data);
      // navigate('/my-posted-jobs')
    }
    catch(err){
      console.log(err?.response?.data);
      toast.error('Failed to place bid',err?.response?.data);
    }

  }
  // Dynamic gradient colors based on the category
  const gradientColors = {
    Unknown: 'bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600',
    Design: 'bg-gradient-to-r from-purple-400 via-pink-500 to-red-500',
    Development: 'bg-gradient-to-r from-blue-400 via-green-500 to-teal-500',
    Marketing: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500',
    Default: 'bg-gradient-to-r from-indigo-400 via-blue-500 to-purple-500',
  };
  const gradient = gradientColors[category] || gradientColors.Default;

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5 items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto">
      {/* Job Details */}
      <div className={`flex-1 px-4 py-7 rounded-md shadow-md md:min-h-[350px] text-white ${gradient}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <FaClipboardList />
            <span className="text-sm font-light">
              {deadline ? `Deadline: ${format(new Date(deadline), 'P')}` : 'No Deadline'}
            </span>
          </div>
          <span className="px-4 py-1 text-xs uppercase bg-white text-gray-800 rounded-full">
            {category || 'Untitled'}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold">{title || 'No Category'}</h1>
          <p className="mt-2 text-lg">{description || 'No description available.'}</p>
          <p className="mt-6 text-sm font-bold">Buyer Details:</p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm flex items-center gap-2">
                <FaUser /> {buyer?.name || 'Unknown Buyer'}
              </p>
              <p className="mt-2 text-sm flex items-center gap-2">
                <FaEnvelope /> {buyer?.email || 'No Email Available'}
              </p>
            </div>
            <div className="rounded-full object-cover overflow-hidden w-14 h-14">
              <img
                referrerPolicy="no-referrer"
                src={buyer?.photo || 'https://via.placeholder.com/150'}
                alt="Buyer Avatar"
              />
            </div>
          </div>
          <p className="mt-6 text-lg font-bold flex items-center gap-2">
            <FaDollarSign /> Range: ${min_price || 0} - ${max_price || 0}
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className="p-6 w-full bg-white rounded-md shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize">Place A Bid</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700" htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="text"
                name="price"
                required
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
               defaultValue={user?.email || ''}
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label className="text-gray-700" htmlFor="comment">
                Comment
              </label>
              <input
                id="comment"
                name="comment"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Deadline</label>
              <DatePicker
                className="border p-2 rounded-md"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default JobDetails;
