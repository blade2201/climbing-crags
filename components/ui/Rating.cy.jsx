import Rating from "./Rating";

describe("<Rating>", () => {
  it("mounts", () => {
    cy.mount(<Rating rating={3} />);
  });

  it("shows the correct number of stars per rating", () => {
    cy.mount(<Rating rating={2.5} />);
    cy.get('[id="firstStar"]').should("have.class", "/star-full.svg");
    cy.get('[id="secondStar"]').should("have.class", "/star-full.svg");
    cy.get('[id="thirdStar"]').should("have.class", "/star-half.svg");
    cy.get('[id="fourthStar"]').should("have.class", "/star-empty.svg");
    cy.get('[id="fithStar"]').should("have.class", "/star-empty.svg");
  });
});
