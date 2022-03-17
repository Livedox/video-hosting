import { ObjectId } from "mongodb";
import mongoose, {Schema, Model} from "mongoose";

export type Video = {
    userId: ObjectId,
    title: string,
    creationDate: Date,
    url: string,
    description: string,
}

const VideoSchema = new Schema<Video>({
    userId: {type: Schema.Types.ObjectId, ref: "User"},
    title: {type: String, required: true},
    creationDate: {type: Date, default: new Date()},
    description: {type: String, default: ""},
    url: {type: String, required: true}
}, {collection: "videos"});
const VideoModel: Model<Video, {}, {}, {}> = mongoose.models.Video || mongoose.model("Video", VideoSchema);

export default VideoModel;