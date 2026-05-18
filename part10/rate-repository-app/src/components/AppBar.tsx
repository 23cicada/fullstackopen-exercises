import { View, ScrollView, Pressable } from "react-native"
import Constants from "expo-constants"
import { Link } from "react-router-native"
import Text from "./Text"
import useIsSigned from "../hooks/useIsSigned"
import useSignOut from "../hooks/useSignOut"

const AppBar = () => {
  const { isSigned } = useIsSigned()
  const { signOut } = useSignOut()
  return (
    <View
      style={{ paddingTop: Constants.statusBarHeight }}
      className="bg-text-primary p-4"
    >
      <ScrollView horizontal contentContainerStyle={{ gap: 10 }}>
        <Link to="/">
          <Text type="nav">Repositories</Text>
        </Link>
        {isSigned ? (
          <>
            <Link to="/review">
              <Text type="nav">Create a review</Text>
            </Link>
            <Pressable onPress={signOut}>
              <Text type="nav">Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Text type="nav">Sign in</Text>
            </Link>
            <Link to="/signup">
              <Text type="nav">Sign up</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
