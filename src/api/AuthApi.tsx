import { NavListUser } from "@/components/MainUsersNav";
import { LoginFormData } from "@/forms/login-form/LoginForm";
import { User } from "@/types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useValidateToken = () => {
  const validateTokenRequest = async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Token invalid");
    }
    return response.json();
  };

  const { data: auth, isError } = useQuery(
    "validateToken",
    validateTokenRequest,
    {
      retry: false,
    }
  );

  return {
    auth,
    isError,
  };
};

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginRequest = async (formData: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to get user");
    }
    const data = await response.json();

    return data.userId;
  };
  const {
    mutateAsync: userLogin,
    isLoading,
    error,
    reset,
  } = useMutation(loginRequest, {
    onSuccess: async (data) => {
      await queryClient.invalidateQueries("validateToken");
      toast.success("User login!");
      navigate(`/user-profile/${data}`);
    },
  });

  if (error) {
    toast.error("Unable to log in");
    reset();
  }

  return { userLogin, isLoading };
};

export const useGetAllUsers = () => {
  const getAllUsersRequest = async (): Promise<NavListUser[]> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/users`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to get user");
    }
    return response.json();
  };
  const { data: users, isError } = useQuery("getAllUsers", getAllUsersRequest, {
    retry: false,
  });

  return {
    users,
    isError,
  };
};
