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
      contact: initialData.contact || "",
      landmark: initialData.landmark || "",
      waqt: initialData.waqt || "",
    },
  });

  return (
    <div className="student_form">
      <h1>{isEdit ? "Update Student" : "Create Student"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="student_form_content">
        <div className="student-content">
          <input
            type="text"
            placeholder="Name"
            className="inputField"
            {...register("name", { required: true })}
          />
          <input
            type="text"
            placeholder="Year"
            className="inputField"
            {...register("year", { required: true })}
          />

          <input
            type="text"
            placeholder="Branch"
            className="inputField"
            {...register("branch", { required: true })}
          />
          <input
            type="text"
            placeholder="College Name"
            className="inputField"
            {...register("collegeName", { required: true })}
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
            <option value="40">40</option>
            <option value="Behroon">Behroon</option>
          </select>
        </div>

        <div className="student-btns">
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
