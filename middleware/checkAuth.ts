import { NextApiRequest, NextApiResponse } from "next";
import TokenService from "../service/token";

function Auth(handler: (req: NextApiRequest, res: NextApiResponse, isAuth: boolean) => void) {
    return async (req: NextApiRequest,res: NextApiResponse) => {
        try {
            let isAuth = true;
            const accessToken = req.cookies.accessToken;
            if(!accessToken) isAuth = false;
            const userData = await TokenService.validateAccessToken(`${accessToken}`);
            if(!userData) isAuth = false;
            return handler(req, res, isAuth);
        } catch (e) {
            throw new Error("Error Auth");
        }
    }
    
}

export default Auth;