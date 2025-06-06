import React from "react";
import Student from "../../Assets/Student.png";
import editIcon from "../../Assets/Edit.png";
import deleteIcon from "../../Assets/Delete.png";
import { useMyContext } from "../../../context/categoryContext";

const StudentCards = ({ student }) => {
  const { handleDelete, handleEdit } = useMyContext();

  return (
    <div className="cards">
      <div className="edit-btn">
        <img
          src={editIcon}
          alt="editIcon.png"
          id="edit-icon"
          onClick={() => handleEdit(student)}
        />
        <img
          src={deleteIcon}
          alt="deleteIcon.png"
          id="delete-icon"
          onClick={() => handleDelete(student._id)}
        />
      </div>
      <img src={Student} alt="StudentImg.png" id="Profile-icon" />
      <h1>{student.name}</h1>
      <div className="info">
        <div className="info-content">
          <h5>Year</h5>
          <p>{student.year}</p>
        </div>

        <div className="info-content">
          <h5>Branch</h5>
          <p>{student.branch}</p>
        </div>

        <div className="info-content">
          <h5>College Name</h5>
          <p>{student.collegeName}</p>
        </div>
        <div className="info-content">
          <h5>Contact</h5>
          <p>{student.contact}</p>
        </div>
        <div className="info-content">
          <h5>Landmark</h5>
          <p>{student.landmark}</p>
        </div>
        <div className="info-content">
          <h5>Waqt</h5>
          <p>{student.waqt}</p>
        </div>
      </div>
    </div>
  );
};

export default StudentCards;
