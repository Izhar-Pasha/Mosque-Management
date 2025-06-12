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

  const { data, isloading, isError, error } = useQuery({
    queryKey: [QueryKeys[queryKey]],
    queryFn: API_Map[category]?.[operation],
    enabled: isEnabled,
    retry: false,
    staleTime: 1000 * 60 * 2, // 5 minutes - consider data fresh
    cacheTime: 1000 * 60 * 1, // 10 minutes - keeps it in cache
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });

  // Query Client for useMutation...
  const queryClient = useQueryClient();

  // POST REQ: Dynamic Approach
  const CreateMember = useMutation({
    mutationFn: ({ data, category, operation }) => {
      console.log("Mutation got:", data);
      const fn = API_Map[category]?.[operation];
      if (!fn) throw new Error("Create function not found");
      return fn(data);
    },
    retry: false,
    onSuccess: () => {
      toast.success("Successfully create");
      queryClient.invalidateQueries({ queryKey: [QueryKeys[queryKey]] });
      setView("list");
    },
    onError: (err) => {
      toast.error("Unable to create:", err.message);
    },
  });

  // PUT REQ: UPDATE Dynamically
  const UpdateMember = useMutation({
    mutationFn: ({ id, data, category, operation }) => {
      console.log("Mutation got:", id, data);
      const fn = API_Map[category]?.[operation];
      if (!fn) throw new Error("Update function not found");
      return fn({ id, data });
    },
    retry: false,
    onSuccess: () => {
      toast.success("Successfully updated");
      queryClient.invalidateQueries({ queryKey: [QueryKeys[queryKey]] });
      setView("list");
    },
    onError: (err) => {
      toast.error("Unable to create:", err.message);
    },
  });

  // DELETE REQ: DELETES Dynamically
  const DeleteMember = useMutation({
    mutationFn: ({ id, category, operation }) => {
      console.log("Mutation got:", id, category, operation);
      const fn = API_Map[category]?.[operation];
      if (!fn) throw new Error("Delete function not found");
      return fn(id);
    },
    retry: false,
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries({ queryKey: [QueryKeys[queryKey]] });
    },
    onError: (err) => {
      toast.error("Unable to delete", err.message);
    },
  });

  const handleEdit = useCallback(
    (id) => {
      console.log("Object", id);
      SetSingleID(id);
      setView("edit");
    },
    [SetSingleID]
  );

  const handleSubmit = useCallback(
    (category, operation, key, data) => {
      console.log(key, category, operation, data);
      setQuerykey(key);
      CreateMember.mutate({ data, category, operation });
    },
    [CreateMember]
  );

  const handleUpdate = useCallback(
    (category, operation, key, data) => {
      console.log(category, operation, key);
      setQuerykey(key);
      UpdateMember.mutate({ id: singleID._id, data, category, operation });
    },
    [singleID, UpdateMember]
  );

  const handleCancel = useCallback(() => {
    setView("list");
  }, []);

  const handleDelete = useCallback(
    (category, operation, key, member) => {
      setQuerykey(key);
      DeleteMember.mutate({ id: member._id, category, operation });
      setView("list");
    },
    [DeleteMember, setQuerykey]
  );

  return (
    <MyContext.Provider
      value={{
        view,
        data: data || [],
        isError,
        error,
        isloading,
        singleID,
        setView,
        handleEdit,
        handleSubmit,
        handleUpdate,
        handleCancel,
        handleDelete,
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
