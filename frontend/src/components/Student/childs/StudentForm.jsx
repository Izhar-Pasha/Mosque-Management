import React from "react";
import { useForm } from "react-hook-form";
import { useMyContext } from "../../../context/categoryContext";

const StudentForm = ({ initialData = {}, onSubmit }) => {
  const { handleCancel } = useMyContext();

  const isEdit = Boolean(initialData && initialData._id);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: initialData.name || "",
      year: initialData.year || "",
      branch: initialData.branch || "",
      collegeName: initialData.collegeName || "",
      contact: initialData.branch || "",
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
          placeholder="Which Year"
          className="inputField"
          {...register("year")}
        />

        <input
          type="text"
          placeholder="Which Branch"
          className="inputField"
          {...register("branch")}
        />
        <input
          type="text"
          placeholder="College Name"
          className="inputField"
          {...register("collegeName")}
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
            {isEdit ? "Update Student" : "Create Student"}
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
