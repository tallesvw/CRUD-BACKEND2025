import {Router, Request, Response} from "express";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { AuthUserController } from "./controllers/user/AuthUserController.js";


const router = Router();
router.get("/test", (request: Request, response: Response) =>{
return response.json({ ok: true });
});



router.post('/register', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle);





export { router };
