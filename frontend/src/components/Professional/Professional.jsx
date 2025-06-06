import React from "react";
// import "./Saathi.scss";
import ProfessionalList from "./childs/ProfessionalList.jsx";
import ProfessionalForm from "./childs/ProfessionalForm.jsx";
import { useMyContext } from "../../context/categoryContext.jsx";

const Professional = () => {
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
              Add Professional
            </button>
          </div>

          <ProfessionalList />
        </div>
      )}

      {view === "create" && <ProfessionalForm onSubmit={handleSubmit} />}

      {view === "edit" && (
        <ProfessionalForm initialData={singleID} onSubmit={handleUpdate} />
      )}
    </div>
  );
};

export default Professional;
