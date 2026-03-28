import React, { useState } from "react";
import { useQuery } from "react-query";
import getPollsService from "../services/getPollsService";
import PollCard from "../components/PollCard/PollCard";
import ErrorFallback from "../components/Errors/ErrorFallback";

function Polls() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);

  const { data, isLoading, isError, isSuccess, refetch } = useQuery(
    ["polls", page, limit],
    () => getPollsService(page, limit),
    {
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 10,
    },
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Polls</h1>
      {isSuccess && (
        <div className="flex flex-wrap justify-center gap-6">
          {data?.data?.polls?.map((poll) => (
            <PollCard key={poll._id} poll={poll} />
          ))}
        </div>
      )}
      {isLoading && (
        <div className="flex flex-wrap justify-center gap-6 skeleton min-h-40"></div>
      )}
      {isError && (
        <div className="flex justify-center gap-6">
          <ErrorFallback onRetry={() => refetch()} />
        </div>
      )}

      <div className="flex justify-center gap-6 mt-6">
        <button
          className="btn btn-primary btn-circle"
          disabled={page <= 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <button
          className="btn btn-primary btn-circle"
          disabled={data?.data?.totalPages === page}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Polls;
