/* src/__tests__/screens/Signin.screen-test.tsx */

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
import SignIn from "#app/sign-in";

/* Cleanup after each test */
afterEach(cleanup);

describe("<SignInScreen />", () => {
  /* Test the logo */
  it("Should render the logo", async () => {
    /* render the SignIn page */
    const page = render(<SignIn />);

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
    const page = render(<SignIn />);

    /* get a reference to the title */
    const title = screen.getByText("Welcome to Tick-it");

    /* test to see if on screen */
    await waitFor(() => {
      expect(title).toBeOnTheScreen();
    });
  });

  /* Test the email input */
  it("Should render the email input", async () => {
    /* render the SignIn page */
    const page = render(<SignIn />);

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
    const page = render(<SignIn />);

    /* get a reference to the password input */
    const passwordInput = screen.getByPlaceholderText("Password");

    /* test to see if on screen */
    await waitFor(() => {
      expect(passwordInput).toBeOnTheScreen();
    });
  });

  /* Test the sign-in button */
  it("Should render the the sign-in button", async () => {
    /* render the SignIn page */
    const page = render(<SignIn />);

    /* get a reference to the SignIn button */
    const signinBtn = screen.getByTestId("signinBtn");

    /* test to see if on screen */
    await waitFor(() => {
      expect(signinBtn).toBeOnTheScreen();
    });
  });

  /* Test the sign up text */
  it("Should render the sign up button", async () => {
    /* render the SignIn page */
    const page = render(<SignIn />);

    /* get a reference to the SignUp button label */
    const signupBtnLabel = screen.getByText("Don't have an account? ");

    /* test to see if on screen */
    await waitFor(() => {
      expect(signupBtnLabel).toBeOnTheScreen();
    });
  });

  /* Snapshot */
  it("Renders SignIn screen correctly", () => {
    const tree = render(<SignIn />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
