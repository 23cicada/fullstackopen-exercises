import { View, TextInputProps as NativeTextInputProps } from "react-native"
import { Text } from "@/components/ui/text"
import { Input } from "@/components/ui/input"

interface TextInputProps extends NativeTextInputProps {
  error?: string | boolean
}

const TextInput = ({ error, ...props }: TextInputProps) => {
  return (
    <View className="gap-y-1">
      <Input {...props} className="border-text-primary" />
      {error && <Text variant="error">{error}</Text>}
    </View>
  )
}

export default TextInput
