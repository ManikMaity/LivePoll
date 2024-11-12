// VotingPage.js
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import getPollData from "../services/getPollData";
import ErrorFallback from "../components/Errors/ErrorFallback";
import createVoteService from "../services/createVoteService";
import { FaBookmark } from "react-icons/fa";
import {toast} from "react-toastify";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function VotingPage() {

  const { pollId } = useParams();
  const [seletedOption, setSeletedOption] = useState(null);

  const { data: poll, isLoading, isError, refetch } = useQuery(["poll", pollId], () => getPollData(pollId), {
    cacheTime : 10*100*60, // 10 minutes
    staleTime : 20*100*60, // 20 minutes
  });

  const mutation = useMutation(createVoteService, {
    onSuccess: (data) => {
      toast.success("Vote given successfully");
    },
    onError: (error) => {
      console.log(error); 
      toast.error(error?.response?.data?.message || "An unexpected error occurred");
    },
  })

  const handleOptionSelect = (id) => {
    mutation.mutate({ pollId, optionId: id });
  }

  
  const chartData = {
    labels: poll?.data?.pollData?.options.map(option => option.name),
    datasets: [
      {
        label: "Votes",
        data: poll?.data?.pollData?.options.map(option => option.voteCount),
        backgroundColor: ["#3B82F6", "#EF4444", "#10B981", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  };

  if (isLoading) {
    return <div className="skeleton h-64 w-full max-w-lg mt-12 mx-auto"></div>;
  }

  if (isError){
    return <div className="h-64 w-full max-w-lg mt-12 mx-auto">
      <ErrorFallback onRetry={refetch}/>
    </div>
  }

  return (
    <div className="bg-base-200 min-h-screen p-6 text-white flex flex-col items-center">
      <div className="w-full flex justify-between max-w-lg">
      {/* Poll Creator Info */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <img
          src="https://via.placeholder.com/100"
          alt={poll?.data?.creatorData?.username}
          className="rounded-full h-7 md:h-10 w-7 md:w-10"
        />
        <h2 className="text-lg md:text-xl font-semibold">{poll?.data?.creatorData?.username || "Unknown"}</h2>
      </div>

      {/* BookMark Button */}
      <button className="btn btn-circle btn-neutral"><FaBookmark /></button>
      
      </div>

      {/* Poll Title */}
      <h1 className="text-xl md:text-3xl font-bold text-center">{poll?.data?.pollData?.title || "Loading.."}</h1>

      {/* Poll Description */}
      <p className="text-sm font-light md:text-base mb-6 text-center">{poll?.data?.pollData?.description || "Loading.."}</p>

      {/* Voting Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mb-6">
        {poll?.data?.pollData?.options.map(option => (
          <div
            onClick={() => handleOptionSelect(option._id)}
            key={option._id}
            className= {`md:p-4 p-2 ${seletedOption == option._id ? "bg-blue-500" : "bg-base-100"} rounded-lg shadow-md flex items-center justify-center cursor-pointer ${seletedOption == option._id ? "outline" :"hover:bg-base-300"} transition`}
          >
            <span className="text-lg">{option.name}</span>
          </div>
        ))}
      </div>

      {/* Chart Visualization */}
      <div className="w-full max-w-lg">
        <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </div>
    </div>
  );
}

export default VotingPage;
