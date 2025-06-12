import React, { useCallback } from "react";
import "./Professional.scss";
import ProfessionalList from "./childs/ProfessionalList.jsx";
import ProfessionalForm from "./childs/ProfessionalForm.jsx";
import { useMyContext } from "../../context/categoryContext.jsx";
import ManageToken from "../Error_Boundary/ManageToken.jsx";

const Professional = () => {
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

        return handleSubmit("Professional", "create", "professionalKey", data);
      }
      if (view === "edit") {
        console.log("thiss edit:", data);

        return handleUpdate("Professional", "update", "professionalKey", data);
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
        <div className="Professional">
          <div className="Prof_btns">
            <button
              className="Prof_btn"
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

      {view === "create" && <ProfessionalForm onSubmit={onSubmit} />}

      {view === "edit" && (
        <ProfessionalForm initialData={singleID} onSubmit={onSubmit} />
      )}
    </div>
  );
};

export default Professional;
