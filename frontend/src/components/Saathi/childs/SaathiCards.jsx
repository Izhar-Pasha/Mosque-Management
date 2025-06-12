import React from "react";
import "../Saathi.scss";
import Saathi from "../../Assets/Saathi.png";
import editIcon from "../../Assets/Edit.png";
import deleteIcon from "../../Assets/Delete.png";
import { useMyContext } from "../../../context/categoryContext";

const SaathiCards = ({ saathi }) => {
  const { handleDelete, handleEdit } = useMyContext();

  return (
    <div className="saathi_cards">
      <div className="saathi_Edit_btns">
        <img
          src={editIcon}
          alt="editIcon.png"
          className="saathi_btn"
          onClick={() => handleEdit(saathi)}
        />
        <img
          src={deleteIcon}
          alt="deleteIcon.png"
          className="saathi_btn"
          onClick={() => handleDelete("Saathi", "delete", "saathiKey", saathi)}
        />
      </div>
      <img src={Saathi} alt="SaathiImg.png" id="saathi_img" />
      <h1>{saathi.name}</h1>
      <div className="saathi_info">
        <div className="saathi-content">
          <h5>Work:</h5>
          <p>{saathi.work}</p>
        </div>
        <div className="saathi-content">
          <h5>Contact:</h5>
          <p>{saathi.contact}</p>
        </div>
        <div className="saathi-content">
          <h5>Location:</h5>
          <p>{saathi.landmark}</p>
        </div>
        <div className="saathi-content">
          <h5>Waqt:</h5>
          <p>{saathi.waqt}</p>
        </div>
      </div>
    </div>
  );
};

export default SaathiCards;
