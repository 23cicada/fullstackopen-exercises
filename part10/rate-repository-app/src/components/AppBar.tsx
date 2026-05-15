import { View, StyleSheet, ScrollView, Pressable } from "react-native"
import Constants from "expo-constants"
import theme from "../theme"
import { Link } from "react-router-native"
import Text from "./Text"
import useIsSigned from "../hooks/useIsSigned"
import useSignOut from "../hooks/useSignOut"

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
  },
})

const AppBar = () => {
  const { isSigned } = useIsSigned()
  const { signOut } = useSignOut()
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={{ gap: 10 }}>
        <Link to="/">
          <Text color="white" fontWeight="bold">
            Repositories
          </Text>
        </Link>
        {isSigned ? (
          <>
            <Link to="/review">
              <Text color="white" fontWeight="bold">
                Create a review
              </Text>
            </Link>
            <Pressable onPress={signOut}>
              <Text color="white" fontWeight="bold">
                Sign out
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Text color="white" fontWeight="bold">
                Sign in
              </Text>
            </Link>
            <Link to="/signup">
              <Text color="white" fontWeight="bold">
                Sign up
              </Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
