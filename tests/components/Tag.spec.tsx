import { render, screen } from "@testing-library/react";
import Tag from "../../components/ui/Tag";

it("renders the input text", () => {
  render(<Tag text={"Hello"} star={true} />);
  const myElement = screen.getByText(/Hello/);
  expect(myElement).toBeInTheDocument();
});

it("displays a star if 'true' is passed to the star property", () => {
  render(<Tag text={"Tag"} star={true} />);
  const star = screen.getByRole("star");
  expect(star).toBeInTheDocument();
});

it("should not display a star if nothing (or false) is passed to the star property", () => {
  render(<Tag text={"Tag"} star={false} />);
  const star = screen.queryByRole("star");
  expect(star).not.toBeInTheDocument();
});
