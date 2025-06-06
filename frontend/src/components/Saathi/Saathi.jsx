import React from "react";
import "./Saathi.scss";
import SaathiList from "./childs/SaathiList.jsx";
import SaathiForm from "./childs/SaathiForm.jsx";
import { useMyContext } from "../../context/categoryContext.jsx";

const Saathi = () => {
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
              Add Saathi
            </button>
          </div>
          <div className="main-content">
            <SaathiList />
          </div>
        </div>
      )}

      {view === "create" && <SaathiForm onSubmit={handleSubmit} />}

      {view === "edit" && (
        <SaathiForm initialData={singleID} onSubmit={handleUpdate} />
      )}
    </div>
  );
};

export default Saathi;
