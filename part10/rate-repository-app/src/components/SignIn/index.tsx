import { View, StyleSheet } from "react-native";
import theme from "../../theme";
import * as yup from "yup";
import { useFormik } from "formik";
import useSignIn from "../../hooks/useSignIn";
import TextInput from "../TextInput";
import Button from "../Button";
import { SignInFormValues } from "@/types";

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.white,
    display: "flex",
    rowGap: 20,
  },
});

interface SignInFormProps {
  onSubmit: (values: SignInFormValues) => void | Promise<void>;
}

export const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const formik = useFormik<SignInFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        error={formik.touched.username && formik.errors.username}
      />
      <TextInput
        error={formik.touched.password && formik.errors.password}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
      />
      <Button onPress={() => formik.handleSubmit()}>Sign in</Button>
    </View>
  );
};

const SignIn = () => {
  const { signIn } = useSignIn();

  const handleSubmit = async (values: SignInFormValues) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
    } catch (error) {
      console.log(error);
    }
  };
  return <SignInForm onSubmit={handleSubmit} />;
};

export default SignIn;
