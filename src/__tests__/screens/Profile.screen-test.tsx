/* src/__tests__/screens/Profile.screen-test.tsx */

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
import Profile from "#app/(auth)/(drawer)/profile";

/* Cleanup after each test */
afterEach(cleanup);

describe("<ProfileScreen />", () => {
  /* Test the avatar */
  it("Should render the avatar", async () => {
    /* render the Profile page */
    const page = render(<Profile />);

    /* get a reference to the avatar */
    const avatar = screen.getByTestId("avatar");

    /* test to see if on screen */
    await waitFor(() => {
      expect(avatar).toBeOnTheScreen();
    });
  });

  /* Test the username input */
  it("Should render the username input", async () => {
    /* render the Profile page */
    const page = render(<Profile />);

    /* get a reference to the username input */
    const usernameInput = screen.getByPlaceholderText("User name");

    /* test to see if on screen */
    await waitFor(() => {
      expect(usernameInput).toBeOnTheScreen();
    });
  });

  /* Test the 'Pick an image' button */
  it("Should render the 'Pick an Image' button", async () => {
    /* render the Profile page */
    const page = render(<Profile />);

    /* get a reference to the 'Pick an Image' button */
    const imageBtn = screen.getByText("Pick an image");

    /* test to see if on screen */
    await waitFor(() => {
      expect(imageBtn).toBeOnTheScreen();
    });
  });

  /* Test the 'Update profile' button */
  it("Should render the sign in button description", async () => {
    /* render the Profile page */
    const page = render(<Profile />);

    /* get a reference to the 'Update Profile' button */
    const updateBtn = screen.getByText("Update profile");

    /* test to see if on screen */
    await waitFor(() => {
      expect(updateBtn).toBeOnTheScreen();
    });
  });

  /* Snapshot */
  it("Renders Profile screen correctly", () => {
    const tree = render(<Profile />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
