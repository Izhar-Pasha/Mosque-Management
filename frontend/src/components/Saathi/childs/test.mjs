// const [view, setView] = useState("list");
// const [selectSaathi, setSelectSaathi] = useState(null);

// const { data, isloading } = useQuery({
//   queryKey: ["Saathi"],
//   queryFn: getSaathi,
//   onSuccess: () => toast.success("Successfully data fetched"),
//   onError: (err) => toast.error("Error fetching data:", err.message),
// });

// // Query Client for useMutation...
// const queryClient = useQueryClient();

// // POST REQ: CREATES NEW SAATHI
// const CreateSaathi = useMutation({
//   mutationFn: createSaathi,
//   onSuccess: () => {
//     toast.success("Successfully create new saathi");
//     queryClient.invalidateQueries({ queryKey: ["Saathi"] });
//     setView("list");
//   },
//   onError: (err) => {
//     toast.error("Unable to create new saathi:", err.message);
//   },
// });

// // PUT REQ: UPDATE SAATHI
// const UpdateSaathi = useMutation({
//   mutationFn: updateSaathi,
//   onSuccess: () => {
//     toast.success("Successfully updated saathi");
//     queryClient.invalidateQueries({ queryKey: ["Saathi"] });
//     setView("list");
//   },
//   onError: (err) => {
//     toast.error("Unable to create new saathi:", err.message);
//   },
// });

// // DELETE REQ: DELETES SAATHI
// const DeleteSaathi = useMutation({
//   mutationFn: deleteSaathi,
//   onSuccess: () => {
//     toast.success("Successfully deleted saathi");
//     queryClient.invalidateQueries({ queryKey: ["Saathi"] });
//     setView("list");
//   },
//   onError: (err) => {
//     toast.error("Unable to delete saathi:", err.message);
//   },
// });

// const handleEdit = useCallback(
//   (saathi) => {
//     setSelectSaathi(saathi);
//     setView("edit");
//   },
//   [setSelectSaathi]
// );

// const handleDelete = useCallback(
//   (id) => {
//     DeleteSaathi.mutate(id);
//   },
//   [DeleteSaathi]
// );

// const handleSubmit = useCallback(
//   (data) => {
//     CreateSaathi.mutate(data);
//   },
//   [CreateSaathi]
// );

// const handleUpdate = useMutation(
//   (data) => {
//     if (selectSaathi?.id) UpdateSaathi.mutate({ id: selectSaathi.id, data });
//   },
//   [selectSaathi, UpdateSaathi]
// );

// const handleCancel = useCallback(() => {
//   setView("list");
// }, []);
