import React from "react";
import Professional from "../../Assets/Professional.png";
import editIcon from "../../Assets/Edit.png";
import deleteIcon from "../../Assets/Delete.png";
import { useMyContext } from "../../../context/categoryContext";

const ProfessionalCards = ({ professional }) => {
  const { handleDelete, handleEdit } = useMyContext();

  return (
    <div className="cards">
      <div className="edit-btn">
        <img
          src={editIcon}
          alt="editIcon.png"
          id="edit-icon"
          onClick={() => handleEdit(professional)}
        />
        <img
          src={deleteIcon}
          alt="deleteIcon.png"
          id="delete-icon"
          onClick={() => handleDelete(professional._id)}
        />
      </div>
      <img src={Professional} alt="ProfessionalImg.png" id="Profile-icon" />
      <h1>{professional.name}</h1>
      <div className="info">
        <div className="info-content">
          <h5>Role</h5>
          <p>{professional.role}</p>
        </div>
        <div className="info-content">
          <h5>Company</h5>
          <p>{professional.company}</p>
        </div>
        <div className="info-content">
          <h5>Contact</h5>
          <p>{professional.contact}</p>
        </div>
        <div className="info-content">
          <h5>Landmark</h5>
          <p>{professional.landmark}</p>
        </div>
        <div className="info-content">
          <h5>Waqt</h5>
          <p>{professional.waqt}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCards;
