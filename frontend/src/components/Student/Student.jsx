import React from "react";
import StudentList from "./childs/StudentList.jsx";
import StudentForm from "./childs/StudentForm.jsx";
import { useMyContext } from "../../context/categoryContext.jsx";

const Student = () => {
  const { isloading, view, setView, handleSubmit, handleUpdate, singleID } =
    useMyContext();

  if (isloading) return <p>Loading...</p>;

  return (
    <div>
      {view === "list" && (
        <div className="list">
          <div className="btns">
            <button
              className="btn"
              onClick={() => {
                setView("create");
              }}
            >
              Add Student
            </button>
          </div>

          <StudentList />
        </div>
      )}

      {view === "create" && <StudentForm onSubmit={handleSubmit} />}

      {view === "edit" && (
        <StudentForm initialData={singleID} onSubmit={handleUpdate} />
      )}
    </div>
  );
};

export default Student;
