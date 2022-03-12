import { NextApiRequest, NextApiResponse } from "next";
import UserService from "../../service/user";
import cookie from "cookie";
import connectDB from "../../middleware/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.setHeader("Set-Cookie", cookie.serialize("refreshToken", "", {
                httpOnly: true,
                maxAge: 0//0
            }));

            res.status(200);
            return;
        }
        
        res.status(404);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
}

export default connectDB(handler);