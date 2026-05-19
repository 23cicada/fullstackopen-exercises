import { View, ScrollView, Pressable, TextStyle } from "react-native"
import Constants from "expo-constants"
import { Link } from "@react-navigation/native"
import Text from "./Text"
import useIsSigned from "../hooks/useIsSigned"
import useSignOut from "../hooks/useSignOut"
import { NativeStackHeaderProps } from "@react-navigation/native-stack"
import { ComponentProps } from "react"

const AppBarLink = (props: ComponentProps<typeof Link>) => {
  const style: TextStyle = {
    color: "white",
    fontWeight: "bold",
  }
  return <Link {...props} style={style} />
}

const AppBar = (props: NativeStackHeaderProps) => {
  const { isSigned } = useIsSigned()
  const { signOut } = useSignOut()
  return (
    <View
      style={{ paddingTop: Constants.statusBarHeight }}
      className="bg-text-primary p-4"
    >
      <ScrollView horizontal contentContainerStyle={{ gap: 10 }}>
        <AppBarLink screen="RepositoryList" className="text-white">
          Repositories
        </AppBarLink>
        {isSigned ? (
          <>
            <AppBarLink screen="ReviewForm">Create a review</AppBarLink>
            <Pressable onPress={signOut}>
              <Text type="nav">Sign out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <AppBarLink screen="SignIn">Sign in</AppBarLink>
            <AppBarLink screen="SignUp">Sign up</AppBarLink>
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
