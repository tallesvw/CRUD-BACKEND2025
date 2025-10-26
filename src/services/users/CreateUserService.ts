import prismaClient from "../../prisma/index.js";
import { hash } from "bcryptjs";
import { UserRequest } from "../../models/interfaces/UserRequest.js"

class CreateUserService {
    async execute({ user, email, password, phone }: UserRequest){
        if(!email) {
            throw new Error("Email incorrect");
        }
        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email:email
            }
        })

        if(userAlreadyExists) {
            throw new Error("Email Already exists");
        }

        const passwordHash = await hash(password, 8);

        const register = prismaClient.user.create({
            data: {
                user: user,
                email: email,
                password: passwordHash,
                phone: phone
            },
            select:{
                id: true,
                user: true,
                email: true,
            }
        })

        return register;
    }
        
}

export { CreateUserService }