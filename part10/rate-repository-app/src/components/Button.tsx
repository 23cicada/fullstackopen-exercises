import { Pressable, StyleSheet, PressableProps } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
  },
});

interface ButtonProps extends PressableProps {
  children: string;
}

const Button = ({ children, style, ...props }: ButtonProps) => {
  return (
    <Pressable
      {...props}
      style={(state) => [
        styles.button,
        typeof style === "function" ? style(state) : style,
      ]}
    >
      <Text color="white" fontWeight="bold">
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;
