import RegisterUserDto from "../dto/RegisterUserDto";
import UserDto from "../dto/UserDto";
import UserModel from "../models/UserModel";
import sendActivationMail from "./sendActivationMail";
import bcrypt from "bcrypt";
import {v4} from "uuid";
import TokenService from "./token";
import config from "../config";
import LoginUserDto from "../dto/LoginUserDto";
import { NextApiRequest, NextApiResponse } from "next";


class UserService {
    async register(body: RegisterUserDto) {
        const hashPassword = await bcrypt.hash(body.password, 3);
        const verificationLink = `${config.server}/api/activate-email/${v4()}`;
        const user = await UserModel.create({
            login: body.login,
            email: body.email,
            password: hashPassword,
            verificationLink,
            isEmailVerified: false,
            registrationDate: new Date()
        });
        try {
            await sendActivationMail(user.email, verificationLink);
        } catch(e) {
            console.error("mail token expired");
        }
        
        const userDto = new UserDto(user._id, user.email, user.login, user.registrationDate);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(user._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(body: LoginUserDto) {
        const user = await UserModel.findOne({login: body.login});
        if(!user) throw Error("User not found");
        if(!(await bcrypt.compare(body.password, user.password))) {
            throw Error("Invalid password");
        }

        const userDto = new UserDto(user._id, user.email, user.login, user.registrationDate);
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(user._id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken: string) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken: string) {
        if(!refreshToken) {
            return undefined;
        }

        const userData = await TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) {
            return undefined;
        }

        const user = (await UserModel.findById(tokenFromDb.userId))!;
        const userDto = new UserDto(user._id, user.email, user.login, user.registrationDate);
        console.log(userDto, {...userDto});
        const tokens = TokenService.generateToken({...userDto});
        await TokenService.saveToken(user._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async activateEmail(verificationLink: string) {
        const user = await UserModel.findOne({verificationLink});
        if(!user) throw new Error("Invalid activation link");
        user.isEmailVerified = true;
        await user.save();
    }
}

export default new UserService();