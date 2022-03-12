import { ObjectId } from "mongodb";

type Video = {
    _id: ObjectId,
    title: string,
    registrationDate: Date,
    url: string
}

export default Video;