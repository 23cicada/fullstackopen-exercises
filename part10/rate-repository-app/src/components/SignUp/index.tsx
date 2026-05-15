import { View, StyleSheet } from "react-native";
import theme from "../../theme";
import TextInput from "../TextInput";
import Button from "../Button";
import * as yup from "yup";
import { useFormik } from "formik";
import useSignUp from "../../hooks/useSignUp";
import Text from "../Text";

const validationSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(5, "Username must be at least 5 characters long")
    .max(30, "Username must be less than 30 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long")
    .max(50, "Password must be less than 50 characters long"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Password confirmation is required"),
});

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: theme.colors.white,
    display: "flex",
    rowGap: 20,
  },
});

const SignUp = () => {
  const { signUp, result } = useSignUp();
  const error = result.error?.message;
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit: async ({ username, password }) => {
      await signUp({ username, password });
    },
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
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        error={formik.touched.password && formik.errors.password}
      />
      <TextInput
        placeholder="Password confirmation"
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        onBlur={formik.handleBlur("passwordConfirmation")}
        error={
          formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation
        }
      />
      <Button onPress={() => formik.handleSubmit()}>Sign up</Button>
      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
    </View>
  );
};

export default SignUp;
