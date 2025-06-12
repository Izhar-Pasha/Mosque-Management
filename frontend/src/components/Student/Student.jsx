import React, { useCallback } from "react";
import StudentList from "./childs/StudentList.jsx";
import StudentForm from "./childs/StudentForm.jsx";
import { useMyContext } from "../../context/categoryContext.jsx";
import ManageToken from "../Error_Boundary/ManageToken.jsx";
import "./Student.scss";

const Student = () => {
  const {
    isloading,
    isError,
    error,
    view,
    setView,
    handleSubmit,
    handleUpdate,
    singleID,
  } = useMyContext();

  const onSubmit = useCallback(
    (data) => {
      if (view === "create") {
        console.log("thiss create:", data);

        return handleSubmit("Student", "create", "studentKey", data);
      }
      if (view === "edit") {
        console.log("thiss edit:", data);

        return handleUpdate("Student", "update", "studentKey", data);
      }

      console.warn("Unknown form view:", view);
      return;
    },
    [view, handleSubmit, handleUpdate]
  );

  if (isError && error) {
    return <ManageToken error={error} />;
  }

  if (isloading) return <p>Loading...</p>;

  return (
    <div>
      {view === "list" && (
        <div className="Student">
          <div className="student_btns">
            <button
              className="student_btn"
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

      {view === "create" && <StudentForm onSubmit={onSubmit} />}

      {view === "edit" && (
        <StudentForm initialData={singleID} onSubmit={onSubmit} />
      )}
    </div>
  );
};

export default Student;
