import React from "react";
import { statistics } from "../api_calls/StatsAPI";
import { useQuery } from "@tanstack/react-query";
import Countup from "react-countup";
import "./Dashboard.scss";
import ManageToken from "../Error_Boundary/ManageToken";

const Dashboard = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: statistics,
    queryKey: ["Statistics"],
    retry: false,
  });

  if (isError && error) {
    return <ManageToken error={error} />;
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="dashboard">
      <h1>Analytics</h1>
      <div className="statistics">
        <div className="categories">
          <h2>Saathi</h2>
          <p>
            <Countup end={data.saathi} duration={2} />
          </p>
        </div>
        <div className="categories">
          <h2>Professional</h2>
          <p>
            <Countup end={data.professional} duration={2} />
          </p>
        </div>
        <div className="categories">
          <h2>Students</h2>
          <p>
            <Countup end={data.student} duration={2} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
