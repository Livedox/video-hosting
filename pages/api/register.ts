import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../middleware/mongodb";
import UserModel from "../../models/UserModel";
import UserService from "../../service/user";
import RegisterUserDto from "../../dto/RegisterUserDto";
import cookie, { CookieSerializeOptions } from "cookie";

const emailRegExp = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
async function checkErrors(body: RegisterUserDto) {
    const errors: string[] = [];
    if(body.login.length < 3 || body.login.length > 12) {
        errors.push("Login must contain from 3 to 12 characters");
    }

    if(!emailRegExp.test(body.email)) {
        errors.push("Email is invalid");
    }

    if(body.password.length < 8 || body.password.length > 32) {
        errors.push("Password must contain from 8 to 32 characters");
    }

    if(body.password !== body.confirmPassword) {
        errors.push("Passwords do not match");
    }

    if(await UserModel.findOne({$or: [
        {email: body.email},
        { login: body.login }
    ]})) {
        errors.push("The user has already been created");
    }

    return errors;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const body = req.body as RegisterUserDto;
            const errors = await checkErrors(body);
            
            if(errors.length) {
                res.status(200).json({
                    type: "error",
                    errors: errors});
                return;
            }
    
            const cookieOptions: CookieSerializeOptions = {
                httpOnly: true,
                maxAge: 2_592_000_000,//30d
                secure: true,
                path: "/"
            };
            const user = await UserService.register(body);
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