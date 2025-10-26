import { Request, Response } from "express";
import { CreateUserService } from "../../services/users/CreateUserService.js";
import { UserRequest } from "../../models/interfaces/UserRequest.js";


class CreateUserController {
    async handle(request: Request, response: Response) {
        const {user, email, password, phone}: UserRequest = request.body;
        const createUserService = new CreateUserService()
        const register = await createUserService.execute({
            user, email, password, phone
        });

        return response.json(register);

    }

}

export { CreateUserController }