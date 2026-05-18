import { Text as NativeText, TextProps as NativeTextProps } from "react-native"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/utils"

const textVariants = cva("text-text-primary", {
  variants: {
    type: {
      nav: "text-white font-bold",
      tag: "text-white bg-primary px-2 py-1 rounded",
      primary: "text-text-primary font-bold",
      secondary: "text-text-secondary text-sm",
    },
  },
})

interface TextProps
  extends NativeTextProps, VariantProps<typeof textVariants> {}

const Text = ({ style, type, className, ...props }: TextProps) => {
  return (
    <NativeText {...props} className={cn(textVariants({ type }), className)} />
  )
}

export default Text
