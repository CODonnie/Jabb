import request from "supertest";
import app from "../app";
import { connectTestDB, disconnectTestDB, clearTestDB } from "./testUtils";
import { createTestUser, createTestJob } from "./HelperFunctions";

beforeAll(connectTestDB);
afterEach(clearTestDB);
afterAll(disconnectTestDB);

describe("Admin Routes", () => {
  it("should allow admin to get and delete users and jobs", async () => {
    const admin = await createTestUser({ role: "admin" });
    const user = await createTestUser({ email: "regular@mail.com" });
    const job = await createTestJob(user.accessToken);

    // get all users
    const resUsers = await request(app)
      .get("/api/admin/user")
      .set("Authorization", `Bearer ${admin.accessToken}`);
    expect(resUsers.status).toBe(200);
    expect(resUsers.body.users).toHaveLength(3);

    // get a specific user
    const resUser = await request(app)
      .get(`/api/admin/user/${user.user._id}`)
      .set("Authorization", `Bearer ${admin.accessToken}`);
    expect(resUser.status).toBe(200);
    expect(resUser.body.user.email).toBe("regular@mail.com");

    // get all jobs
    const resJobs = await request(app)
      .get("/api/admin/job")
      .set("Authorization", `Bearer ${admin.accessToken}`);
    expect(resJobs.status).toBe(200);
    expect(resJobs.body.jobs).toHaveLength(1);

    // get a specific job
    const resJob = await request(app)
      .get(`/api/admin/job/${job._id}`)
      .set("Authorization", `Bearer ${admin.accessToken}`);
    expect(resJob.status).toBe(200);
    expect(resJob.body.job.title).toBe("Test Job");

    // delete the job
    const delJob = await request(app)
      .delete(`/api/admin/job/${job._id}`)
      .set("Authorization", `Bearer ${admin.accessToken}`);
    expect(delJob.status).toBe(200);
    expect(delJob.body.message).toBe("job deleted");

    // delete the user
    const delUser = await request(app)
      .delete(`/api/admin/user/${user.user._id}`)
      .set("Authorization", `Bearer ${admin.accessToken}`);
    expect(delUser.status).toBe(200);
    expect(delUser.body.message).toBe("user deleted");
  });
});
