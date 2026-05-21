import RepositoryList from "./RepositoryList"
import AppBar from "@/components/common/AppBar"
import SignIn from "./SignIn"
import RepositoryView from "./RepositoryView"
import ReviewForm from "./ReviewForm"
import SignUp from "./SignUp"
import { createStaticNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/types"
import { NAV_THEME } from "@/lib/theme"
import { useColorScheme } from "react-native"
import MyReviews from "./MyReviews"

export const RootStack = createNativeStackNavigator<RootStackParamList>({
  initialRouteName: "RepositoryList",
  screenOptions: {
    header: (props) => <AppBar {...props} />,
    animation: "fade",
  },
  screens: {
    RepositoryList,
    RepositoryView,
    SignIn,
    ReviewForm,
    SignUp,
    MyReviews,
  },
})

const Navigation = createStaticNavigation(RootStack)

const Main = () => {
  const colorScheme = useColorScheme()
  const theme = NAV_THEME[colorScheme === "light" ? "light" : "dark"]
  return <Navigation theme={theme} />
}

export default Main
