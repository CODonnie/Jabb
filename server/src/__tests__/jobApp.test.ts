import request from "supertest";
import app from "../app";
import path from "path";
import { connectTestDB, disconnectTestDB, clearTestDB } from "./testUtils";
import { createTestUser, createTestJob } from "./HelperFunctions";

beforeAll(connectTestDB);
afterEach(clearTestDB);
afterAll(disconnectTestDB);

describe("Job Application Route", () => {
  it("should allow a user to apply to a job with resume and cover letter", async () => {
    const { accessToken } = await createTestUser({ role: "jobseeker" });
    const employer = await createTestUser();
    const job = await createTestJob(employer.accessToken);

    const res = await request(app)
      .post(`/api/apply/${job._id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .attach("resume", path.join(__dirname, "resume.pdf"))
      .attach("coverLetter", path.join(__dirname, "coverLetter.pdf"));

    expect(res.status).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.application).toBeDefined();

    // Test duplicate application
    const res2 = await request(app)
      .post(`/api/apply/${job._id}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .attach("resume", path.join(__dirname, "resume.pdf"))
      .attach("coverLetter", path.join(__dirname, "coverLetter.pdf"));

    expect(res2.status).toBe(400);
    expect(res2.body.status).toBe(false);
  });
});
