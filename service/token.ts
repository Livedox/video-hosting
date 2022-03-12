import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import TokenModel from "../models/TokenModel";


class TokenService {
    generateToken(payload: object) {
        const accessToken = jwt.sign(
            payload,
            `${process.env.JWT_SECRET_ACCESS}`,
            {expiresIn: "1h"});
    
        const refreshToken = jwt.sign(
            payload,
            `${process.env.JWT_SECRET_ACCESS}`,
            {expiresIn: "30d"});
        
        return {
            accessToken,
            refreshToken
        }
    }

    async validateAccessToken(token: string) {
        try {
            const userData = jwt.verify(token, `${process.env.JWT_SECRET_ACCESS}`);
            return userData;
        } catch(e) {
            return null;
        }
    }

    async validateRefreshToken(token: string) {
        try {
            const userData = jwt.verify(token, `${process.env.JWT_REFRESH_SECRET}`);
            return userData;
        } catch(e) {
            return null;
        }
    }

    async saveToken(userId: ObjectId, refreshToken: string) {
        const tokenData = await TokenModel.findOne({userId});
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenModel.create({userId, refreshToken});
        return token;
    }

    async removeToken(refreshToken: string) {
        const tokenData = await TokenModel.deleteOne({refreshToken});

        return tokenData;
    }

    async findToken(refreshToken: string) {
        const tokenData = await TokenModel.findOne({refreshToken});

        return tokenData;
    }
}




export default new TokenService();