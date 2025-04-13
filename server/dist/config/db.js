"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DBConnect = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        const conn = await mongoose_1.default.connect(mongoUri);
        console.log(`database connected - ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`database connection error - ${error}`);
    }
};
exports.default = DBConnect;
