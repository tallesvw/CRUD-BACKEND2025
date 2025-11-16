import {Router, Request, Response} from "express";
import { CreateUserController } from "./controllers/user/CreateUserController.js";
import { AuthUserController } from "./controllers/user/AuthUserController.js";
import { ListUserController } from "./controllers/user/ListUserController.js";
import { checkAuth } from "./middlewares/CheckAuth.js";



const router = Router();
router.get("/test", (request: Request, response: Response) =>{
return response.json({ ok: true });
});



router.post('/register', new CreateUserController().handle);
router.post('/login', new AuthUserController().handle);
router.get('/getAll', checkAuth, ListUserController);





export { router };
