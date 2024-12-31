/* eslint-disable react/prop-types */
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { FaLaptopCode, FaPaintBrush, FaBullhorn } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";

const TabCategories = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(()=>{
    fetchAllJobs()
  }, [])

  const fetchAllJobs = async ()=>{
    const{ data }= await axios.get(`${import.meta.env.VITE_API_URL}/jobs`)
    setJobs(data);
  }
  return (
    <Tabs>
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
          Browse Jobs By Categories
        </h1>
        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500">
          Three categories available for the time being. They are Web
          Development, Graphics Design, and Digital Marketing. Browse them by
          clicking on the tabs below.
        </p>
        <div className="flex items-center justify-center">
          <TabList className="flex space-x-4">
            <Tab
              className="flex items-center px-4 py-2 text-sm font-medium text-black transition bg-gray-100 rounded-lg hover:bg-purple-100 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              selectedClassName="bg-orange-500 text-white"
            >
              <FaLaptopCode className="mr-2" /> Web Development
            </Tab>
            <Tab
              className="flex items-center px-4 py-2 text-sm font-medium text-black transition bg-gray-100 rounded-lg hover:bg-purple-100 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
              selectedClassName="bg-rose-500 text-white"
            >
              <FaPaintBrush className="mr-2" /> Graphics Design
            </Tab>
            <Tab
              className="flex items-center px-4 py-2 text-sm font-medium text-black transition bg-gray-100 rounded-lg hover:bg-purple-100 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              selectedClassName="bg-purple-500 text-white"
            >
              <FaBullhorn className="mr-2" /> Digital Marketing
            </Tab>
          </TabList>
        </div>
        <TabPanel>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs
                .filter(job => job.category === 'Web Development')
                .map(job => <JobCard key={job._id} job={job} />)}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs
                .filter(job => job.category === 'Graphics Design')
                .map(job => <JobCard key={job._id} job={job} />)}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {jobs
                .filter(job => job.category === 'Digital Marketing')
                .map(job => <JobCard key={job._id} job={job} />)}
            </div>
          </TabPanel>

      </div>
    </Tabs>
  );
};

export default TabCategories;
