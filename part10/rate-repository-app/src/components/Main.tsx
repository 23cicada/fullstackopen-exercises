import { View } from "react-native"
import RepositoryList from "./RepositoryList"
import AppBar from "./AppBar"
import { Route, Routes, Navigate } from "react-router-native"
import SignIn from "./SignIn"
import RepositoryView from "./RepositoryView"
import ReviewForm from "./ReviewForm"
import SignUp from "./SignUp"

const Main = () => {
  return (
    <View className="flex-1 bg-[#e1e4e8]">
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repository/:id" element={<RepositoryView />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
