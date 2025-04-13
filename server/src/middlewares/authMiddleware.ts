import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import rolePermission from "../config/rbacConfig";

interface AuthRequest extends Request {
    user?: { id: string, role: string }
}

const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.jabbToken || req.headers?.authorization?.split(" ")[1];
    const secret = process.env.JWY_SECRET as string;
    if (!token) {
        res.status(401).json({ status: false, message: "no token provided" });
        return;
    }

    try {
        const decoded = jwt.verify(token, secret) as { id: string, role: string };
        req.user = { id: decoded.id, role: decoded.role }
        next();
    } catch (error) {
        res.status(500).json({ status: false, message: "Invalid token"});
    }
}

export const permitted = (action: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;

        if (!userRole || rolePermission[userRole].includes(action)) {
            res.status(403).json({ message: "Unauthorised access - insufficient permission"});
            return;
        }

        next();
    }
};

export default protect;