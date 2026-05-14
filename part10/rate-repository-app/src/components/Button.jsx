import { Pressable, StyleSheet } from "react-native";
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
const Button = ({ children, style, ...props }) => {
  return (
    <Pressable {...props} style={[styles.button, style]}>
      <Text color="white" fontWeight="bold">
        {children}
      </Text>
    </Pressable>
  );
};

export default Button;
