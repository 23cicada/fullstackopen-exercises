import { Pressable, PressableProps } from "react-native"
import Text from "./Text"
import { cva, VariantProps } from "class-variance-authority"
import { cn } from "@/utils"

const buttonVariants = cva([], {
  variants: {
    type: {
      primary: "bg-primary p-3.5 rounded-md",
    },
  },
  defaultVariants: {
    type: "primary",
  },
})

interface ButtonProps
  extends PressableProps, VariantProps<typeof buttonVariants> {
  children: string
}

const Button = ({ children, type, className, ...props }: ButtonProps) => {
  return (
    <Pressable {...props} className={cn(buttonVariants({ type }), className)}>
      <Text className="text-center font-bold text-white">{children}</Text>
    </Pressable>
  )
}

export default Button
