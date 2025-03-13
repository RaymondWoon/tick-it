/* src/__tests__/screens/Signup.screen-test.tsx */

// ==================================================
// Core
// ==================================================
import {
  cleanup,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";

// ==================================================
// Components
// ==================================================
import SignUp from "#app/sign-up";

/* Cleanup after each test */
afterEach(cleanup);

describe("<SignUpScreen />", () => {
  /* Test the logo */
  it("Should render the logo", async () => {
    /* render the SignIn page */
    const page = render(<SignUp />);

    /* get a reference to the logo */
    const logo = screen.getByTestId("logo");

    /* test to see if on screen */
    await waitFor(() => {
      expect(logo).toBeOnTheScreen();
    });
  });

  /* Test the application title */
  it("Should render the title of the app", async () => {
    /* render the SignIn page */
    const page = render(<SignUp />);

    /* get a reference to the title */
    const title = screen.getByText("Tick-it");

    /* test to see if on screen */
    await waitFor(() => {
      expect(title).toBeOnTheScreen();
    });
  });

  /* Test the username input */
  it("Should render the username input", async () => {
    /* render the SignIn page */
    const page = render(<SignUp />);

    /* get a reference to the username input */
    const usernameInput = screen.getByPlaceholderText("User name");

    /* test to see if on screen */
    await waitFor(() => {
      expect(usernameInput).toBeOnTheScreen();
    });
  });

  /* Test the email input */
  it("Should render the email input", async () => {
    /* render the SignIn page */
    const page = render(<SignUp />);

    /* get a reference to the email input */
    const emailInput = screen.getByPlaceholderText("Email");

    /* test to see if on screen */
    await waitFor(() => {
      expect(emailInput).toBeOnTheScreen();
    });
  });

  /* Test the password input */
  it("Should render the password input", async () => {
    /* render the SignIn page */
    const page = render(<SignUp />);

    /* get a reference to the password input */
    const passwordInput = screen.getByPlaceholderText("Password");

    /* test to see if on screen */
    await waitFor(() => {
      expect(passwordInput).toBeOnTheScreen();
    });
  });

  /* Test the confirm_password input */
  it("Should render the password input", async () => {
    /* render the SignIn page */
    const page = render(<SignUp />);

    /* get a reference to the password input */
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm password");

    /* test to see if on screen */
    await waitFor(() => {
      expect(confirmPasswordInput).toBeOnTheScreen();
    });
  });

  /* Test the sign-in button */
  it("Should render the the sign-in button", async () => {
    /* render the SignIn page */
    const page = render(<SignUp />);

    /* get a reference to the SignIn button */
    const signinBtn = screen.getByTestId("signupBtn");

    /* test to see if on screen */
    await waitFor(() => {
      expect(signinBtn).toBeOnTheScreen();
    });
  });

  /* Test the sign in text */
  it("Should render the sign up button", async () => {
    /* render the SignIn page */
    const page = render(<SignUp />);

    /* get a reference to the SignIn button label */
    const signinBtnLabel = screen.getByText("Have an account? ");

    /* test to see if on screen */
    await waitFor(() => {
      expect(signinBtnLabel).toBeOnTheScreen();
    });
  });

  /* Test the sign-in button */
  it("Should render the sign up button", async () => {
    /* render the SignIn page */
    const page = render(<SignUp />);

    /* get a reference to the SignUp button */
    const signinBtn = screen.getByTestId("signinBtn");

    /* test to see if on screen */
    await waitFor(() => {
      expect(signinBtn).toBeOnTheScreen();
    });
  });

  /* Snapshot */
  it("Renders SignUp screen correctly", () => {
    const tree = render(<SignUp />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
