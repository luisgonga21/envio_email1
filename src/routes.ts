import { Router, Response, Request } from "express";
import { forgotPassword, saveUser, sessao } from "./controllers/UserController"

const routes = Router();

routes.get("/", (request: Request, response: Response) =>{
      return response.json({ message: "Hello Code83"})
});

routes.post("/users", saveUser);
routes.post("/session", sessao);
routes.post("/recupeacao", forgotPassword);


export default routes;

