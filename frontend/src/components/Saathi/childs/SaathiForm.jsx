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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <input
          type="text"
          placeholder="Name of the Saathi"
          className="inputField"
          {...register("name")}
        />
        <input
          type="text"
          placeholder="Work of the Saathi"
          className="inputField"
          {...register("work")}
        />
        <input
          type="number"
          placeholder="Number of the Saathi"
          className="inputField"
          {...register("contact")}
        />
        <input
          type="text"
          placeholder="Landmark"
          className="inputField"
          {...register("landmark")}
        />
        <select {...register("waqt")}>
          <option value="0">0</option>
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="40">40</option>
          <option value="40">40</option>
          <option value="Behroon">Behroon</option>
        </select>

        <div className="btns">
          <button type="submit" className="btn">
            {isEdit ? "Update Saathi" : "Create Saathi"}
          </button>
          <button type="button" onClick={handleCancel} className="btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SaathiForm;
