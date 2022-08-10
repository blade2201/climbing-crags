describe("Search-Sector-Route", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });
  it("can search a sector", () => {
    cy.get("form").type("big");
    cy.get("button").contains("Search").click();
  });
  it("can click and navigate to a sector", () => {
    cy.contains("see more").click();
  });
  it("can click and navigate to a route", () => {
    cy.contains("brooklyn").click();
  });
});

// describe("Log In", () => {
//   beforeEach(function () {
//     // cy.task("db:seed");
//     console.log(cy.loginByGoogleApi());
//   });

//   it("your logged", function () {
//     cy.contains("climbing crags").should("be.visible");
//   });
// });

// describe("Add Image", () => {
//   it("loads the route page", () => {
//     cy.visit("/route/0-3-62");
//   });
// });

describe("Login page", () => {
  before(() => {
    cy.visit("/");
  });
  it("Login with Google", () => {
    cy.log("Logging in to Google");
    cy.request({
      method: "POST",
      url: "https://www.googleapis.com/oauth2/v4/token",
      body: {
        grant_type: "refresh_token",
        client_id:
          "111069380837-gqki0fl0bh9j1lsbh3455jp7sigsi7l7.apps.googleusercontent.com",
        client_secret: "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",
        refresh_token:
          "1//04pZ8ydXoDBrSCgYIARAAGAQSNwF-L9IrXYafLIN25GuE6K6hA5Hl9uACxGBjY3DzQMMuNCESWk14gN7NJ0iZ5z4cv4cJIii97kQ",
      },
    }).then(({ body }) => {
      const { access_token, id_token } = body;

      cy.request({
        method: "GET",
        url: "https://www.googleapis.com/oauth2/v3/userinfo",
        headers: { Authorization: `Bearer ${access_token}` },
      }).then(({ body }) => {
        cy.log(body);
        const userItem = {
          token: id_token,
          user: {
            googleId: body.sub,
            email: body.email,
            givenName: body.given_name,
            familyName: body.family_name,
            imageUrl: body.picture,
          },
        };

        window.localStorage.setItem("googleCypress", JSON.stringify(userItem));
        cy.visit("/");
      });
    });
  });
});
