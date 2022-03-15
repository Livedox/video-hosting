import { NextApiRequest, NextApiResponse } from "next";
import UserService from "../../service/user";
import cookie, { CookieSerializeOptions } from "cookie";
import connectDB from "../../middleware/mongodb";
import config from "../../config";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const {refreshToken} = req.cookies;
            await UserService.logout(refreshToken);
            const cookieOptions: CookieSerializeOptions = {
                httpOnly: true,
                maxAge: 0,
                secure: true,
                path: "/"
            };
            res.setHeader("Set-Cookie", [cookie.serialize("refreshToken", "", cookieOptions),
                cookie.serialize("accessToken", "", cookieOptions)]).status(301).redirect(`/`).end();
            return;
        }
        
        res.status(404);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
}

export default connectDB(handler);