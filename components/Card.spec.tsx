import { render, screen } from "@testing-library/react";
import Card from "./Card";
import { mockCrag } from "../tests/pages/mock";

it("renders everything that its supposed to render", () => {
  console.log(<Card item={mockCrag} type="crags" />);
  render(<Card item={mockCrag} type="crags" />);
});
