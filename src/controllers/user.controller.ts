import { Request, Response } from "express";
import UserService from "../services/user.service";

const userService = new UserService();

export default class UserController {
    async userLogin(req: Request, res: Response) {
    
        const users = await userService.userLogin(req, res);
        return res.json(users);
      }
}