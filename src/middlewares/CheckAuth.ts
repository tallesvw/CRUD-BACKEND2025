import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';


export interface AuthExpressRequest extends Request {
    userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET;

export const checkAuth = (req: AuthExpressRequest, res: Response, next: NextFunction) => {
   
    if (!JWT_SECRET) {
        console.error("ERRO DE CONFIGURAÇÃO: JWT_SECRET não está definido.");
        return res.status(500).json({ message: 'Internal Server Error: Secret not configured' });
    };

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
       
        return res.status(403).json({ message: 'UNAUTHORIZED' });
    };

    const token = authHeader.split(' ')[1];

    try {
        type TokenPayload = { 
            sub: string,
            iat: number,
            exp: number 
        };

        const decoded = jwt.verify(token as string, JWT_SECRET as string) as TokenPayload;
        req.userId = decoded.sub;
        next();

    } catch (error: unknown) {
        return res.status(403).json({ message: 'UNAUTHORIZED: Invalid token' });
    }
};