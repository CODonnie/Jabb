const rolePermission: Record<string, string[]> = {
    "admin": ["create", "read", "update", "delete"],
    "employer": ["create", "read", "update"],
    "jobseeker": [ "read"],
};

export default rolePermission;