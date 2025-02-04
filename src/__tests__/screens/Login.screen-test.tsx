/* src/__tests__/screens/Login.screen-test.tsx

/* Core */
import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";
//import { renderRouter } from "expo-router/testing-library";
// import {
//   act,
//   renderRouter,
//   screen as expo_screen,
//   waitFor,
// } from "expo-router/testing-library";

/* Components */
//import LoginScreen from "#screens/Login.screen";
import Login from "#app";
import Register from "#app/register";

describe("<LoginScreen />", () => {
  /* Test the logo */
  it("Should render the logo", () => {
    render(<Login />);

    const logo = screen.getByTestId("logo");
    expect(logo).toBeTruthy();
  });

  /* Test the application title */
  it("Should render the title of the app", () => {
    render(<Login />);

    const title = screen.getByText("Tick-it");
    expect(title).toBeTruthy();
  });

  /* Test the email input */
  it("Should render the email input", () => {
    render(<Login />);

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeTruthy();
  });

  /* Test the password input */
  it("Should render the password input", () => {
    render(<Login />);

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeTruthy();
  });

  /* Test the sign-in button */
  it("Should render the the sign-in button", () => {
    render(<Login />);

    const signinBtn = screen.getByText("Sign-in");
    expect(signinBtn).toBeTruthy();
  });

  /* Test the forget password button */
  it("Should render the forget password button", () => {
    render(<Login />);

    const forgetPwdBtn = screen.getByText("Forgot password?");
    expect(forgetPwdBtn).toBeTruthy();
  });

  /* Test the sign up text */
  it("Should render the sign up button", () => {
    render(<Login />);

    const signupBtn = screen.getByText("Don't have an account? ");
    expect(signupBtn).toBeTruthy();
  });

  /* Test the sign-up button */
  it("Should render the sign up button", () => {
    render(<Login />);

    const signupBtn = screen.getByText("Sign-up");
    expect(signupBtn).toBeTruthy();
  });

  /* Test the Sign-up press event */
  //it("Should display the register screen", async () => {
  //render(<Login />);

  //const user = userEvent.setup();

  // renderRouter({
  //   "/login": Login,
  //   "/register": Register,
  // });

  // try {
  //   await user.press(screen.getByRole("Pressable", { name: "Sign-up" }));
  // } catch (error) {
  //   console.log(error);
  // }

  //const signupBtn = screen.getByText("Sign-up");
  //expect(signupBtn).toBeTruthy();

  //await user.press(signupBtn);

  //fireEvent.press(signupBtn);

  //expect(screen.getByText("Create account")).toBeOnTheScreen();

  //expect(screen).toHavePathname("/register");
  //});
});
