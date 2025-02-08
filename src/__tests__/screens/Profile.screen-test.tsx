/* src/__tests__/screens/Profile.screen-test.tsx

/* Core */
import {
  act,
  fireEvent,
  render,
  screen,
  userEvent,
  waitFor,
} from "@testing-library/react-native";

/* Components */
import Profile from "#app/(auth)/(drawer)/profile";

describe("<ProfileScreen />", () => {
  /* Test the avatar */
  it("Should render the logo", () => {
    render(<Profile />);

    const avatar = screen.getByTestId("avatar");
    expect(avatar).toBeTruthy();
  });

  /* Test the username input */
  it("Should render the username input", () => {
    render(<Profile />);

    const emailInput = screen.getByPlaceholderText("User name");
    expect(emailInput).toBeTruthy();
  });

  /* Test the 'Pick an image' button */
  it("Should render the sign in button description", () => {
    render(<Profile />);

    const signinBtn = screen.getByText("Pick an image");
    expect(signinBtn).toBeTruthy();
  });

  /* Test the 'Update profile' button */
  it("Should render the sign in button description", () => {
    render(<Profile />);

    const signinBtn = screen.getByText("Update profile");
    expect(signinBtn).toBeTruthy();
  });
});
