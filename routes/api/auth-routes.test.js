const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../../app");

const { User } = require("../../models/user");

const { DB_HOST_TEST, PORT } = process.env;

describe("test /api/auth/register route", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  test("test register route with correct data", async () => {
    const registerData = {
      email: "oks@gmail.com",
      password: "123456",
    };

    const res = await request(app)
      .post("/api/auth/register")
      .send(registerData);
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe(registerData.email);
  });
});

describe("test /api/auth/login route", () => {
  let server = null;
  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test("test login route with correct data", async () => {
    const loginData = {
      email: "oks@gmail.com",
      password: "123456",
    };

    const res = await request(app).post("/api/auth/login").send(loginData);
    const user = await User.findOne();
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBe(user.token);
  });
});
