import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import CommentModel from "../../../../models/CommentModel";
import connectDB from "../../../../middleware/mongodb";
import checkAuth from "../../../../middleware/checkAuth";
import UserModel from "../../../../models/UserModel";


const handler = async (req: NextApiRequest, res: NextApiResponse, isAuth: boolean) => {
    try {
        if(isAuth && req.method === "POST") {
            const {id} = req.query;
            const payload = jwt.verify(req.cookies.accessToken, `${process.env.JWT_SECRET_ACCESS}`);
            if(typeof payload === "string" || payload instanceof String) {
                res.status(400).json({type: "error"});
                return;
            }

            const user = await UserModel.findById(payload.id);
            if(!user) {
                res.status(400).json({type: "error"});
                return;
            }
            
            await CommentModel.create({
                userId: payload.id,
                userLogin: user.login,
                videoId: id,
                message: req.body.message,
            });

            res.status(200).json({type: "ok"});
        }
        res.status(200);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
}

export default connectDB(checkAuth(handler));