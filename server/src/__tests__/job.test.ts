import request from "supertest";
import {app} from "../index";
import { connectTestDB, disconnectTestDB, clearTestDB } from "./testUtils";
import { createTestUser, createTestJob } from "./HelperFunctions";

let token: string;
let jobId: string;

beforeAll(async () => {
  await connectTestDB();
  const user = await createTestUser();
  token = user.accessToken;
});

afterEach(async () => {
  await clearTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});

describe("Job Routes", () => {
  it("should create a job", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Job",
        description: "This is a test job",
        location: "Remote",
        tags: ["javascript", "remote"],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("job");
    jobId = res.body.job._id;
  });

  it("should fetch all jobs", async () => {
    await createTestJob(token);

    const res = await request(app).get("/api/jobs");
    expect(res.statusCode).toBe(200);
    expect(res.body.jobs.length).toBeGreaterThan(0);
  });

  it("should fetch a job by ID", async () => {
    const job = await createTestJob(token);

    const res = await request(app).get(`/api/jobs/${job._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.job).toHaveProperty("_id", job._id.toString());
  });

  it("should update the job if user is the poster", async () => {
    const job = await createTestJob(token);

    const res = await request(app)
      .patch(`/api/jobs/${job._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Test Job" });

    expect(res.statusCode).toBe(200);
    expect(res.body.job.title).toBe("Updated Test Job");
  });

  it("should delete the job if user is the poster", async () => {
    const job = await createTestJob(token);

    const res = await request(app)
      .delete(`/api/jobs/${job._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});
