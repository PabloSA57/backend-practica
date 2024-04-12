const request = require("supertest");

const { app } = require("../app");

const BASE_URL = "/api/v1/customer";
describe("Post /customer", () => {
  /*describe("give an object customer", () => {
    const customer = {
      name: "Pablo",
      lastName: "Sierra",
      email: "pablo@gmail.com",
      direction: "Tucuman",
      phone: "3816209627",
    };
    test("should response with status code 201", async () => {
      const response = await request(app).post(`${BASE_URL}`).send(customer);
      expect(response.statusCode).toBe(201);
    });
  });*/
  describe("already registered customer", () => {
    const customer = {
      name: "Pablo",
      lastName: "Sierra",
      email: "pablo@gmail.com",
      direction: "Tucuman",
      phone: "3816209627",
    };
    test.only("should response with status code 409", async () => {
      const response = await request(app).post(`${BASE_URL}`).send(customer);
      expect(response.statusCode).toBe(409);
    });
  });
  describe("when the object customer is mixing", () => {
    const customerError = [
      {},
      {
        name: "Pablo",
        lastName: "Sierra",
        direction: "Tucuman",
        phone: "3816209627",
      },
      {
        name: "Pablo",
        email: "pablo@gmail.com",
        direction: "Tucuman",
        phone: "3816209627",
      },
      {
        email: "pablo@gmail.com",
        direction: "Tucuman",
        phone: "3816209627",
      },
    ];
    for (const obj of customerError) {
      test("should response with status code 400", async () => {
        const response = await request(app).post(`${BASE_URL}`).send(obj);
        expect(response.statusCode).toBe(400);
      });
    }
  });
});
