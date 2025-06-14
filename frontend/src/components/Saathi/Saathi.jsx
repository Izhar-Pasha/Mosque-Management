import React, { useCallback } from "react";
import "./Saathi.scss";
import SaathiList from "./childs/SaathiList.jsx";
import SaathiForm from "./childs/SaathiForm.jsx";
import { useMyContext } from "../../context/categoryContext.jsx";
import ManageToken from "../Error_Boundary/ManageToken.jsx";

const Saathi = () => {
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
        // console.log("thiss create:", data);

        return handleSubmit("Saathi", "create", "saathiKey", data);
      }
      if (view === "edit") {
        // console.log("thiss edit:", data);

        return handleUpdate("Saathi", "update", "saathiKey", data);
      }

      // console.warn("Unknown form view:", view);
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
        <div className="Saathi">
          <div className="saathi_btns">
            <button
              className="saathi_btn"
              onClick={() => {
                setView("create");
              }}
            >
              Add Saathi
            </button>
          </div>

          <SaathiList />
        </div>
      )}

      {view === "create" && <SaathiForm onSubmit={onSubmit} />}

      {view === "edit" && (
        <SaathiForm initialData={singleID} onSubmit={onSubmit} />
      )}
    </div>
  );
};

export default Saathi;
