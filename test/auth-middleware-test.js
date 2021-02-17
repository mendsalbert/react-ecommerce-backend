const expect = require("chai").expect;
const { authenticated } = require("../middlewares/authenticate");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");
describe("Auth Middleware", () => {
  it("should throw an error if no authorisation header is present", function () {
    const req = {
      header: function () {
        return null;
      },
    };
    expect(() => authenticated(req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("should yield a user after decoding the token", function () {
    const req = {
      header: function () {
        return "x-auth-token ijk";
      },
    };
    sinon.stub(jwt, "verify");
    jwt.verify.returns({ user: "abc" });
    authenticated(req, {}, () => {});
    expect(req).to.have.property("user");
    jwt.verify.restore();
  });

  it("should throw an error if token cannot be verify", function () {
    const req = {
      header: function () {
        return "x-auth-token ijk";
      },
    };
    expect(() => authenticated(req, {}, () => {})).to.throw();
  });
});
