"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rolePermission = {
    "admin": ["create", "read", "update", "delete"],
    "employer": ["create", "read", "update"],
    "jobseeker": ["read"],
};
exports.default = rolePermission;
