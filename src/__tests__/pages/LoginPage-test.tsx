/* src/__tests__/pages/LoginPage-test.tsx

/* Core */
import { render, screen } from "@testing-library/react-native";

/* Components */
import LoginPage from "#pages/LoginPage";

describe("<LoginPage />", () => {
  /* Test the logo */
  it("Should render the logo", () => {
    render(<LoginPage />);

    const logo = screen.getByRole("img");
    expect(logo).toBeOnTheScreen();
  });

  /* Test the application title */
  it("Should render the title of the app", () => {
    render(<LoginPage />);

    const title = screen.getByText("Tick-it");
    expect(title).toBeTruthy();
  });

  /* Test the email input */
  it("Should render the email input", () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeTruthy();
  });

  /* Test the password input */
  it("Should render the password input", () => {
    render(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeTruthy();
  });

  /* Test the sign-in button */
  it("Should render the the sign-in button", () => {
    render(<LoginPage />);

    const signinBtn = screen.getByText("Sign-in");
    expect(signinBtn).toBeTruthy();
  });

  /* Test the forget password button */
  it("Should render the forget password button", () => {
    render(<LoginPage />);

    const forgetPwdBtn = screen.getByText("Forgot password?");
    expect(forgetPwdBtn).toBeTruthy();
  });

  /* Test the sign up button */
  it("Should render the sign up button", () => {
    render(<LoginPage />);

    const signupBtn = screen.getByText("Don't have an account? Sign-up");
    expect(signupBtn).toBeTruthy();
  });
});
