import { render, screen } from "@testing-library/react";
import Tag from "./Tag";

it("renders 'Hello'", () => {
  render(<Tag text={"Hello"} />);
  const myElement = screen.getByText(/Hello/);
  expect(myElement).toBeInTheDocument();
});
