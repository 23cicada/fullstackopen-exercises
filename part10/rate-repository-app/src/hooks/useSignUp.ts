import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "./useSignIn";
import { SignUpFormValues } from "@/types";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const { signIn } = useSignIn();

  const signUp = async ({ username, password }: SignUpFormValues) => {
    await mutate({ variables: { user: { username, password } } });
    signIn({ username, password });
  };

  return { signUp, result };
};

export default useSignUp;
