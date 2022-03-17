import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../middleware/mongodb";
import UserModel from "../../models/UserModel";
import UserService from "../../service/user";
import RegisterUserDto from "../../dto/RegisterUserDto";
import cookie, { CookieSerializeOptions } from "cookie";


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const body = req.body as RegisterUserDto;
    
            const cookieOptions: CookieSerializeOptions = {
                httpOnly: true,
                maxAge: 2_592_000_000,//30d
                secure: true,
                path: "/"
            };
            const user = await UserService.login(body);
            res.setHeader("Set-Cookie", [cookie.serialize("refreshToken", user.refreshToken, cookieOptions),
                cookie.serialize("accessToken", user.accessToken, {...cookieOptions, maxAge:1_800_000})]);
            res.status(200).json(user);
            return;
        }
        
        res.status(404);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
}

export default connectDB(handler);