import React from "react";
import ProfessionalCards from "./ProfessionalCards.jsx";
import { useMyContext } from "../../../context/categoryContext.jsx";

const ProfessionalList = () => {
  const { data } = useMyContext();

  if (!Array.isArray(data)) {
    return <p>Data is invalid</p>;
  }

  return (
    <div className="Prof_list">
      {data?.length === 0 ? (
        <p>No Professional Found</p>
      ) : (
        data?.map((Professional) => (
          <ProfessionalCards
            key={Professional._id}
            professional={Professional}
          />
        ))
      )}
    </div>
  );
};

export default ProfessionalList;
