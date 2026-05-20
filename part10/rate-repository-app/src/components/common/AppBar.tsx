import { View, ScrollView, StyleSheet } from "react-native"
import Constants from "expo-constants"
import { Link } from "@react-navigation/native"
import { Text } from "@/components/ui/text"
import useIsSigned from "@/hooks/useIsSigned"
import useSignOut from "@/hooks/useSignOut"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"

const styles = StyleSheet.create({
  link: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})
const AppBar = (props: NativeStackHeaderProps) => {
  const { isSigned } = useIsSigned()
  const { signOut } = useSignOut()
  return (
    <View
      style={{ paddingTop: Constants.statusBarHeight }}
      className="bg-primary p-4"
    >
      <ScrollView horizontal contentContainerStyle={{ gap: 10 }}>
        <Link screen="RepositoryList" style={styles.link}>
          Repositories
        </Link>
        {isSigned ? (
          <>
            <Link screen="ReviewForm" style={styles.link}>
              Create a review
            </Link>
            <Text onPress={signOut} style={styles.link}>
              Sign out
            </Text>
          </>
        ) : (
          <>
            <Link screen="SignIn" style={styles.link}>
              Sign in
            </Link>
            <Link screen="SignUp" style={styles.link}>
              Sign up
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
