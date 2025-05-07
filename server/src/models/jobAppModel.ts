import { models, model, ObjectId, Schema, Document } from "mongoose";

export interface IJobApp extends Document {
  job: ObjectId;
  applicant: ObjectId;
  coverLetter: string;
  resumeUrl: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const jobApplicationSchema = new Schema<IJobApp>(
  {
    job: { type: Schema.Types.ObjectId, ref: "Job", required: true },
    applicant: { type: Schema.Types.ObjectId, ref: "User", required: true },
    coverLetter: { type: String },
    resumeUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "reviewed", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const JobApp =
  models.JobApp ||
  model<IJobApp>("JobApp", jobApplicationSchema);

export default JobApp;
