import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ManageToken = ({ error }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (error?.response?.status === 401) {
      toast.error("Login is expired");
      navigate("/");
    } else {
      console.error("Error:", error?.response?.data.message);
    }
  }, [error, navigate]);

  return null;
};

export default ManageToken;
