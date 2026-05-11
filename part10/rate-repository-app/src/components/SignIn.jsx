import { View, TextInput, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as yup from "yup";
import { useFormik } from "formik";

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
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  signInButton: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 14,
    borderRadius: 6,
    textAlign: "center",
  },
  errorText: {
    color: theme.colors.error,
    marginTop: 4,
  },
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => console.log(values),
  });
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange("username")}
          onBlur={formik.handleBlur("username")}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={styles.errorText}>{formik.errors.username}</Text>
        )}
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange("password")}
          onBlur={formik.handleBlur("password")}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={styles.errorText}>{formik.errors.password}</Text>
        )}
      </View>
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.signInButton} fontWeight="bold">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
