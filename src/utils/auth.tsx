import { useMemo } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import Router from "next/router";

export interface Auth {
  username: string;
  password: string;
}
export const signIn = async (data: Auth) => {
  try {
    await axios.post(`/api/authen`, data);
    Router.push(`/`);
  } catch (error: any) {
    showNotification({ message: error?.response?.data.message, color: "red" });
  }
};

export const signUp = async (data: Auth) => {
  try {
    await axios.post(`/api/register`, data);
    Router.push(`/login`);
  } catch (error: any) {
    showNotification({ message: error?.response?.data.message, color: "red" });
  }
};

export const signOut = async () => {
  await axios.post(`/api/signout`);
  Router.push(`/login`);
};

interface IuseAuth {
  auth?: {
    isLoggedIn: boolean;
    user: {
      username: string;
    } | null;
  };
  isLoading: boolean;
}
const useAuth = () => {
  const { data, isLoading } = useSWR(`/api/me`);

  const auth = useMemo(() => {
    return data;
  }, [data]);

  return { auth, isLoading } as IuseAuth;
};

export default useAuth;
