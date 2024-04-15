import { User } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetAccount = (userId?: string) => {
  const createGetUserRequest = async (): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to get user");
    }

    return response.json();
  };

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery("fetchUser", createGetUserRequest, {
    enabled: !!userId,
  });

  return { user, isLoading, isError, refetch };
};

export const useCreateAccount = () => {
  const createAccountRequest = async (
    accountFormData: FormData
  ): Promise<string> => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
      method: "POST",
      body: accountFormData,
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to create account");
    }
    return response.json();
  };

  const {
    mutateAsync: createAccount,
    isLoading,
    isSuccess,
    error,
    reset,
    data: userId,
  } = useMutation(createAccountRequest);

  if (isSuccess) {
    toast.success("User created!");
    reset();
  }

  if (error) {
    toast.error("Unable to create user");
    reset();
  }

  return { createAccount, isLoading, isSuccess, userId };
};

export const useUpdateAccount = (userId?: string) => {
  const updateUserRequest = async (
    accountFormData: FormData
  ): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/api/users/${userId}`, {
      method: "PUT",
      body: accountFormData,
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to update account");
    }
    return response.json();
  };

  const {
    mutateAsync: updateAccount,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateUserRequest);

  if (isSuccess) {
    toast.success("User updated!");
    reset();
  }

  if (error) {
    toast.error("Unable to update user");
    reset();
  }

  return { isLoading, updateAccount, isSuccess };
};
