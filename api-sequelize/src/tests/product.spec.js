const request = require("supertest");

const { app } = require("../app");

describe("Get /product", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/api/v1/product").send();
    expect(response.statusCode).toBe(200);
  });

  test("should respond body-data with a array", async () => {
    const response = await request(app).get("/api/v1/product").send();
    expect(response.body.data).toBeInstanceOf(Array);
  });

  test("should respond with a 404 status code", async () => {
    const response = await request(app).get("/api/v1/products").send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Get One /product", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/api/v1/product/1").send();
    expect(response.statusCode).toBe(200);
  });

  test("should respond with a prductId", async () => {
    const response = await request(app).get("/api/v1/product/1").send();
    expect(response.body.data.productId).toBeDefined();
  });

  test("should respond with a 404 status code", async () => {
    const response = await request(app)
      .get("/api/v1/products/1000000000")
      .send();
    expect(response.statusCode).toBe(404);
  });
});

describe("Post /product", () => {
  describe("given a object product", () => {
    const products = [
      {
        name: "Zapatillas Nike Air Max 270",
        description:
          "Zapatillas deportivas con tecnología de amortiguación Air Max para mayor comodidad y estilo.",
        price: 129.99,
        quantity: 20,
      },
    ];

    test("should respond with a 201 status code created", async () => {
      const response = await request(app)
        .post("/api/v1/product")
        .send(products);
      expect(response.statusCode).toBe(201);
    });

    test("should respond with a  product array", async () => {
      const response = await request(app)
        .post("/api/v1/product")
        .send(products);
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe.only("when the product object is missing", () => {
    const products = [
      {
        name: "Zapatillas Nike Air Max 270",
        description:
          "Zapatillas deportivas con tecnología de amortiguación Air Max para mayor comodidad y estilo.",
        price: 129.99,
        quantity: 20,
      },
      {
        description:
          "Zapatillas deportivas con tecnología de amortiguación Air Max para mayor comodidad y estilo.",
        price: 129.99,
        quantity: 20,
      },
      {
        name: "Zapatillas Nike Air Max 270",
        description:
          "Zapatillas deportivas con tecnología de amortiguación Air Max para mayor comodidad y estilo.",
        quantity: 20,
      },
    ];
    test("should respond with a 400 status code", async () => {
      const response = await request(app)
        .post("/api/v1/product")
        .send(products);
      expect(response.statusCode).toBe(400);
    });
  });
});
