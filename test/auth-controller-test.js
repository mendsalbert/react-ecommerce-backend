const expect = require("chai").expect;
const sinon = require("sinon");
const User = require("../models/User");

const { userLogInController } = require("../controllers/auth");

describe("Auth-controller User login", () => {
  it("should throw an error at status code 500", function (done) {
    sinon.stub(User, "findOne");
    User.findOne.throws();
    const req = {
      body: {
        email: "tester@gmail.com",
        password: "tester",
      },
    };
    userLogInController(req, {}, () => {}).then((result) => {
      console.log(result);
      // expect(result).to.be.an("error");

      // expect(result).to.have.property("statusCode", 500);
      done();
    });

    User.findOne.restore();
  });
});
