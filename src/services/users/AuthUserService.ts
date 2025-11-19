import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserStatus } from "@prisma/client";
import  {} from "../../models/auth/AuthRequest.js"
import { AuthRequest } from '../../models/auth/AuthRequest.js';
import prismaClient from "../../prisma/index.js";


class AuthUserService {
    async execute({user, password}: AuthRequest) {
        if(!user || !password) {
            throw new Error("Credenciais Precisam estar preenchidos!");   
        }

        const foundUser = await prismaClient.user.findUnique({
            where: {
                user: user
            }
        });

        if(!foundUser) {
            throw new Error("Usuário ou senha incorreto!");
        }

        if (foundUser.status !== UserStatus.ATIVO){
            throw new Error("Conta inativa. Por favor, contate o suporte.");
            
        }

        const passwordMatch = await compare(password, foundUser.password)
        if(!passwordMatch) {
            throw new Error("Usuário ou senha incorreto!");
        }

        const token = jwt.sign(
            {
                user: foundUser.user,
            },
            process.env.JWT_SECRET as string,
            {
                subject: foundUser.id.toString(),
                expiresIn: "8h"
            }
        );

        return {
            id:foundUser.id,
            name: foundUser.user,
            token: token,
            message: "Logado com sucesso!"
        }

    }
}

export { AuthUserService }