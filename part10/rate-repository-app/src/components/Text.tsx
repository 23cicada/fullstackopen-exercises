import {
  Text as NativeText,
  StyleSheet,
  TextProps as NativeTextProps,
} from "react-native"

import theme from "../theme"

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorWhite: {
    color: theme.colors.white,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  backgroundPrimary: {
    backgroundColor: theme.colors.primary,
  },
})

interface TextProps extends NativeTextProps {
  color?: "textSecondary" | "primary" | "white"
  fontSize?: "subheading"
  fontWeight?: "bold"
}

const Text = ({ color, fontSize, fontWeight, style, ...props }: TextProps) => {
  const textStyle = [
    styles.text,
    color === "textSecondary" && styles.colorTextSecondary,
    color === "primary" && styles.colorPrimary,
    color === "white" && styles.colorWhite,
    fontSize === "subheading" && styles.fontSizeSubheading,
    fontWeight === "bold" && styles.fontWeightBold,
    style,
  ]

  return <NativeText style={textStyle} {...props} />
}

export default Text
