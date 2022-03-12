import { NextApiRequest, NextApiResponse } from "next";
import config from "../../../config";
import UserService from "../../../service/user";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "GET") {
            UserService.activateEmail(config.server+req.url);

            res.status(200).redirect(config.server).end();
            return;
        }
        res.status(404).end();
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
}

export default handler;