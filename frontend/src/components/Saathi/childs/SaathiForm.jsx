import React from "react";
import "../Saathi.scss";
import { useForm } from "react-hook-form";
import { useMyContext } from "../../../context/categoryContext";

const SaathiForm = ({ initialData = {}, onSubmit }) => {
  const { handleCancel } = useMyContext();

  const isEdit = Boolean(initialData && initialData._id);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: initialData.name || "",
      work: initialData.work || "",
      contact: initialData.contact || "",
      landmark: initialData.landmark || "",
      waqt: initialData.waqt || "",
    },
  });

  return (
    <div className="saathi_form">
      <h1>{isEdit ? "Update Saathi" : "Create Saathi"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="saathi_form_content">
        <div className="saathi-content">
          <input
            type="text"
            placeholder="Name"
            className="inputField"
            {...register("name", { required: true })}
          />
          <input
            type="text"
            placeholder="Work"
            className="inputField"
            {...register("work", { required: true })}
          />
          <input
            type="number"
            placeholder="Number"
            className="inputField"
            {...register("contact", { required: true })}
          />
          <input
            type="text"
            placeholder="Landmark"
            className="inputField"
            {...register("landmark", { required: true })}
          />
          <select {...register("waqt", { required: true })}>
            <option value="" disabled>
              Select waqt
            </option>
            <option value="0">0</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="40">40</option>
            <option value="40">40</option>
            <option value="Behroon">Behroon</option>
          </select>
        </div>

        <div className="saathi-btns">
          <button type="submit">
            {isEdit ? "Update Saathi" : "Create Saathi"}
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SaathiForm;
