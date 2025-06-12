import React from "react";
import "../Professional.scss";
import { useForm } from "react-hook-form";
import { useMyContext } from "../../../context/categoryContext";

const ProfessionalForm = ({ initialData = {}, onSubmit }) => {
  const { handleCancel } = useMyContext();

  const isEdit = Boolean(initialData && initialData._id);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: initialData.name || "",
      role: initialData.role || "",
      company: initialData.company || "",
      contact: initialData.contact || "",
      landmark: initialData.landmark || "",
      waqt: initialData.waqt || "",
    },
  });

  return (
    <div className="Prof_form">
      <h1>{isEdit ? "Update Professional" : "Create Professional"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="Prof_form_content">
        <div className="prof-content">
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
            {...register("role", { required: true })}
          />
          <input
            type="text"
            placeholder="Company Name"
            className="inputField"
            {...register("company", { required: true })}
          />
          <input
            type="number"
            placeholder="Contact Number"
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
            <option value="Behroon">Behroon</option>
          </select>
        </div>

        <div className="Prof-btns">
          <button type="submit">
            {isEdit ? "Update Professional" : "Create Professional"}
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalForm;
