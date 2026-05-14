import { View, StyleSheet } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import SignIn from "./SignIn";
import RepositoryView from "./RepositoryView";
import ReviewForm from "./ReviewForm";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e1e4e8",
    flex: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repository/:id" element={<RepositoryView />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/review" element={<ReviewForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
