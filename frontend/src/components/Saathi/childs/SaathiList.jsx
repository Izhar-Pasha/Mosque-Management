import React from "react";
import "../Saathi.scss";
import SaathiCards from "./SaathiCards.jsx";
import { useMyContext } from "../../../context/categoryContext.jsx";

const SaathiList = () => {
  const { data } = useMyContext();

  if (!Array.isArray(data.allSaathi)) {
    return <p>Data is invalid</p>;
  }

  return (
    <div className="saathi_list">
      {data?.allSaathi?.length === 0 ? (
        <p>No Saathi Found</p>
      ) : (
        data?.allSaathi.map((saathi) => (
          <SaathiCards key={saathi._id} saathi={saathi} />
        ))
      )}
    </div>
  );
};

export default SaathiList;
