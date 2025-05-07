import { Document, Schema, models, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "admin" | "employer" | "jobseeker"
};

const UserSchema = new Schema<IUser> ({
    firstName : { type: String, required: true},
    lastName : { type: String, required: true},
    email : { type: String, required: true, unique: true},
    password : { type: String, required: true},
    role: { type: String, enum: ["admin", "employer", "jobseeker"], default: "jobseeker"},
}, { timestamps: true});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePasswords = async function (password: string){
    return await bcrypt.compare(password, this.password);
};

const User = models.User || model<IUser>("User", UserSchema);

export default User;
