import request from "supertest";
import app from "../app";
import { clearTestDB, connectTestDB, disconnectTestDB } from "../__tests__/testUtils";
import User from "../models/userModel";

beforeAll(async () => {
    await connectTestDB();
});
 afterEach(async () => {
    await clearTestDB();
 });

 afterAll(async () => {
    await disconnectTestDB ();
 });

 describe("Auth Routes", () =>{
    const testUser = {
        firstName: "Stephen",
        lastName: "Curry",
        email: "sc3@warriors.com",
        password: "oneSecureWarriorsPassword"
    };

    it("should register a new user", async () => {
        const response = await request(app)
            .post("/api/auth/signup")
            .send(testUser)
            .expect(201);

        expect(response.body).toHaveProperty("user");
        expect(response.body).toHaveProperty("status", true);
        expect(response.body.user.email).toBe(testUser.email);

        const userInDB = await User.findOne({ email: testUser.email });
        expect(userInDB).not.toBeNull();
    });

    it("should not register a user with existing email", async () => {
        await User.create(testUser);

        const res = await request(app).post('/api/auth/signup').send(testUser);

        expect(res.statusCode).toBe(409);
        expect(res.body).toHaveProperty("status", false);
    });

    it("should login a registered user", async () => {
        await User.create(testUser);

        const response = await request(app)
            .post("/api/auth/login")
            .send({ email: testUser.email, password: testUser.password })
            .expect(200);

        expect(response.body).toHaveProperty("status", true);
        expect(response.body).toHaveProperty("token");
        expect(response.body.user.email).toBe(testUser.email);
    });

    it("shouldn't login with incorrect credentials", async () => {
        await User.create(testUser);

        const response = await request(app)
            .post("/api/auth/login")
            .send({ email: testUser.email, password: "wrongPassword" })
            .expect(401);

        expect(response.body).toHaveProperty("status", false);
        expect(response.body).toHaveProperty("message", "invalid credentials");
    })
 });