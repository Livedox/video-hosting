import busboy from "busboy";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { v4 } from "uuid";
import VideoModel from "../../../models/VideoModel";
import connectDB from "../../../middleware/mongodb";
import jwt from "jsonwebtoken";

export const config = {
    api: {
        bodyParser: false,
    }
}

async function uploadVideoStream(req: NextApiRequest, res: NextApiResponse, payload: jwt.JwtPayload) {
    const bb = busboy({headers: req.headers});
    const data = {
        title: "",
        url: "",
        description: ""
    }

    bb.on("file", (_, file, info) => {
        data.url = `/videos/${v4()}.${info.filename.match(/\.([^.]+)$|$/)![1]}`;

        const stream = fs.createWriteStream("./public/" + data.url);

        file.pipe(stream);
    });

    bb.on("field", (name, value, _) => {
        if(name === "title") data.title = value;
        if(name === "description") data.description = value;
    });

    bb.on("close", async () => {
        await VideoModel.create({
            userId: payload.id,
            url: data.url,
            title: data.title,
            description: data.description,
            creationDate: new Date(),
        });
        res.writeHead(200, {Connection: "close"});
    });

    req.pipe(bb);
    return;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const payload = jwt.verify(req.cookies.accessToken, `${process.env.JWT_SECRET_ACCESS}`);
            if(typeof payload === "string" || payload instanceof String) {
                res.status(400).json({type: "error"});
                return;
            }
            await uploadVideoStream(req, res, payload);

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