"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const errorMiddleware_1 = require("./middlewares/errorMiddleware");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const jobAppRoutes_1 = __importDefault(require("./routes/jobAppRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
//init
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
exports.app = app;
const port = process.env.PORT || 5002;
//middlewares
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
//routes
app.use("/api/auth", authRoutes_1.default);
app.use("/api/jobs", jobRoutes_1.default);
app.use("/api", jobAppRoutes_1.default);
app.use("/api/admin", adminRoutes_1.default);
//error middleware
app.use(errorMiddleware_1.notFound);
app.use(errorMiddleware_1.errorHandler);
//server
const server = app.listen(port, () => console.log(`Jabb server running on http://localhost:${port}`));
exports.server = server;
