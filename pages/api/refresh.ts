import { NextApiRequest, NextApiResponse } from "next";
import UserService from "../../service/user";
import cookie from "cookie";
import connectDB from "../../middleware/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.setHeader("Set-Cookie", cookie.serialize("refreshToken", userData.refreshToken, {
                httpOnly: true,
                maxAge: 2_592_000_000//30d
            }))
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