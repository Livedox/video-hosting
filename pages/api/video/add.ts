import busboy from "busboy";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { v4 } from "uuid";
import VideoModel from "../../../models/VideoModel";
import connectDB from "../../../middleware/mongodb";

export const config = {
    api: {
        bodyParser: false,
    }
}

async function uploadVideoStream(req: NextApiRequest, res: NextApiResponse) {
    const bb = busboy({headers: req.headers});
    const data = {
        title: "",
        url: ""
    }

    bb.on("file", (_, file, info) => {
        data.url = `/videos/${v4()}.${info.filename.match(/\.([^.]+)$|$/)![1]}`;

        const stream = fs.createWriteStream("./public/" + data.url);

        file.pipe(stream);
    });

    bb.on("field", (name, value, _) => {
        if(name === "title") data.title = value;
    });

    bb.on("close", async () => {
        await VideoModel.create({
            title: data.title,
            url: data.url,
            registrationDate: new Date()
        });
        res.writeHead(200, {Connection: "close"});
    });

    req.pipe(bb);
    return;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            await uploadVideoStream(req, res);

            res.status(200).end();
            return;
        }
        
        res.status(404);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
}

export default connectDB(handler);