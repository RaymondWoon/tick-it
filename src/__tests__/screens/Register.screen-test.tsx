/* src/__tests__/screens/Register.screen-test.tsx

/* Core */
import { render, screen } from "@testing-library/react-native";

/* Components */
//import RegisterScreen from "#screens/Register.screen";
import Register from "#app/register";

describe("<RegisterScreen />", () => {
  /* Test the logo */
  it("Should render the logo", () => {
    render(<Register />);

    const logo = screen.getByTestId("logo");
    expect(logo).toBeTruthy();
  });

  /* Test the application title */
  it("Should render the title of the app", () => {
    render(<Register />);

    const title = screen.getByText("Tick-it");
    expect(title).toBeTruthy();
  });

  /* Test the email input */
  it("Should render the email input", () => {
    render(<Register />);

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeTruthy();
  });

  /* Test the password input */
  it("Should render the password input", () => {
    render(<Register />);

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeTruthy();
  });

  /* Test the confirm password input */
  it("Should render the confirm password input", () => {
    render(<Register />);

    const passwordInput = screen.getByPlaceholderText("Confirm password");
    expect(passwordInput).toBeTruthy();
  });

  /* Test the register button */
  it("Should render the the register button", () => {
    render(<Register />);

    const registerBtn = screen.getByText("Create account");
    expect(registerBtn).toBeTruthy();
  });

  /* Test the sign-in text */
  it("Should render the sign up button description", () => {
    render(<Register />);

    const signupBtn = screen.getByText("Have an account? ");
    expect(signupBtn).toBeTruthy();
  });

  /* Test the sign-in button */
  it("Should render the sign up button description", () => {
    render(<Register />);

    const signupBtn = screen.getByText("Sign-in");
    expect(signupBtn).toBeTruthy();
  });
});
