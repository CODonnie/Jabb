import { Document, Schema, models, model, ObjectId } from "mongoose";

export interface IJob extends Document {
	title: string,
	description: string,
	requirements: string[],
	responsibilities: string[],
	company: string,
	industry: string,
	location: string,
	remote: boolean,
	jobType: "full-time" | "part-time" | "contract" | "internship",
	salaryRange: {
		min: number,
		max: number,
		currency: string,
		negotiable: boolean,
	},
	applicationUrl: string,
	postedBy: ObjectId,
	employer: ObjectId,
	status: "open" | "closed" | "paused",
	tags: string[],
	deadline: Date,
	views: number,
	applicationCounts: number,
	createdAt: Date,
	updatedAt: Date,
};

const JobSchema = new Schema<IJob>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	requirements: { type: [String], required: true },
	responsibilities: { type: [String], required: true },
	company: String,
	industry: String,
	location: String,
	remote: { type: Boolean, default: false },
	jobType: { type: String, enum: ["full-time", "part-time", "contract", "internship"], default: "full-time" },
	salaryRange: {
		min: Number,
		max: Number,
		currency: { type: String, default: "NGN"},
		negotiable: { type: Boolean, default: false },
	},
	applicationUrl: String,
	postedBy: { type: Schema.Types.ObjectId, ref: "User" },
	employer: { type: Schema.Types.ObjectId, ref: "User", required: true },
	status: { type: String, enum: ["open", "closed", "paused"], default: "open" },
	tags: [String],
	deadline: Date,
	views: { type: Number, default: 0 },
	applicationCounts: { type: Number, default: 0 },
}, { timestamps: true });

const Job = models.Job || model<IJob>("Job", JobSchema);

export default Job;
