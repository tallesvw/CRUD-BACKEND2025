import { Request, Response } from "express";
import { AuthUserService } from "../../services/users/AuthUserService.js";
import { AuthRequest } from "../../models/auth/AuthRequest.js";


class AuthUserController{
    async handle(request: Request, response: Response) {
        const { user, password }: AuthRequest= request.body;
        const authUserService = new AuthUserService();
        const auth = await authUserService.execute({
            user, password
        });
        return response.json(auth);
    }
}

export { AuthUserController }