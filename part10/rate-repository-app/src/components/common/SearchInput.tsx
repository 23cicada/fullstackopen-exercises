import {
  View,
  Pressable,
  type TextInputProps as NativeTextInputProps,
} from "react-native"
import { Search, X } from "lucide-react-native"
import { Icon } from "@/components/ui/icon"
import { Input } from "@/components/ui/input"
import { cn } from "@/utils/index"

interface SearchInputProps extends NativeTextInputProps {
  value?: string
  onChangeText?: (text: string) => void
  onClear?: () => void
  error?: string | boolean
  className?: string
}

const SearchInput = ({
  value,
  onChangeText,
  onClear,
  error,
  placeholder = "Search",
  className,
  ...props
}: SearchInputProps) => {
  const handleClear = () => {
    onChangeText?.("")
    onClear?.()
  }

  return (
    <View
      className={cn(
        "h-12 flex-row items-center rounded-full bg-white px-4",
        className,
      )}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        // Android
        elevation: 3,
      }}
    >
      <Icon as={Search} size={18} />
      <Input
        className="flex-1 border-0"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        {...props}
      />
      {!!value && (
        <Pressable onPress={handleClear}>
          <Icon as={X} size={18} />
        </Pressable>
      )}
    </View>
  )
}

export default SearchInput
