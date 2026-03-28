import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import getPollData from "../services/getPollData";
import ErrorFallback from "../components/Errors/ErrorFallback";
import createVoteService from "../services/createVoteService";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { makeChartDataObjFromPollData } from "../utils/util";
import useBookmark from "../hooks/useBookmark";
import { io } from "socket.io-client";
import { getPollSelectedOptionData } from "../services/getPollSelectedOptionData";
import { BACKEND_URL } from "../config/clientConfig";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function VotingPage() {
  const { pollId } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const { handleBookmark } = useBookmark();
  const [poll, setPoll] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const s = io(BACKEND_URL);
    setSocket(s);

    s.on("connect", () => {
      console.log("Connected to the server");
      s.emit("joinPoll", pollId);
    });

    return () => {
      s.disconnect();
    };
  }, [pollId]);

  const { data, isLoading, isError, refetch } = useQuery(
    ["poll", pollId],
    () => getPollData(pollId),
    {
      cacheTime: 10 * 60 * 1000, // 10 minutes
      staleTime: 20 * 60 * 1000, // 20 minutes
      onSuccess: (data) => {
        setPoll(data);
      },
    },
  );

  useQuery(
    ["selectedOption", pollId],
    () => getPollSelectedOptionData(pollId),
    {
      cacheTime: 10 * 60 * 1000, // 10 minutes
      staleTime: 20 * 60 * 1000,
      onSuccess: (data) => {
        setSelectedOption(data?.data?.optionId || null);
      },
    },
  );

  useEffect(() => {
    if (socket) {
      socket.on("pollDataUpdated", (data) => {
        console.log("Received updated poll data:", data);
        setPoll(data);
      });

      socket.on("error", (error) => {
        console.error("Socket error:", error.message);
      });

      return () => {
        socket.off("pollDataUpdated");
        socket.off("error");
      };
    }
  }, [socket]);

  const mutation = useMutation(createVoteService, {
    onSuccess: (data) => {
      toast.success("Vote submitted successfully");
      if (socket) {
        socket.emit("vote", { pollId, success: data?.success });
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "An unexpected error occurred",
      );
    },
  });

  const handleOptionSelect = (id) => {
    if (!selectedOption) {
      setSelectedOption(id);
    }
    mutation.mutate({ pollId, optionId: id });
  };

  if (isLoading) {
    return <div className="skeleton h-64 w-full max-w-lg mt-12 mx-auto"></div>;
  }

  if (isError) {
    return (
      <div className="h-64 w-full max-w-lg mt-12 mx-auto">
        <ErrorFallback onRetry={refetch} />
      </div>
    );
  }

  const chartData = makeChartDataObjFromPollData(poll);

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
          <h2 className="text-lg md:text-xl font-semibold">
            {poll?.data?.creatorData?.username || "Unknown"}
          </h2>
        </div>

        {/* BookMark Button */}
        <button
          className="btn btn-circle btn-neutral"
          onClick={() => handleBookmark(pollId)}
        >
          <FaBookmark />
        </button>
      </div>

      {/* Poll Title */}
      <h1 className="text-xl md:text-3xl font-bold text-center">
        {poll?.data?.pollData?.title || "Loading.."}
      </h1>

      {/* Poll Description */}
      <p className="text-sm font-light md:text-base mb-6 text-center">
        {poll?.data?.pollData?.description || "Loading.."}
      </p>

      {/* Voting Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mb-6">
        {poll?.data?.pollData?.options.map((option) => (
          <div
            onClick={() => handleOptionSelect(option._id)}
            key={option._id}
            className={`md:p-4 p-2 ${
              selectedOption == option._id ? "bg-blue-500" : "bg-base-100"
            } rounded-lg shadow-md flex items-center justify-center cursor-pointer ${
              selectedOption == option._id ? "outline" : "hover:bg-base-300"
            } transition`}
          >
            <span className="text-lg">{option.name}</span>
          </div>
        ))}
      </div>

      {/* Chart Visualization */}
      <div className="w-full max-w-lg">
        <Bar
          data={makeChartDataObjFromPollData(poll)}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
}

export default VotingPage;
