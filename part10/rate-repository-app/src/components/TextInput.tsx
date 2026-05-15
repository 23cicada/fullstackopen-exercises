import {
  TextInput as NativeTextInput,
  StyleSheet,
  View,
  TextInputProps as NativeTextInputProps,
} from "react-native"
import Text from "./Text"
import theme from "../theme"

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  error: {
    color: theme.colors.error,
    marginTop: 4,
  },
})

interface TextInputProps extends NativeTextInputProps {
  error?: string | boolean
}

const TextInput = ({ error, ...props }: TextInputProps) => {
  return (
    <View>
      <NativeTextInput style={styles.input} {...props} />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

export default TextInput
