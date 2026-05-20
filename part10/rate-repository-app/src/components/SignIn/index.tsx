import { View } from "react-native"
import * as yup from "yup"
import { useFormik } from "formik"
import useSignIn from "@/hooks/useSignIn"
import TextInput from "@/components/common/TextInput"
import { Button } from "@/components/ui/button"
import { SignInFormValues } from "@/types"
import { Text } from "@/components/ui/text"

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
})

interface SignInFormProps {
  onSubmit: (values: SignInFormValues) => void | Promise<void>
}

export const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const formik = useFormik<SignInFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  })
  return (
    <View className="gap-y-5 bg-white p-4">
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
      <Button onPress={() => formik.handleSubmit()} variant="brand">
        <Text>Sign in</Text>
      </Button>
    </View>
  )
}

const SignIn = () => {
  const { signIn } = useSignIn()

  const handleSubmit = async (values: SignInFormValues) => {
    const { username, password } = values
    try {
      await signIn({ username, password })
    } catch (error) {
      console.log(error)
    }
  }
  return <SignInForm onSubmit={handleSubmit} />
}

export default SignIn
