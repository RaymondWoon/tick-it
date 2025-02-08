import { renderRouter, screen } from "expo-router/testing-library";

import {
  act,
  fireEvent,
  render,
  screen as rnScreen,
  waitFor,
} from "@testing-library/react-native";

import SignIn from "#app/sign-in";
import SignUp from "#app/sign-up";

describe("Sign-in Screen", () => {
  it("Should initially be on the sign-in page", async () => {
    renderRouter(
      {
        signin: SignIn,
        signUp: SignUp,
      },
      {
        initialUrl: "/sign-in",
      }
    );

    expect(screen).toHavePathname("/sign-in");
  });

  //it("Should redirect to the sign-up screen after clicking the sign-up button", async () => {
  // const wrapper = render(<SignIn />);

  // const signUp_button = rnScreen.getByTestId("sign-up");

  // expect(signUp_button).toBeTruthy();

  /* ERROR: Attempted to navigate before mounting the Root Layout */
  // act(() => {
  //   fireEvent.press(signUp_button);
  // });

  /* check if the user has been redirected to the sign-up page */
  // await waitFor(() => expect(screen).toHavePathname("/sign-up"), {
  //   timeout: 10 * 1000,
  //   interval: 1000,
  // });
  //});
});
