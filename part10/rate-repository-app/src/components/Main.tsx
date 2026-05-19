import { View } from "react-native"
import RepositoryList from "./RepositoryList"
import AppBar from "./AppBar"
// import { Route, Routes, Navigate } from "react-router-native"
import SignIn from "./SignIn"
import RepositoryView from "./RepositoryView"
import ReviewForm from "./ReviewForm"
import SignUp from "./SignUp"
import { createStaticNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { RootStackParamList } from "@/types"

// `createNativeStackNavigator` takes a configuration object containing the screens to include, as well as various other options.
export const RootStack = createNativeStackNavigator<RootStackParamList>({
  // To specify what the initial route in a stack is, provide an initialRouteName option for the navigator.
  initialRouteName: "RepositoryList",
  // To apply the same options to all screens, we can use screenOptions on the navigator
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
  },
})

// `createStaticNavigation` takes the navigator and returns a component to render in the app. It should only be called once.
const Navigation = createStaticNavigation(RootStack)

const Main = () => {
  return (
    <View className="flex-1 bg-[#e1e4e8]">
      <Navigation />
      {/* <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repository/:id" element={<RepositoryView />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes> */}
    </View>
  )
}

export default Main
