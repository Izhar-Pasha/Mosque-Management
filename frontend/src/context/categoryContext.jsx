import React, { useCallback } from "react";
import { createContext, useContext, useState } from "react";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { API_Map, QueryKeys } from "../utils/utils.js";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [view, setView] = useState("list");
  const [category, setCategory] = useState("Saathi");
  const [operation, setOperation] = useState("get");
  const [singleID, SetSingleID] = useState(null);
  const [queryKey, setQuerykey] = useState("");

  const isEnabled = !!queryKey && !!API_Map[category]?.[operation];

  const { data, isloading } = useQuery({
    queryKey: [QueryKeys[queryKey]],
    queryFn: API_Map[category]?.[operation],
    enabled: isEnabled,
    onSuccess: () => toast.success("Successfully data fetched"),
    onError: (err) => toast.error("Error fetching data:", err.message),
  });

  // console.log("check:", data);

  // Query Client for useMutation...
  const queryClient = useQueryClient();

  // POST REQ: Dynamic Approach
  const CreateMember = useMutation({
    mutationFn: API_Map[category]?.[operation],
    enabled: isEnabled,
    onSuccess: () => {
      toast.success("Successfully create new saathi");
      queryClient.invalidateQueries({ queryKey: [QueryKeys[queryKey]] });
      setView("list");
    },
    onError: (err) => {
      toast.error("Unable to create new saathi:", err.message);
    },
  });

  // PUT REQ: UPDATE Dynamically
  const UpdateMember = useMutation({
    mutationFn: API_Map[category]?.[operation],
    enabled: isEnabled,
    onSuccess: () => {
      toast.success("Successfully updated saathi");
      queryClient.invalidateQueries({ queryKey: [QueryKeys[queryKey]] });
      setView("list");
    },
    onError: (err) => {
      toast.error("Unable to create new saathi:", err.message);
    },
  });

  // DELETE REQ: DELETES Dynamically
  const DeleteMember = useMutation({
    mutationFn: API_Map[category]?.[operation],
    enabled: isEnabled,
    onSuccess: () => {
      toast.success("Successfully deleted saathi");
      queryClient.invalidateQueries({ queryKey: ["Saathi"] });
      setView("list");
    },
    onError: (err) => {
      toast.error("Unable to delete saathi:", err.message);
    },
  });

  const handleEdit = useCallback(
    (id) => {
      SetSingleID(id);
      setView("edit");
    },
    [SetSingleID]
  );

  const handleSubmit = useCallback(
    (data) => {
      CreateMember.mutate(data);
    },
    [CreateMember]
  );

  const handleUpdate = useCallback(
    (data) => {
      if (singleID?.id) UpdateMember.mutate({ id: singleID.id, data });
    },
    [singleID, UpdateMember]
  );

  const handleCancel = useCallback(() => {
    setView("list");
  }, []);

  const handleDelete = useCallback(
    (id) => {
      DeleteMember.mutate(id);
      setView("list");
    },
    [DeleteMember]
  );

  return (
    <MyContext.Provider
      value={{
        data,
        isloading,
        handleEdit,
        handleSubmit,
        handleUpdate,
        handleCancel,
        handleDelete,
        view,
        setView,
        setCategory,
        setOperation,
        setQuerykey,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
