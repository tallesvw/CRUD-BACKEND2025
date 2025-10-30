import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import PrismaClient from "../../prisma/index.js"
import  {} from "../../models/auth/AuthRequest.js"
import { AuthRequest } from '../../models/auth/AuthRequest.js';
import prismaClient from "../../prisma/index.js";


class AuthUserService {
    async execute({user, password}: AuthRequest) {
        if(!user) {
            throw new Error("Usuário Precisa ser preenchido!");   
        }

        if(!password) {
            throw new Error("Senha Precisa ser preenchido!");   
        }
        const register = await prismaClient.user.findFirst({
            where: {
                user: user
            }
        });
        if(!register) {
            throw new Error("Usuário ou senha incorreto!");
        }
        const passwordMatch = await compare(password, register?.password)
        if(!passwordMatch) {
            throw new Error("Senha Errada!");
        }

        const token = await jwt.sign( 
            {
                user: register?.user,
            },
            process.env.JWT_SECRET as string,
            {
                subject: register?.id?.toString(),
                expiresIn: "8h"
            }
        );

        return {
            id:register?.id,
            name: register?.user,
            token: token
        }

    }
}

export { AuthUserService }