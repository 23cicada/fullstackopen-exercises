import {
  render,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react-native"
import { SignInForm } from "../../components/SignIn"

describe("signIn", () => {
  it("calls function provided by onSubmit prop after pressing the submit button", async () => {
    const onSubmit = jest.fn()

    render(<SignInForm onSubmit={onSubmit} />)

    fireEvent.changeText(screen.getByPlaceholderText("Username"), "username")
    fireEvent.changeText(screen.getByPlaceholderText("Password"), "password")
    fireEvent.press(screen.getByText("Sign in"))

    // Formik's form submissions are asynchronous
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "username",
        password: "password",
      })
    })
  })
})
