/* src/__tests__/screens/Register.screen-test.tsx

/* Core */
import { render, screen } from "@testing-library/react-native";

/* Components */
import SignUp from "#app/sign-up";

describe("<SignUpScreen />", () => {
  /* Test the logo */
  it("Should render the logo", () => {
    render(<SignUp />);

    const logo = screen.getByTestId("logo");
    expect(logo).toBeTruthy();
  });

  /* Test the application title */
  it("Should render the title of the app", () => {
    render(<SignUp />);

    const title = screen.getByText("Tick-it");
    expect(title).toBeTruthy();
  });

  /* Test the email input */
  it("Should render the email input", () => {
    render(<SignUp />);

    const emailInput = screen.getByPlaceholderText("Email");
    expect(emailInput).toBeTruthy();
  });

  /* Test the password input */
  it("Should render the password input", () => {
    render(<SignUp />);

    const passwordInput = screen.getByPlaceholderText("Password");
    expect(passwordInput).toBeTruthy();
  });

  /* Test the confirm password input */
  it("Should render the confirm password input", () => {
    render(<SignUp />);

    const passwordInput = screen.getByPlaceholderText("Confirm password");
    expect(passwordInput).toBeTruthy();
  });

  /* Test the register button */
  it("Should render the the register button", () => {
    render(<SignUp />);

    const registerBtn = screen.getByText("Sign Up");
    expect(registerBtn).toBeTruthy();
  });

  /* Test the sign-in text */
  it("Should render the sign up button description", () => {
    render(<SignUp />);

    const signupBtn = screen.getByText("Have an account? ");
    expect(signupBtn).toBeTruthy();
  });

  /* Test the sign-in button */
  it("Should render the sign in button description", () => {
    render(<SignUp />);

    const signinBtn = screen.getByText("Sign In");
    expect(signinBtn).toBeTruthy();
  });

  /* Test the icons in the password input field and showPassword */
  it("Should render the LockSimple icon", () => {
    render(<SignUp />);

    const showPwdIcon = screen.getByTestId("togglePwdIcon");
    const pwdIcon = screen.getByTestId(
      "phosphor-react-native-lock-simple-thin"
    );
    //const confirmPwdIcon = screen.getByTestId("phosphor-react-native-lock-thin")
    expect(showPwdIcon).toBeTruthy();
    expect(pwdIcon).toBeTruthy();
  });

  /* Test the icon in the password input field after pressing 'Show password' */
  // it("Should render the LockSimpleOpen icon when clicked one", async () => {
  //   render(<Register />);

  //   const user = userEvent.setup({
  //     advanceTimers: jest.advanceTimersByTime,
  //   });

  //   jest.useFakeTimers();

  //   const showPwdIcon = screen.getByTestId("showPwdIcon");

  //   act(() => {
  //     fireEvent.press(showPwdIcon);
  //   });

  //   const pwdIcon = screen.getByTestId(
  //     "phosphor-react-native-lock-simple-open"
  //   );

  //   expect(pwdIcon).toBeTruthy();
  // });

  /* Test the icons in the confirm password input field and showConfirmPassword */
  it("Should render the LockSimple icon when clicked one", () => {
    render(<SignUp />);

    const showPwdIcon = screen.getByTestId("toggleConfirmPwdIcon");
    const pwdIcon = screen.getByTestId("phosphor-react-native-lock-thin");

    expect(showPwdIcon).toBeTruthy();
    expect(pwdIcon).toBeTruthy();
  });

  /* Snapshot */
  it("Renders SignUp screen correctly", () => {
    const tree = render(<SignUp />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
