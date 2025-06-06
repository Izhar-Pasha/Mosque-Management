import React from "react";
import "../Saathi.scss";
import SaathiCards from "./SaathiCards.jsx";
import { useMyContext } from "../../../context/categoryContext.jsx";

const SaathiList = () => {
  const { data } = useMyContext();

  return (
    <div className="list-details">
      {data?.map((saathi) => (
        <SaathiCards key={saathi._id} saathi={saathi} />
      ))}
    </div>
  );
};

export default SaathiList;
