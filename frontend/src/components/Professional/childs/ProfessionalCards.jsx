import React from "react";
import Professional from "../../Assets/Professional.png";
import editIcon from "../../Assets/Edit.png";
import deleteIcon from "../../Assets/Delete.png";
import { useMyContext } from "../../../context/categoryContext";

const ProfessionalCards = ({ professional }) => {
  const { handleDelete, handleEdit } = useMyContext();

  return (
    <div className="Prof_cards">
      <div className="Prof_Edit_btns">
        <img
          src={editIcon}
          alt="Edit"
          className="Prof_btn"
          onClick={() => handleEdit(professional)}
        />
        <img
          src={deleteIcon}
          alt="Delete"
          className="Prof_btn"
          onClick={() =>
            handleDelete(
              "Professional",
              "delete",
              "professionalKey",
              professional
            )
          }
        />
      </div>
      <img src={Professional} alt="ProfessionalImg.png" id="Prof_img" />
      <h1>{professional.name}</h1>
      <div className="prof_info">
        <div className="prof-content">
          <h5>Role:</h5>
          <p>{professional.role}</p>
        </div>
        <div className="prof-content">
          <h5>Company:</h5>
          <p>{professional.company}</p>
        </div>
        <div className="prof-content">
          <h5>Contact:</h5>
          <p>{professional.contact}</p>
        </div>
        <div className="prof-content">
          <h5>Landmark:</h5>
          <p>{professional.landmark}</p>
        </div>
        <div className="prof-content">
          <h5>Waqt:</h5>
          <p>{professional.waqt}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCards;
