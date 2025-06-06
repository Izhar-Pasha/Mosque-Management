import React from "react";
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          className="inputField"
          {...register("name")}
        />
        <input
          type="text"
          placeholder="Work"
          className="inputField"
          {...register("role")}
        />
        <input
          type="text"
          placeholder="Company Name"
          className="inputField"
          {...register("company")}
        />
        <input
          type="number"
          placeholder="Contact Number"
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
