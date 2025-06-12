import React from "react";
import StudentCards from "./StudentCards.jsx";
import { useMyContext } from "../../../context/categoryContext.jsx";

const StudentList = () => {
  const { data } = useMyContext();

  if (!Array.isArray(data)) {
    return <p>Data is invalid</p>;
  }

  return (
    <div className="student_list">
      {data?.length === 0 ? (
        <p>No Student Found</p>
      ) : (
        data.map((student) => (
          <StudentCards key={student._id} student={student} />
        ))
      )}
    </div>
  );
};

export default StudentList;
