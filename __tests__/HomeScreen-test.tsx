import { render, screen } from "@testing-library/react-native";

import Login from "@/app/index";

describe("<Login />", () => {
  test("Text renders correctly on HomeScreen", () => {
    render(<Login />);
    const text = screen.getByText("Welcome!");

    expect(text).toBeTruthy();
  });
});
