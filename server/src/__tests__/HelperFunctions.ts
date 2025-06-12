import request from "supertest";
import app from '../app';
import User from "../models/userModel";
import Job from "../models/jobModel";

export const createTestUser = async (overrides: any = {}) => {
    const role = overrides.role || "employer";
    const userData = {
        firstName: "John",
        lastName: "Doe",
        email: `user_${Date.now()}@mail.com`,
        password: "securepassword",
        role,
        ...overrides,
    }

    //signup test User
    await request(app).post('/api/auth/signup').send(userData);

    //login test User
    const res = await request(app).post('/api/auth/login').send({
        email: userData.email,
        password: userData.password,
    });

    return {
        ...res.body,
        user: res.body.user,
        accessToken: res.body.token
    };
};

export const createTestJob = async (token: string) => {
    const jobData = {
        title: "Test Job",
        description: "This is a sample for our test job",
        requirements: ["make sure it works", "API solid"],
        responsibilities: ["Sample job", "create samples"],
        salary: '550k',
        tags: ['nodejs', 'tyescript', 'express', 'superTest']
    };

    //create test Job
    const jobRes = await request(app).post('/api/jobs').set("Authorization", `Bearer ${token}`).send(jobData);

    return jobRes.body.job
};

export const clearTestUsers = async () => {
    await User.deleteMany({});
};

export const clearTestJob = async () => {
    await Job.deleteMany({});
}