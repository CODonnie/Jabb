"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.permitted = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rbacConfig_1 = __importDefault(require("../config/rbacConfig"));
const protect = (req, res, next) => {
    const token = req.cookies?.jabbToken || req.headers?.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ status: false, message: "no token provided" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, role: decoded.role };
        next();
    }
    catch (error) {
        res.status(500).json({ status: false, message: "Invalid token" });
    }
};
const permitted = (action) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole || rbacConfig_1.default[userRole].includes(action)) {
            res.status(403).json({ message: "Unauthorised access - insufficient permission" });
            return;
        }
        next();
    };
};
exports.permitted = permitted;
exports.default = protect;
