import { NextApiRequest, NextApiResponse } from "next";
import UserService from "../../service/user";
import connectDB from "../../middleware/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {refreshToken} = req.cookies;
        const userData = await UserService.refresh(refreshToken);
        if(!userData) {
            res.status(300).json({});
            return;
        }
        res.status(200).json({userData});
    } catch (e) {
        console.log(e);
        res.status(500);
    }
}

export default connectDB(handler);