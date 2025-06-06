import React from "react";
import StudentCards from "./StudentCards.jsx";
import { useMyContext } from "../../../context/categoryContext.jsx";

const StudentList = () => {
  const { data } = useMyContext();

  return (
    <div className="list-details">
      {data?.map((student) => (
        <StudentCards key={student._id} student={student} />
      ))}
    </div>
  );
};

export default StudentList;
