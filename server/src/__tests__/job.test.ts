import request from "supertest";
import { app } from "../index";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { createTestUser, createTestJob, clearTestUsers, clearTestJob } from "./HelperFunctions";

dotenv.config();

let accessToken: string;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_TEST_URI!);
});

beforeEach(async () => {
  const { accessToken: token } = await createTestUser();
  accessToken = token;
});

afterEach(async () => {
  await clearTestUsers();
  await clearTestJob();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Job Routes", () => {
  it("should create a job", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        title: "Test Job",
        description: "This is a test job",
        requirements: ["test it"],
        responsibilities: ["write tests"],
        salary: "500k",
        tags: ["jest", "test"],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.job).toHaveProperty("title", "Test Job");
  });

  it("should fetch all jobs", async () => {
    await createTestJob(accessToken);
    const res = await request(app).get("/api/jobs");

    expect(res.statusCode).toBe(200);
    expect(res.body.jobs.length).toBeGreaterThan(0);
  });

  it("should fetch a job by ID", async () => {
    const job = await createTestJob(accessToken);
    const res = await request(app).get(`/api/jobs/${job._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.job).toHaveProperty("_id", job._id.toString());
  });

  it("should update the job if user is the poster", async () => {
    const job = await createTestJob(accessToken);
    const res = await request(app)
      .patch(`/api/jobs/${job._id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ title: "Updated Test Job" });

    expect(res.statusCode).toBe(200);
    expect(res.body.job.title).toBe("Updated Test Job");
  });

  it("should delete the job if user is the poster", async () => {
    const job = await createTestJob(accessToken);
    const res = await request(app)
      .delete(`/api/jobs/${job._id}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});
