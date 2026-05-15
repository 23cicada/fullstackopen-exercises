import { AUTHENTICATE } from "../graphql/mutations";
import { useMutation, useApolloClient } from "@apollo/client/react";
import useAuthStorage from "./useAuthStorage";
import { useNavigate } from "react-router-native";
import { SignInFormValues } from "@/types";

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }: SignInFormValues) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });
    if (data?.authenticate) {
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      navigate("/");
    }
  };

  return { signIn, result };
};

export default useSignIn;
