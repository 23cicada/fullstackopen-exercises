import { RootStack } from "../components/Main"

type RootStackType = typeof RootStack

declare module "@react-navigation/core" {
  interface RootNavigator extends RootStackType {}
}
