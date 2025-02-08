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
import SignIn from "#app/sign-in";

describe("<SignInScreen />", () => {
  /* Test the logo */
  it("Should render the logo", () => {
    render(<SignIn />);

    const logo = screen.getByTestId("logo");
    expect(logo).toBeTruthy();
  });

  /* Test the application title */
  it("Should render the title of the app", () => {
    render(<SignIn />);

    const title = screen.getByText("Welcome to Tick-it");
    expect(title).toBeTruthy();
  });

  /* Test the email input */
  it("Should render the email input", () => {
    render(<SignIn />);

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeTruthy();
  });

  /* Test the password input */
  it("Should render the password input", () => {
    render(<SignIn />);

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeTruthy();
  });

  /* Test the sign-in button */
  it("Should render the the sign-in button", () => {
    render(<SignIn />);

    const signinBtn = screen.getByText("Sign In");
    expect(signinBtn).toBeTruthy();
  });

  /* Test the forget password button */
  // it("Should render the forget password button", () => {
  //   render(<SignIn />);

  //   const forgetPwdBtn = screen.getByText("Forgot password?");
  //   expect(forgetPwdBtn).toBeTruthy();
  // });

  /* Test the sign up text */
  it("Should render the sign up button", () => {
    render(<SignIn />);

    const signupBtn = screen.getByText("Don't have an account? ");
    expect(signupBtn).toBeTruthy();
  });

  /* Test the sign-up button */
  it("Should render the sign up button", () => {
    render(<SignIn />);

    const signupBtn = screen.getByText("Sign Up");
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

  /* Snapshot */
  it("Renders SignIn screen correctly", () => {
    const tree = render(<SignIn />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
