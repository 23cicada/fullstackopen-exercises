import { createContext } from "react"
import type AuthStorage from "../utils/authStorage"

const AuthStorageContext = createContext<AuthStorage>(null!)

export default AuthStorageContext
