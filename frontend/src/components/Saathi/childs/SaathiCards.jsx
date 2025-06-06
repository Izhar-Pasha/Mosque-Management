import React from "react";
import "../Saathi.scss";
import Saathi from "../../Assets/Saathi.png";
import editIcon from "../../Assets/Edit.png";
import deleteIcon from "../../Assets/Delete.png";
import { useMyContext } from "../../../context/categoryContext";

const SaathiCards = ({ saathi }) => {
  const { handleDelete, handleEdit } = useMyContext();

  return (
    <div className="cards">
      <div className="edit-btn">
        <img
          src={editIcon}
          alt="editIcon.png"
          id="edit-icon"
          onClick={() => handleEdit(saathi)}
        />
        <img
          src={deleteIcon}
          alt="deleteIcon.png"
          id="delete-icon"
          onClick={() => handleDelete(saathi._id)}
        />
      </div>
      <img src={Saathi} alt="SaathiImg.png" id="Profile-icon" />
      <h1>{saathi.name}</h1>
      <div className="info">
        <div className="info-content">
          <h5>Work</h5>
          <p>{saathi.work}</p>
        </div>
        <div className="info-content">
          <h5>Contact</h5>
          <p>{saathi.contact}</p>
        </div>
        <div className="info-content">
          <h5>Location</h5>
          <p>{saathi.landmark}</p>
        </div>
        <div className="info-content">
          <h5>Waqt</h5>
          <p>{saathi.waqt}</p>
        </div>
      </div>
    </div>
  );
};

export default SaathiCards;
