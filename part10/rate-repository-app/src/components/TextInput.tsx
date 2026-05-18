import {
  TextInput as NativeTextInput,
  View,
  TextInputProps as NativeTextInputProps,
} from "react-native"
import Text from "./Text"

interface TextInputProps extends NativeTextInputProps {
  error?: string | boolean
}

const TextInput = ({ error, ...props }: TextInputProps) => {
  return (
    <View>
      <NativeTextInput
        className="rounded-md border border-text-primary px-2.5"
        {...props}
      />
      {error && <Text className="mt-1 text-error">{error}</Text>}
    </View>
  )
}

export default TextInput
