import React from "react";
import ProfessionalCards from "./ProfessionalCards.jsx";
import { useMyContext } from "../../../context/categoryContext.jsx";

const ProfessionalList = () => {
  const { data } = useMyContext();

  return (
    <div className="list-details">
      {data?.map((Professional) => (
        <ProfessionalCards key={Professional._id} professional={Professional} />
      ))}
    </div>
  );
};

export default ProfessionalList;
